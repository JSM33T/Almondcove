USE [almondcove_db]
GO

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
	a.Description,
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

