USE [almondcove_db]
GO
/****** Object:  StoredProcedure [dbo].[sproc_GetArtifactAuthorsByArtifactId]    Script Date: 16-08-2024 11.12.50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER   PROCEDURE [dbo].[sproc_GetArtifactAuthorsByArtifactId]
    @ArtifactId INT
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
        tblArtifactAuthorMap aam
    INNER JOIN 
        tblUsers u ON aam.UserId = u.Id
    WHERE 
        aam.ArtifactId = @ArtifactId;
END;
