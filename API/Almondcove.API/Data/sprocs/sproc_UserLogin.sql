CREATE OR ALTER PROCEDURE dbo.sproc_UserLogin
    @Username NVARCHAR(255),
    @Password NVARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN
        SELECT *
        FROM tblUsers 
        WHERE Username = @Username AND [Password] = @Password and IsVerified = 1;
    END
END
