create database `robot-four-a-db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

use `robot-four-a-db`;

CREATE TABLE `user` (
  `user_id`        int(11)          NOT NULL AUTO_INCREMENT,
  `user_name`      varchar(20)      DEFAULT NULL,
  `age`            int(11)          DEFAULT NULL,
  `hobby`          varchar(2000)      DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;


insert into `user` (`user_name`,`age`,`hobby`) values ('user1',18,'Guitar');
insert into `user` (`user_name`,`age`,`hobby`) values ('user2',19,'Piano');
insert into `user` (`user_name`,`age`,`hobby`) values ('user3',20,'Piano');
insert into `user` (`user_name`,`age`,`hobby`) values ('user4',18,'Piano');
