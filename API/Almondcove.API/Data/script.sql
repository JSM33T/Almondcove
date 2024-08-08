CREATE TABLE tblMessages
(
    Id              INT 
                    NOT NULL,

    Content  NVARCHAR(512) 
                    NOT NULL,

    Topic           NVARCHAR(128) 
                    NOT NULL 
                    DEFAULT 'general',

    Origin          NVARCHAR(256) 
                    NOT NULL 
                    DEFAULT '/',

    DateAdded       DATETIME 
                    NOT NULL 
                    DEFAULT GETDATE(),

    CONSTRAINT      PK_MessageTable 
                    PRIMARY KEY (Id),

    CONSTRAINT      UQ_MessageContent 
                    UNIQUE (Content)
);
GO

CREATE TABLE tblParameters
(
    ParameterKey    NVARCHAR(255) 
                    PRIMARY KEY,

    ParameterValue  NVARCHAR(MAX),

    DateAdded       DATETIME 
                    NOT NULL 
                    DEFAULT GETDATE(),
);

CREATE TABLE tblRoles
(
    RoleId      INT             
                PRIMARY KEY,

    RoleName    NVARCHAR(50)    
                NOT NULL 
                CONSTRAINT UQ_RoleName UNIQUE (RoleName)
);

-- SEEDING ROLES
INSERT INTO tblRoles (RoleId, RoleName) VALUES (1, 'user');
INSERT INTO tblRoles (RoleId, RoleName) VALUES (2, 'admin');


CREATE TABLE tblUsers
(
    Id          INT           
                PRIMARY KEY,

    FirstName   NVARCHAR(50)  
                NOT NULL,

    LastName    NVARCHAR(50)  
                NOT NULL,

    UserName    NVARCHAR(50)  
                NOT NULL,

    Email       NVARCHAR(255) 
                NOT NULL,

    RoleId      INT           
                NOT NULL 
                CONSTRAINT FK_UserRole FOREIGN KEY (RoleId) REFERENCES tblRoles(RoleId),

    DateAdded   DATETIME      
                NOT NULL 
                DEFAULT GETDATE(),

    DateBorn    DATETIME      
                NULL,

    DateEdited  DATETIME      
                NOT NULL 
                DEFAULT GETDATE(),  
    
    IsActive    BIT           
                NOT NULL 
                DEFAULT 1,

    IsVerified  BIT           
                NOT NULL 
                DEFAULT 0,

    Token       NVARCHAR(255) 
                NOT NULL 
                DEFAULT(1000),

    TimeSpent   INT           
                NOT NULL 
                DEFAULT(10),
);
GO

CREATE OR ALTER PROCEDURE sprocInsertMessage
    @Content NVARCHAR(MAX),
    @Origin NVARCHAR(50),
    @Topic NVARCHAR(50)
AS
BEGIN
    DECLARE @MaxId INT;
    SELECT @MaxId = ISNULL(MAX(Id), 0) FROM tblMessages;

    INSERT INTO tblMessages (Id, Content, DateAdded, Origin, Topic)
    VALUES (@MaxId + 1, @Content, GETDATE(), @Origin, @Topic);

    SELECT @MaxId;
END

Go

CREATE PROCEDURE sprocGetMessageByContent
    @Content NVARCHAR(MAX)
AS
BEGIN
    SELECT * FROM tblMessages WHERE Content = @Content;
END
