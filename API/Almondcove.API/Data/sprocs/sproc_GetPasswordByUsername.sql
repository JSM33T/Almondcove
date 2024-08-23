USE [almondcove_db]
GO
/****** Object:  StoredProcedure [dbo].[sproc_GetPasswordByUsername]    Script Date: 23-08-2024 11.49.17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[sproc_GetPasswordByUsername]
    @Username NVARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT [Password]
    FROM tblUsers
    WHERE Username = @Username;
END
