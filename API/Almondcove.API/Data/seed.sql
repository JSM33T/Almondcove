
-- Insert into tblBlogCategories
INSERT INTO tblBlogCategories (Id, CategoryName, Slug, DateAdded)
VALUES
(1, 'Entertainment', 'entertainment', GETDATE()),
(2, 'History', 'history', GETDATE()),
(3, 'Tech', 'tech', GETDATE()),
(4, 'Music', 'music', GETDATE()),
(5, 'Travel', 'travel', GETDATE());


INSERT INTO tblBlogs (Id, BlogName,Description, Slug, Tags, CategoryId, DateAdded)
VALUES 
(1, 'Top 5 must watch K-Drama series for beginners','', 'top-5-must-watch-series-for-beginners', 'asiandrama,kdrama,binge', 1, '2023-04-20'),

(2, 'Decayed Elegance: The Orient Paper Mills','', 'decayed-elegance-the-orient-paper-mills', 'dnb,urbex', 2,  '2023-09-20'),

(3, 'From Radiance to Ruination','', 'from-radiance-to-ruination', 'incidents,morbid,history', 2, '2023-12-20');

