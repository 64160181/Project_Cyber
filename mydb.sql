-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 28, 2024 at 07:33 PM
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
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `uid` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `profile_picture` varchar(10) DEFAULT NULL,
  `isadmin` int(1) NOT NULL,
  `createdate` timestamp NOT NULL DEFAULT current_timestamp(),
  `editdate` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`uid`, `username`, `password`, `email`, `profile_picture`, `isadmin`, `createdate`, `editdate`) VALUES
(1, 'asd', 'asd', 'asdsa@gmail', NULL, 0, '2024-02-28 16:12:35', '2024-02-28 16:12:35'),
(2, 'admin', 'asd', 'asdsa@gmail', NULL, 0, '2024-02-28 16:17:32', '2024-02-28 16:17:32'),
(3, 'asd', '1111', 'asd@asd', NULL, 0, '2024-02-28 16:32:51', '2024-02-28 16:32:51'),
(4, 'admin', '2312', 'asdsa@gmail', NULL, 0, '2024-02-28 16:34:01', '2024-02-28 16:34:01'),
(5, 'asd', 'asd', 'asd@asdsa', NULL, 0, '2024-02-28 16:34:57', '2024-02-28 16:34:57'),
(6, 'admin', 'asdssdsd', 'asdsa@gmail', NULL, 0, '2024-02-28 16:35:10', '2024-02-28 16:35:10'),
(7, 'admin', '11111', 'kingtv2546@gmail.com', NULL, 0, '2024-02-28 18:19:01', '2024-02-28 18:19:01'),
(8, 'admin', '22222', 'kingtv2546@gmail.com', NULL, 0, '2024-02-28 18:20:19', '2024-02-28 18:20:19'),
(9, 'admin', '11111', 'kingtv2546@gmail.com', NULL, 0, '2024-02-28 18:21:52', '2024-02-28 18:21:52'),
(10, 'admin', '22222', 'kingtv2546@gmail.com', NULL, 0, '2024-02-28 18:23:00', '2024-02-28 18:23:00'),
(11, 'admin', '22222', 'kingtv2546@gmail.com', NULL, 0, '2024-02-28 18:26:31', '2024-02-28 18:26:31'),
(12, 'admin', '22222', 'kingtv2546@gmail.com', NULL, 0, '2024-02-28 18:27:42', '2024-02-28 18:27:42');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`uid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `uid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
