-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 02, 2024 at 11:57 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mydb`
--

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `topic` varchar(100) NOT NULL,
  `detail` text DEFAULT NULL,
  `comment_pic` varchar(45) DEFAULT NULL,
  `comment_create` datetime NOT NULL,
  `Posts_id` int(11) NOT NULL,
  `Posts_Users_uid` int(11) NOT NULL,
  `Users_uid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `topic` varchar(100) NOT NULL,
  `details` text DEFAULT NULL,
  `post_pic` varchar(45) DEFAULT NULL,
  `post_create` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `Users_uid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `topic`, `details`, `post_pic`, `post_create`, `Users_uid`) VALUES
(1, 'XDDD', '!!!!!TEST SYSTEM !!!!!!!!', NULL, '2024-03-01 13:33:19', 34),
(2, 'XDDD', '!!!!!TEST SYSTEM !!!!!!!!', NULL, '2024-03-01 13:33:19', 34),
(16, 'asdasdasdasdasdd', 'asdasdds', '', '2024-03-02 09:50:55', 50);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `uid` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `display_name` varchar(100) NOT NULL,
  `profile_picture` text NOT NULL,
  `isAdmin` enum('Y','N') NOT NULL DEFAULT 'N' COMMENT 'Y / N'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`uid`, `username`, `email`, `password`, `display_name`, `profile_picture`, `isAdmin`) VALUES
(50, 'kongzxcd03', 'chanantongza@gmail.com', '$2b$10$czCmS9B24jFwMp6EQfjUFu7FiX59S9lPZ0U8GuX1s.miEY1iJQ2wO', '', '', 'N'),
(51, '_Tong34TH', 'chanan_tongza@hotmail.com', '$2b$10$TTP.uhxG3OMA4Nc7mw8T3OC5xWVTnsMtv0KibttCEctnWJSHV6cK2', '', '', 'N');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`,`Posts_id`,`Posts_Users_uid`,`Users_uid`),
  ADD KEY `fk_Comments_Posts1_idx` (`Posts_id`,`Posts_Users_uid`),
  ADD KEY `fk_Comments_Users1_idx` (`Users_uid`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`,`Users_uid`),
  ADD KEY `fk_Posts_Users_idx` (`Users_uid`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`uid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `uid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `fk_Comments_Posts1` FOREIGN KEY (`Posts_id`,`Posts_Users_uid`) REFERENCES `posts` (`id`, `Users_uid`),
  ADD CONSTRAINT `fk_Comments_Users1` FOREIGN KEY (`Users_uid`) REFERENCES `users` (`uid`);

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `fk_Posts_Users` FOREIGN KEY (`Users_uid`) REFERENCES `users` (`uid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
