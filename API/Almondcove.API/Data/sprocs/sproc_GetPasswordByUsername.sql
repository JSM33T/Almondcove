CREATE OR ALTER PROCEDURE [dbo].[sproc_GetPasswordByUsername]
    @Username NVARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT [Password]
    FROM tblUsers
    WHERE Username = @Username;
END
