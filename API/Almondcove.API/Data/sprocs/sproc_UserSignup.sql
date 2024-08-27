CREATE or alter PROCEDURE sproc_UserSignup
    @Firstname NVARCHAR(50),
    @Lastname NVARCHAR(50),
    @Username NVARCHAR(50),
	@Email NVARCHAR(50),
    @Password NVARCHAR(255),
    @Result INT OUTPUT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @NextUserId INT;

    SELECT @NextUserId = ISNULL(MAX(Id), 0) + 1 FROM tblUsers;

    IF EXISTS (SELECT 1 FROM tblUsers WHERE Username = @Username)
    BEGIN
        SET @Result = 1; -- duplicate username
    END
    ELSE
    BEGIN
        INSERT INTO tblUsers(Id, Firstname, Lastname, Username, Password,Email)
        VALUES (@NextUserId, @Firstname, @Lastname, @Username, @Password,@Email);

        SET @Result = 0;
    END
END
