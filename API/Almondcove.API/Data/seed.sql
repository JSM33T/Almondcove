delete from tblArtifacts
delete from tblArtifactTypes
delete from tblArtifactSeries
delete from tblArtifactCategories

-- Insert into tblArtifactTypes
INSERT INTO tblArtifactTypes (Id, TypeName, Slug, DateAdded)
VALUES 
(1, 'Blog', 'blog', GETDATE()),
(2, 'Studio', 'studio', GETDATE()),
(3, 'Gallery', 'gallery', GETDATE()),
(4, 'Asset', 'asset', GETDATE());

-- Insert into tblArtifactCategories
INSERT INTO tblArtifactCategories (Id, CategoryName, Slug, DateAdded)
VALUES
(1, 'Entertainment', 'entertainment', GETDATE()),
(2, 'History', 'history', GETDATE()),
(3, 'Tech', 'tech', GETDATE()),
(4, 'Music', 'music', GETDATE());

-- Insert into tblArtifactSeries
INSERT INTO tblArtifactSeries (Id, SeriesName, Slug, DateAdded)
VALUES 
(1, 'Uncategorized', 'uncategorized', GETDATE()),
(2, 'Music Production', 'music_production', GETDATE()),
(3, 'Garden State', 'garden_state', GETDATE());

INSERT INTO tblArtifacts (Id, ArtifactName, Slug, Tags, TypeId, CategoryId, SeriesId, DateAdded)
VALUES 
(1, 'Top 5 must watch K-Drama series for beginners', 'top-5-must-watch-series-for-beginners', 'asiandrama,kdrama,binge', 1, 1, 1, '2023-04-20'),

(2, 'Decayed Elegance: The Orient Paper Mills', 'decayed-elegance-the-orient-paper-mills', 'dnb,urbex', 1, 2, 1, '2023-09-20'),

(3, 'From Radiance to Ruination', 'from-radiance-to-ruination', 'incidents,morbid,history', 1, 2, 1, '2023-12-20');

