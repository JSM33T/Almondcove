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
