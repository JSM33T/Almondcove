-- Drop the stored procedure if it already exists
IF OBJECT_ID('sproc_GetPaginatedArtifacts', 'P') IS NOT NULL
    DROP PROCEDURE sproc_GetPaginatedArtifacts;
GO

-- Create the stored procedure
CREATE PROCEDURE sproc_GetPaginatedArtifacts
    @PageNumber INT,
    @PageSize INT,
    @SearchString NVARCHAR(128) = NULL,
    @Type NVARCHAR(128) = NULL,
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

    SELECT @TotalRecords = COUNT(*)
    FROM tblArtifacts
    WHERE 
        (@SearchString IS NULL OR ArtifactName LIKE '%' + @SearchString + '%')
        AND (@Type IS NULL OR EXISTS (
            SELECT 1
            FROM tblArtifactTypes
            WHERE Id = TypeId
            AND TypeName = @Type
        ))
        AND (@FromDate IS NULL OR DateAdded >= @FromDate)
        AND (@ToDate IS NULL OR DateAdded <= @ToDate);

    -- Calculate total pages
    SET @TotalPages = CASE 
                        WHEN @TotalRecords % @PageSize = 0 THEN @TotalRecords / @PageSize
                        ELSE (@TotalRecords / @PageSize) + 1
                      END;

    -- Fetch paginated records
    SELECT 
        Id,
        ArtifactName,
        Slug,
        Tags,
        TypeId,
        CategoryId,
        SeriesId,
        DateAdded,
        @PageNumber AS CurrentPage,
        @TotalPages AS TotalPages
    FROM tblArtifacts
    WHERE 
        (@SearchString IS NULL OR ArtifactName LIKE '%' + @SearchString + '%')
        AND (@Type IS NULL OR EXISTS (
            SELECT 1
            FROM tblArtifactTypes
            WHERE Id = TypeId
            AND TypeName = @Type
        ))
        AND (@FromDate IS NULL OR DateAdded >= @FromDate)
        AND (@ToDate IS NULL OR DateAdded <= @ToDate)
    ORDER BY DateAdded DESC
    OFFSET (@PageNumber - 1) * @PageSize ROWS
    FETCH NEXT @PageSize ROWS ONLY;

    -- Output pagination information
    SELECT 
        @TotalRecords AS TotalRecords,
        @PageNumber AS CurrentPage,
        @TotalPages AS TotalPages,
        @PageSize AS PageSize;
END;
GO


--		EXEC usp_GetPaginatedArtifacts
--			@PageNumber = 1,
--			@PageSize = 2,
--			@SearchString = NULL,
--			@Type = NULL,
--			@FromDate = '2024-08-01',
--			@ToDate = '2024-08-31';
