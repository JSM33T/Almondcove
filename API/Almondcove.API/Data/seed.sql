delete from tblArtifacts
delete from tblArtifactTypes
delete from tblArtifactSeries
delete from tblArtifactCategories

-- Insert into tblArtifactTypes
INSERT INTO tblArtifactTypes (Id, TypeName, Slug, DateAdded)
VALUES 
(1, 'Blog', 'blog', GETDATE()),
(2, 'Music', 'music', GETDATE()),
(3, 'Gallery', 'gallery', GETDATE());

-- Insert into tblArtifactCategories
INSERT INTO tblArtifactCategories (Id, CategoryName, Slug, DateAdded)
VALUES
(1, 'Entertainment', 'entertainment', GETDATE()),
(2, 'History', 'history', GETDATE()),
(3, 'Life', 'life', GETDATE());


-- Insert into tblArtifactSeries
INSERT INTO tblArtifactSeries (Id, SeriesName, Slug, DateAdded)
VALUES 
(1, 'Music Production', 'music-production', GETDATE());


-- Insert into tblArtifacts
INSERT INTO tblArtifacts (Id, ArtifactName, Slug, Tags, TypeId, CategoryId, SeriesId, DateAdded)
VALUES 
(1, 'Requerdos 1', 'recuerdos-1', 'dnb, bootleg-album, music', 2, 1, 1, 2019-09-20),
(2, 'Requerdos 2', 'recuerdos-2', 'dnb, bootleg-album, music', 2, 1, 1, 2020-09-20),
(3, 'The Coffeeroom bootleg', 'the-coffeeroom-bootleg', 'dnb, bootleg-album, music', 2, 1, 1, GETDATE()),
(4, 'Melancholy', 'melancholy', 'orchestral,original-mix, music', 2, 1, 1, GETDATE()),

(10, 'Kdrama stuff', 'some-kdrama-stuff', 'orchestral,original-mix, music', 1, 1, 1, GETDATE());

