drop table if exists tblMessages
drop table if exists tblArtifacts
drop table if exists tblArtifactTags
drop table if exists tblArtifactTypes
drop table if exists tblArtifactCategories
drop table if exists tblArtifactSeries


CREATE TABLE tblUsers
(
	---------------------
	--		PROPS      --
	---------------------

    Id              INT					NOT NULL,

    FirstName		NVARCHAR(256)		NOT NULL,

	LastName		NVARCHAR(256)		NOT NULL DEFAULT '',

	Username        NVARCHAR(128)		NOT NULL,

	Email			NVARCHAR(256)		NOT NULL,

	Avatar			NVARCHAR(256)		NOT NULL,
	
	GoogleId		NVARCHAR(128)		NULL,

	[Password]		NVARCHAR(128)		NULL,

	[Key]			UNIQUEIDENTIFIER	NOT NULL  DEFAULT NEWID(),

	IsActive		BIT					NOT NULL DEFAULT 1,

	IsVerified		BIT					NOT NULL DEFAULT 0,

    DateAdded       DATETIME			NOT NULL DEFAULT GETDATE(),

	DateEdited      DATETIME			NOT NULL DEFAULT GETDATE(),

	---------------------
	--   CONSTRAINTS   --
	---------------------

    CONSTRAINT      PK_UserTable PRIMARY KEY (Id),

    CONSTRAINT      UQ_User_Username UNIQUE (Username)
);
GO



CREATE TABLE tblMessages
(
    Id              INT 
                    NOT NULL,

    Content			NVARCHAR(512) 
                    NOT NULL,

	[Name]          NVARCHAR(128) 
					NOT NULL 
					DEFAULT 'anonymous',

	Email			NVARCHAR(128) 
					NOT NULL 
					DEFAULT 'na',


    Topic           NVARCHAR(128) 
                    NOT NULL 
                    DEFAULT 'general',

    Origin          NVARCHAR(256) 
                    NOT NULL 
                    DEFAULT '/',

    DateAdded       DATETIME 
                    NOT NULL 
                    DEFAULT GETDATE(),

    CONSTRAINT      PK_MessageTable 
                    PRIMARY KEY (Id),

    CONSTRAINT      UQ_MessageContent 
                    UNIQUE (Content)
);
GO

CREATE TABLE tblArtifactTypes
(
    Id			INT 
				PRIMARY KEY,

    TypeName	NVARCHAR(128)
				NOT NULL,

	Slug		NVARCHAR(128)
				NOT NULL,

    DateAdded	DATETIME 
				NOT NULL 
				DEFAULT GETDATE(),
);


CREATE TABLE tblArtifactCategories
(
    Id				INT 
					PRIMARY KEY,

    CategoryName	NVARCHAR(128)
					NOT NULL,

	Slug			NVARCHAR(128)
					NOT NULL,

    DateAdded		DATETIME 
					NOT NULL 
					DEFAULT GETDATE(),
);

CREATE TABLE tblArtifactSeries
(
    Id				INT 
					PRIMARY KEY,

    SeriesName		NVARCHAR(128)
					NOT NULL,

	Slug			NVARCHAR(128)
					NOT NULL,

    DateAdded		DATETIME 
					NOT NULL 
					DEFAULT GETDATE(),
);

CREATE TABLE tblArtifacts
(
    Id              INT PRIMARY KEY,
    ArtifactName    NVARCHAR(256)   NOT NULL,
    Slug            NVARCHAR(128)   NOT NULL,
    Tags            NVARCHAR(128)   NOT NULL,
    TypeId          INT             NOT NULL    FOREIGN KEY REFERENCES tblArtifactTypes(Id),
    CategoryId      INT             NOT NULL    FOREIGN KEY REFERENCES tblArtifactCategories(Id),
    SeriesId        INT             NOT NULL    FOREIGN KEY REFERENCES tblArtifactSeries(Id),
    DateAdded       DATETIME        NOT NULL    DEFAULT GETDATE(),
    IsActive        BIT             NOT NULL    DEFAULT 1
);

go

CREATE TABLE tblArtifactAuthorMap
(
    Id          INT     NOT NULL,
    ArtifactId      INT     NOT NULL,
    UserId      INT     NOT NULL,
    
    CONSTRAINT FK_ArtifactAuthorMap_ArtifactId FOREIGN KEY (ArtifactId) REFERENCES tblArtifacts(Id),
    CONSTRAINT FK_ArtifactAuthorMap_UserId FOREIGN KEY (UserId) REFERENCES tblUsers(Id),
    CONSTRAINT PK_ArtifactAuthorMap PRIMARY KEY (Id)
);
GO

CREATE OR ALTER PROCEDURE sproc_CheckAndAddMessage
    @Content    NVARCHAR(512),
    @Name       NVARCHAR(128) = 'anonymous',
    @Email      NVARCHAR(128) = 'na',
    @Topic      NVARCHAR(128) = 'general',
    @Origin     NVARCHAR(256) = '/',
    @Result     INT OUTPUT
AS
BEGIN
    SET NOCOUNT ON;

    -- Check if a message with the same content and email exists
    IF EXISTS (SELECT 1 
               FROM tblMessages 
               WHERE Content = @Content AND Email = @Email)
    BEGIN
        -- Message with same content and email exists, set result to -1
        SET @Result = -1;
    END
    ELSE
    BEGIN
        -- Get the next Id by adding 1 to the maximum current Id
        DECLARE @NewId INT;
        SELECT @NewId = ISNULL(MAX(Id), 0) + 1 FROM tblMessages;

        -- Insert the new message with the calculated Id
        INSERT INTO tblMessages (Id, Content, [Name], Email, Topic, Origin, DateAdded)
        VALUES (@NewId, @Content, @Name, @Email, @Topic, @Origin, GETDATE());

        -- Set result to 0 to indicate success
        SET @Result = 0;
    END
END;
GO
USE [almondcove_db]
GO
/****** Object:  StoredProcedure [dbo].[sproc_GetPaginatedArtifacts]    Script Date: 15-08-2024 10.16.07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- Create the stored procedure
ALTER PROCEDURE [dbo].[sproc_GetPaginatedArtifacts]
    @PageNumber INT,
    @PageSize INT,
    @SearchString NVARCHAR(128) = NULL,
    @Type NVARCHAR(128) = NULL,
    @Category NVARCHAR(128) = NULL,
    @Tag NVARCHAR(128) = NULL,
    @Year INT = NULL,
    @FromDate DATETIME = NULL,
    @ToDate DATETIME = NULL
AS
BEGIN
    -- Ensure valid input for page number and page size
    IF @PageNumber < 1 SET @PageNumber = 1;
    IF @PageSize < 1 SET @PageSize = 10;

    -- Check if @FromDate is greater than @ToDate
    IF @FromDate IS NOT NULL AND @ToDate IS NOT NULL AND @FromDate > @ToDate
    BEGIN
        RAISERROR('Invalid date range: FromDate cannot be greater than ToDate.', 16, 1);
        RETURN;
    END

    -- Calculate total record count
    DECLARE @TotalRecords INT;
    DECLARE @TotalPages INT;

    -- Build the dynamic SQL query
    DECLARE @SQL NVARCHAR(MAX);
    SET @SQL = '
    SELECT @TotalRecords = COUNT(*)
    FROM tblArtifacts
    WHERE 1 = 1';

    -- SearchString condition
    IF @SearchString IS NOT NULL OR @SearchString != ''
    BEGIN
        SET @SQL = @SQL + ' AND ArtifactName LIKE ''%'' + @SearchString + ''%''';
    END

    -- Type condition
    IF @Type IS NOT NULL AND @Type != ''
    BEGIN
        SET @SQL = @SQL + ' AND EXISTS (
            SELECT 1
            FROM tblArtifactTypes
            WHERE Id = TypeId
            AND TypeName = @Type
        )';
    END

    -- Category condition
    IF @Category IS NOT NULL
    BEGIN
        SET @SQL = @SQL + ' AND EXISTS (
            SELECT 1
            FROM tblArtifactCategories
            WHERE Id = CategoryId
            AND CategoryName = @Category
        )';
    END

    -- Tag condition
    IF @Tag IS NOT NULL
    BEGIN
        SET @SQL = @SQL + ' AND Tags LIKE ''%'' + @Tag + ''%''';
    END

    IF @Year IS NOT NULL AND @Year != ''
    BEGIN
        SET @SQL = @SQL + ' AND YEAR(DateAdded) = @Year';
    END

    -- Date range conditions
    IF @FromDate IS NOT NULL AND @FromDate != ''
    BEGIN
        SET @SQL = @SQL + ' AND DateAdded >= @FromDate';
    END

    IF @ToDate IS NOT NULL AND @ToDate != ''
    BEGIN
        SET @SQL = @SQL + ' AND DateAdded <= @ToDate';
    END

    -- Calculate total record count
    EXEC sp_executesql @SQL, 
        N'@SearchString NVARCHAR(128), @Type NVARCHAR(128), @Category NVARCHAR(128), @Tag NVARCHAR(128), @Year INT, @FromDate DATETIME, @ToDate DATETIME, @TotalRecords INT OUTPUT',
        @SearchString, @Type, @Category, @Tag, @Year, @FromDate, @ToDate, @TotalRecords OUTPUT;

    -- Calculate total pages
    SET @TotalPages = CASE 
                        WHEN @TotalRecords % @PageSize = 0 THEN @TotalRecords / @PageSize
                        ELSE (@TotalRecords / @PageSize) + 1
                      END;

    -- Fetch paginated records
    SET @SQL = '
 SELECT 
    a.Id,
    a.ArtifactName,
    a.Slug,
    a.Tags,
    a.TypeId,
    a.CategoryId,
    ac.CategoryName,
    a.SeriesId,
    a.DateAdded,
    @PageNumber AS CurrentPage,
    @TotalPages AS TotalPages
FROM tblArtifacts a
LEFT JOIN tblArtifactCategories ac ON a.CategoryId = ac.Id
    WHERE 1 = 1 AND IsActive = 1';

    -- Add conditions as before
    IF @SearchString IS NOT NULL AND @SearchString != ''
    BEGIN
        SET @SQL = @SQL + ' AND ArtifactName LIKE ''%'' + @SearchString + ''%''';
    END

    IF @Type IS NOT NULL AND @Type != ''
    BEGIN
        SET @SQL = @SQL + ' AND EXISTS (
            SELECT 1
            FROM tblArtifactTypes
            WHERE Id = TypeId
            AND TypeName = @Type
        )';
    END

    IF @Category IS NOT NULL AND @Category != ''
    BEGIN
        SET @SQL = @SQL + ' AND EXISTS (
            SELECT 1
            FROM tblArtifactCategories
            WHERE Id = CategoryId
            AND CategoryName = @Category
        )';
    END

    IF @Tag IS NOT NULL AND @Tag != ''
    BEGIN
        SET @SQL = @SQL + ' AND Tags LIKE ''%'' + @Tag + ''%''';
    END

    IF @Year IS NOT NULL AND @Year != ''
    BEGIN
        SET @SQL = @SQL + ' AND YEAR(a.DateAdded) = @Year';
    END

    IF @FromDate IS NOT NULL  AND @FromDate != ''
    BEGIN
        SET @SQL = @SQL + ' AND a.DateAdded >= @FromDate';
    END

    IF @ToDate IS NOT NULL AND @ToDate != ''
    BEGIN
        SET @SQL = @SQL + ' AND a.DateAdded <= @ToDate';
    END

    SET @SQL = @SQL + '
    ORDER BY a.DateAdded DESC
    OFFSET (@PageNumber - 1) * @PageSize ROWS
    FETCH NEXT @PageSize ROWS ONLY';

    -- Execute the paginated query
    EXEC sp_executesql @SQL, 
        N'@SearchString NVARCHAR(128), @Type NVARCHAR(128), @Category NVARCHAR(128), @Tag NVARCHAR(128), @Year INT, @FromDate DATETIME, @ToDate DATETIME, @PageNumber INT, @PageSize INT, @TotalPages INT',
        @SearchString, @Type, @Category, @Tag, @Year, @FromDate, @ToDate, @PageNumber, @PageSize, @TotalPages;

    -- Output pagination information
    SELECT 
        @TotalRecords AS TotalRecords,
        @PageNumber AS CurrentPage,
        @TotalPages AS TotalPages,
        @PageSize AS PageSize;
END;
delete from tblArtifacts
delete from tblArtifactTypes
delete from tblArtifactSeries
delete from tblArtifactCategories

-- Insert into tblArtifactTypes
INSERT INTO tblArtifactTypes (Id, TypeName, Slug, DateAdded)
VALUES 
(1, 'Blog', 'blog', GETDATE()),
(2, 'Studio', 'studio', GETDATE()),
(3, 'Gallery', 'gallery', GETDATE()),
(4, 'Asset', 'asset', GETDATE());

-- Insert into tblArtifactCategories
INSERT INTO tblArtifactCategories (Id, CategoryName, Slug, DateAdded)
VALUES
(1, 'Entertainment', 'entertainment', GETDATE()),
(2, 'History', 'history', GETDATE()),
(3, 'Tech', 'tech', GETDATE()),
(4, 'Music', 'music', GETDATE());

-- Insert into tblArtifactSeries
INSERT INTO tblArtifactSeries (Id, SeriesName, Slug, DateAdded)
VALUES 
(1, 'Uncategorized', 'uncategorized', GETDATE()),
(2, 'Music Production', 'music_production', GETDATE()),
(3, 'Garden State', 'garden_state', GETDATE());

INSERT INTO tblArtifacts (Id, ArtifactName, Slug, Tags, TypeId, CategoryId, SeriesId, DateAdded)
VALUES 
(1, 'Top 5 must watch K-Drama series for beginners', 'top-5-must-watch-series-for-beginners', 'asiandrama,kdrama,binge', 1, 1, 1, '2023-04-20'),

(2, 'Decayed Elegance: The Orient Paper Mills', 'decayed-elegance-the-orient-paper-mills', 'dnb,urbex', 1, 2, 1, '2023-09-20'),

(3, 'From Radiance to Ruination', 'from-radiance-to-ruination', 'incidents,morbid,history', 1, 2, 1, '2023-12-20');

