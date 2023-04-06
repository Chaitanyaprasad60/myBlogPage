 -- Shell Commands
 -- \sql
 -- \connect root@localhost
 
 -- View Count table create command

 create table view_count(
                        blogId int NOT NULL UNIQUE,
                        viewCount int default(0),
                        FOREIGN KEY (blogId) REFERENCES blog(blogId)
                        );

CREATE TABLE `comments` (
  `body` text,
  `author` varchar(100) DEFAULT NULL,
  `addedDate` datetime DEFAULT NULL,
  `commentId` int NOT NULL AUTO_INCREMENT,
  `blogId` int DEFAULT (0),
  PRIMARY KEY (`commentId`)
)

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
FLUSH PRIVILEGES;


use myblog;
DELIMITER //
DROP PROCEDURE IF EXISTS addAndGetViews//
CREATE PROCEDURE addAndGetViews(IN _blogId INT)
  BEGIN
    INSERT INTO view_count(blogId,viewCount) values(_blogId,1) ON DUPLICATE KEY UPDATE viewCount = viewCount + 1;
    SELECT viewCount from view_count WHERE blogId =  _blogId;
END //
;

use myblog;
CREATE TABLE blog (
	blogId INT NOT NULL auto_increment,
    title text,
    body text,
    imagePath text,
    logoPath text, 
    primary key (blogId)
    );              