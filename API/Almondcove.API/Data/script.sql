drop table if exists tblMessages
drop table if exists tblArtifacts
drop table if exists tblArtifactTags
drop table if exists tblArtifactTypes
drop table if exists tblArtifactCategories
drop table if exists tblArtifactSeries

CREATE TABLE tblMessages
(
    Id              INT 
                    NOT NULL,

    Content			NVARCHAR(512) 
                    NOT NULL,

	[Name]          NVARCHAR(128) 
					NOT NULL 
					DEFAULT 'anonymous',

	Email			NVARCHAR(128) 
					NOT NULL 
					DEFAULT 'na',


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

CREATE TABLE tblArtifactTypes
(
    Id			INT 
				PRIMARY KEY,

    TypeName	NVARCHAR(128)
				NOT NULL,

	Slug		NVARCHAR(128)
				NOT NULL,

    DateAdded	DATETIME 
				NOT NULL 
				DEFAULT GETDATE(),
);


CREATE TABLE tblArtifactCategories
(
    Id				INT 
					PRIMARY KEY,

    CategoryName	NVARCHAR(128)
					NOT NULL,

	Slug			NVARCHAR(128)
					NOT NULL,

    DateAdded		DATETIME 
					NOT NULL 
					DEFAULT GETDATE(),
);

CREATE TABLE tblArtifactSeries
(
    Id				INT 
					PRIMARY KEY,

    SeriesName		NVARCHAR(128)
					NOT NULL,

	Slug			NVARCHAR(128)
					NOT NULL,

    DateAdded		DATETIME 
					NOT NULL 
					DEFAULT GETDATE(),
);

CREATE TABLE tblArtifacts
(
    Id				INT 
					PRIMARY KEY,

    ArtifactName	NVARCHAR(256)
					NOT NULL,

	Slug			NVARCHAR(128)
					NOT NULL,

	Tags			NVARCHAR(128)
					NOT NULL,

	TypeId			INT
					NOT NULL
					FOREIGN KEY REFERENCES tblArtifactTypes(Id),

	CategoryId		INT
					NOT NULL
					FOREIGN KEY REFERENCES tblArtifactCategories(Id),

	SeriesId		INT
					NOT NULL
					FOREIGN KEY REFERENCES tblArtifactSeries(Id),

    DateAdded		DATETIME 
					NOT NULL 
					DEFAULT GETDATE()
);

