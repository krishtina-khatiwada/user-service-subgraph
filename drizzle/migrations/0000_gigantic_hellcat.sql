CREATE TABLE `Users` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`username` varchar(255) NOT NULL,
	`password` varchar(15) NOT NULL,
	CONSTRAINT `Users_id` PRIMARY KEY(`id`)
);
