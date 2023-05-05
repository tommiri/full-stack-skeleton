CREATE TABLE IF NOT EXISTS `Users` (
  `id` varchar(36) UNIQUE NOT NULL,
  `username` varchar(100) UNIQUE NOT NULL,
  `email` varchar(50) UNIQUE NOT NULL,
  `password` varchar(60) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;

-- Initialize database
CREATE TABLE IF NOT EXISTS `Examples` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(60) UNIQUE NOT NULL,
  `description` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;

INSERT INTO
  `Examples` (`name`, `description`)
VALUES
  ('First example', 'First description'),
  ('Second example', 'Second description'),
  ('Third example', 'Third description');