CREATE TABLE tblMessage
(
    Id              INT 
                    NOT NULL,

    MessageContent  NVARCHAR(MAX) 
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
                    UNIQUE (MessageContent)
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

    CONSTRAINT UQ_MessageContent UNIQUE (MessageContent)
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
