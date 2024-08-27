CREATE OR ALTER   PROCEDURE [dbo].[sproc_GetBlogAuthorsByBlogId]
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
