use [almondcove_db]
CREATE TABLE [dbo].[tblUsers]
(
	---------------------
	--		PROPS      --
	---------------------

    Id              INT					NOT NULL,

    FirstName		NVARCHAR(256)		NOT NULL,

	LastName		NVARCHAR(256)		NOT NULL DEFAULT '',

	Username        NVARCHAR(128)		NOT NULL,

	Email			NVARCHAR(256)		NOT NULL,

	Avatar			NVARCHAR(256)		NOT NULL DEFAULT 'default',

    [Role]			NVARCHAR(64)		NOT NULL DEFAULT 'member',
	
	GoogleId		NVARCHAR(128)		NULL,

	[Password]		NVARCHAR(128)		NULL,

	[Key]			UNIQUEIDENTIFIER	NOT NULL  DEFAULT NEWID(),

    OTP             NVARCHAR(6)         NOT NULL,

	IsActive		BIT					NOT NULL DEFAULT 1,

	IsVerified		BIT					NOT NULL DEFAULT 0,

	ExpPoints		INT					NOT NULL DEFAULT 1000,

	TimeSpent		INT					NOT NULL DEFAULT 300,

    DateAdded       DATETIME			NOT NULL DEFAULT GETDATE(),

	DateEdited      DATETIME			NOT NULL DEFAULT GETDATE(),

	---------------------
	--   CONSTRAINTS   --
	---------------------

    CONSTRAINT      PK_UserTable PRIMARY KEY (Id),

    CONSTRAINT      UQ_User_Username UNIQUE (Username)
);
GO



CREATE TABLE [dbo].[tblMessages]
(
	---------------------
	--		PROPS      --
	---------------------
    Id              INT				NOT NULL,

    Content			NVARCHAR(512)	NOT NULL,

	[Name]          NVARCHAR(128)	NOT NULL	DEFAULT 'anonymous',

	Email			NVARCHAR(128)	NOT NULL	DEFAULT 'na',

    Topic           NVARCHAR(128)	NOT NULL	DEFAULT 'general',

    Origin          NVARCHAR(256)	NOT NULL	DEFAULT '/',

    DateAdded       DATETIME		NOT NULL	DEFAULT GETDATE(),

	---------------------
	--   CONSTRAINTS   --
	---------------------

    CONSTRAINT      PK_MessageTable		PRIMARY KEY (Id),

    CONSTRAINT      UQ_MessageContent	UNIQUE (Content)
);
GO


CREATE TABLE [dbo].[tblBlogCategories]
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


CREATE TABLE [dbo].[tblBlogSeries]
(
    Id				INT				PRIMARY KEY,

    SeriesName		NVARCHAR(128)	NOT NULL,

	Slug			NVARCHAR(128)	NOT NULL,

    DateAdded		DATETIME		NOT NULL	DEFAULT GETDATE(),
);

CREATE TABLE [dbo].[tblBlogs]
(
    Id              INT				PRIMARY KEY,

    BlogName		NVARCHAR(256)   NOT NULL,

	[Description]	NVARCHAR(512)	NOT NULL,

    Slug            NVARCHAR(128)   NOT NULL,

    Tags            NVARCHAR(128)   NOT NULL,

    CategoryId      INT             NOT NULL    FOREIGN KEY REFERENCES tblBlogCategories(Id),

    DateAdded       DATETIME        NOT NULL    DEFAULT GETDATE(),

    IsActive        BIT             NOT NULL    DEFAULT 1
);

go

CREATE TABLE [dbo].[tblBlogAuthorMap]
(
    Id          INT     NOT NULL,

    BlogId      INT     NOT NULL,

    UserId      INT     NOT NULL,
    
    CONSTRAINT FK_BlogAuthorMap_BlogId FOREIGN KEY (BlogId) REFERENCES tblBlogs(Id),

    CONSTRAINT FK_BlogAuthorMap_UserId FOREIGN KEY (UserId) REFERENCES tblUsers(Id),

    CONSTRAINT PK_BlogAuthorMap PRIMARY KEY (Id)
);
GO

CREATE TABLE [dbo].[tblBlogSeriesMap]
(
    Id          INT     NOT NULL,

    BlogId      INT     NOT NULL,

    SeriesId    INT     NOT NULL,
    
    CONSTRAINT FK_BlogSeriesMap_BlogId FOREIGN KEY (BlogId) REFERENCES tblBlogs(Id),

    CONSTRAINT FK_BlogSeriesMap_UserId FOREIGN KEY (SeriesId) REFERENCES tblBlogSeries(Id),

    CONSTRAINT PK_BlogSeriesMap PRIMARY KEY (Id)
);
GO

CREATE OR ALTER PROCEDURE [dbo].[sproc_CheckAndAddMessage]
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
/****** Object:  StoredProcedure [dbo].[sproc_GetPaginatedBlogs]    Script Date: 15-08-2024 10.16.07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- Create the stored procedure
CREATE OR ALTER PROCEDURE [dbo].[sproc_GetPaginatedBlogs]
    @PageNumber INT,
    @PageSize INT,
    @SearchString NVARCHAR(128) = NULL,
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
    FROM tblBlogs
    WHERE 1 = 1';

    -- SearchString condition
    IF @SearchString IS NOT NULL OR @SearchString != ''
    BEGIN
        SET @SQL = @SQL + ' AND BlogName LIKE ''%'' + @SearchString + ''%''';
    END

    -- Category condition
    IF @Category IS NOT NULL
    BEGIN
        SET @SQL = @SQL + ' AND EXISTS (
            SELECT 1
            FROM tblBlogCategories
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
        N'@SearchString NVARCHAR(128), @Category NVARCHAR(128), @Tag NVARCHAR(128), @Year INT, @FromDate DATETIME, @ToDate DATETIME, @TotalRecords INT OUTPUT',
        @SearchString, @Category, @Tag, @Year, @FromDate, @ToDate, @TotalRecords OUTPUT;

    -- Calculate total pages
    SET @TotalPages = CASE 
                        WHEN @TotalRecords % @PageSize = 0 THEN @TotalRecords / @PageSize
                        ELSE (@TotalRecords / @PageSize) + 1
                      END;

    -- Fetch paginated records
    SET @SQL = '
 SELECT 
    a.Id,
    a.BlogName,
    a.Slug,
    a.Tags,
    a.CategoryId,
    ac.CategoryName,
    a.DateAdded,
    @PageNumber AS CurrentPage,
    @TotalPages AS TotalPages
FROM tblBlogs a
LEFT JOIN tblBlogCategories ac ON a.CategoryId = ac.Id
    WHERE 1 = 1 AND IsActive = 1';

    -- Add conditions as before
    IF @SearchString IS NOT NULL AND @SearchString != ''
    BEGIN
        SET @SQL = @SQL + ' AND BlogName LIKE ''%'' + @SearchString + ''%''';
    END

    IF @Category IS NOT NULL AND @Category != ''
    BEGIN
        SET @SQL = @SQL + ' AND EXISTS (
            SELECT 1
            FROM tblBlogCategories
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
        N'@SearchString NVARCHAR(128), @Category NVARCHAR(128), @Tag NVARCHAR(128), @Year INT, @FromDate DATETIME, @ToDate DATETIME, @PageNumber INT, @PageSize INT, @TotalPages INT',
        @SearchString, @Category, @Tag, @Year, @FromDate, @ToDate, @PageNumber, @PageSize, @TotalPages;

    -- Output pagination information
    SELECT 
        @TotalRecords AS TotalRecords,
        @PageNumber AS CurrentPage,
        @TotalPages AS TotalPages,
        @PageSize AS PageSize;
END;

GO

CREATE OR ALTER  PROCEDURE [dbo].[sproc_GetBlogAuthorsByBlogId]
    @BlogId INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        u.Id AS Id,
        u.FirstName + ' ' + u.LastName as Name,
        u.Username,
        u.Email,
        u.Avatar
    FROM 
        tblBlogAuthorMap aam
    INNER JOIN 
        tblUsers u ON aam.UserId = u.Id
    WHERE 
        aam.BlogId = @BlogId;
END;
