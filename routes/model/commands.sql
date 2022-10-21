 -- Shell Commands
 -- \sql
 -- \connect root@localhost
 
 -- View Count table create command

 create table view_count(
                        blogId int NOT NULL,
                        viewCount int default(0),
                        PRIMARY KEY (blogId)
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
CREATE PROCEDURE addAndGetViews(IN blog INT)
  BEGIN
    UPDATE view_count SET viewCount = viewCount + 1 WHERE blogId = blog;
    SELECT viewCount from view_count WHERE blogId =  blog;
END //

 update view_count vc set vc.viewCount = vc.viewCount + 1 where blogId = ${req.body.blogId}; select vc.viewCount from view_count vc where vc.blogId = ${req.body.blogId};

                        