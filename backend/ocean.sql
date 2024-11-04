-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Nov 04, 2024 at 06:32 AM
-- Server version: 8.3.0
-- PHP Version: 8.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ocean`
--
CREATE DATABASE IF NOT EXISTS `ocean` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `ocean`;

-- --------------------------------------------------------

--
-- Table structure for table `albums`
--

DROP TABLE IF EXISTS `albums`;
CREATE TABLE IF NOT EXISTS `albums` (
  `album_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `cover_image_url` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `artist_id` int NOT NULL,
  `release_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`album_id`)
) ENGINE=MyISAM AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `albums`
--

INSERT INTO `albums` (`album_id`, `title`, `cover_image_url`, `artist_id`, `release_date`, `created_at`, `updated_at`) VALUES
(4, 'Purpose', 'https://upload.wikimedia.org/wikipedia/en/5/54/Justin_Bieber_-_Purpose.png', 1, '2015-11-13 00:00:00', '2024-10-22 06:56:44', '2024-10-22 06:56:44'),
(5, '1989', 'https://upload.wikimedia.org/wikipedia/en/a/a5/Taylor_Swift_-_1989.png', 2, '2014-10-27 00:00:00', '2024-10-22 06:56:44', '2024-10-22 06:56:44'),
(6, '24K Magic', 'https://upload.wikimedia.org/wikipedia/en/3/3f/Bruno_Mars_-_24K_Magic.png', 3, '2016-11-18 00:00:00', '2024-10-22 06:56:44', '2024-10-22 06:56:44'),
(7, 'Divide', 'https://upload.wikimedia.org/wikipedia/en/3/3d/Ed_Sheeran_-_Divide.png', 4, '2017-03-03 00:00:00', '2024-10-22 06:56:44', '2024-10-22 06:56:44'),
(8, 'Thank U, Next', 'https://upload.wikimedia.org/wikipedia/en/e/e6/Ariana_Grande_-_Thank_U_Next.png', 5, '2019-02-08 00:00:00', '2024-10-22 06:56:44', '2024-10-22 06:56:44'),
(9, 'After Hours', 'https://upload.wikimedia.org/wikipedia/en/a/a0/The_Weeknd_-_After_Hours.png', 6, '2020-03-20 00:00:00', '2024-10-22 06:56:44', '2024-10-22 06:56:44'),
(10, 'Lover', 'https://upload.wikimedia.org/wikipedia/en/3/3e/Taylor_Swift_-_Lover.png', 2, '2019-08-23 00:00:00', '2024-10-22 06:56:44', '2024-10-22 06:56:44'),
(11, 'Folkore', 'https://upload.wikimedia.org/wikipedia/en/0/0c/Taylor_Swift_-_Folklore.png', 2, '2020-07-24 00:00:00', '2024-10-22 06:56:44', '2024-10-22 06:56:44'),
(12, 'X', 'https://upload.wikimedia.org/wikipedia/en/0/04/Ed_Sheeran_-_X.png', 4, '2014-06-20 00:00:00', '2024-10-22 06:56:44', '2024-10-22 06:56:44'),
(13, 'Thank U, Next', 'https://upload.wikimedia.org/wikipedia/en/e/e6/Ariana_Grande_-_Thank_U_Next.png', 5, '2019-02-08 00:00:00', '2024-10-22 06:56:44', '2024-10-22 06:56:44'),
(14, 'The Highlights', 'https://upload.wikimedia.org/wikipedia/en/2/27/The_Weeknd_-_The_Highlights.png', 6, '2021-02-05 00:00:00', '2024-10-22 06:56:44', '2024-10-22 06:56:44'),
(15, 'Positions', 'https://upload.wikimedia.org/wikipedia/en/6/65/Ariana_Grande_-_Positions.png', 5, '2020-10-30 00:00:00', '2024-10-22 06:56:44', '2024-10-22 06:56:44'),
(16, 'In the Lonely Hour', 'https://upload.wikimedia.org/wikipedia/en/4/4b/Sam_Smith_-_In_the_Lonely_Hour.png', 7, '2014-05-26 00:00:00', '2024-10-22 06:56:44', '2024-10-22 06:56:44'),
(17, 'Evolve', 'https://upload.wikimedia.org/wikipedia/en/4/4f/Imagine_Dragons_-_Evolve.png', 8, '2017-06-23 00:00:00', '2024-10-22 06:56:44', '2024-10-22 06:56:44'),
(18, 'Future Nostalgia', 'https://upload.wikimedia.org/wikipedia/en/d/d1/Dua_Lipa_-_Future_Nostalgia.png', 9, '2020-03-27 00:00:00', '2024-10-22 06:56:44', '2024-10-22 06:56:44'),
(19, 'Happier Than Ever', 'https://upload.wikimedia.org/wikipedia/en/5/5f/Billie_Eilish_-_Happier_Than_Ever.png', 10, '2021-07-30 00:00:00', '2024-10-22 06:56:44', '2024-10-22 06:56:44');

-- --------------------------------------------------------

--
-- Table structure for table `album_songs`
--

DROP TABLE IF EXISTS `album_songs`;
CREATE TABLE IF NOT EXISTS `album_songs` (
  `album_song_id` int NOT NULL AUTO_INCREMENT,
  `album_id` int NOT NULL,
  `song_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`album_song_id`)
) ENGINE=MyISAM AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `album_songs`
--

INSERT INTO `album_songs` (`album_song_id`, `album_id`, `song_id`, `created_at`, `updated_at`) VALUES
(5, 1, 1, '2024-10-22 06:57:43', '2024-10-22 06:57:43'),
(6, 1, 2, '2024-10-22 06:57:43', '2024-10-22 06:57:43'),
(7, 1, 3, '2024-10-22 06:57:43', '2024-10-22 06:57:43'),
(8, 1, 4, '2024-10-22 06:57:43', '2024-10-22 06:57:43'),
(9, 2, 5, '2024-10-22 06:57:43', '2024-10-22 06:57:43'),
(10, 2, 6, '2024-10-22 06:57:43', '2024-10-22 06:57:43'),
(11, 2, 7, '2024-10-22 06:57:43', '2024-10-22 06:57:43'),
(12, 3, 8, '2024-10-22 06:57:43', '2024-10-22 06:57:43'),
(13, 3, 9, '2024-10-22 06:57:43', '2024-10-22 06:57:43'),
(14, 4, 10, '2024-10-22 06:57:43', '2024-10-22 06:57:43'),
(15, 4, 11, '2024-10-22 06:57:43', '2024-10-22 06:57:43'),
(16, 5, 12, '2024-10-22 06:57:43', '2024-10-22 06:57:43'),
(17, 5, 13, '2024-10-22 06:57:43', '2024-10-22 06:57:43'),
(18, 6, 14, '2024-10-22 06:57:43', '2024-10-22 06:57:43'),
(19, 6, 15, '2024-10-22 06:57:43', '2024-10-22 06:57:43'),
(20, 7, 16, '2024-10-22 06:57:43', '2024-10-22 06:57:43'),
(21, 7, 17, '2024-10-22 06:57:43', '2024-10-22 06:57:43'),
(22, 8, 18, '2024-10-22 06:57:43', '2024-10-22 06:57:43'),
(23, 9, 19, '2024-10-22 06:57:43', '2024-10-22 06:57:43'),
(24, 9, 20, '2024-10-22 06:57:43', '2024-10-22 06:57:43'),
(25, 10, 21, '2024-10-22 06:57:43', '2024-10-22 06:57:43'),
(26, 10, 22, '2024-10-22 06:57:43', '2024-10-22 06:57:43'),
(27, 11, 23, '2024-10-22 06:57:43', '2024-10-22 06:57:43'),
(28, 12, 24, '2024-10-22 06:57:43', '2024-10-22 06:57:43');

-- --------------------------------------------------------

--
-- Table structure for table `artists`
--

DROP TABLE IF EXISTS `artists`;
CREATE TABLE IF NOT EXISTS `artists` (
  `artist_id` int NOT NULL AUTO_INCREMENT,
  `bio` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `user_id` int NOT NULL,
  `debut_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`artist_id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `artists`
--

INSERT INTO `artists` (`artist_id`, `bio`, `user_id`, `debut_date`, `created_at`, `updated_at`) VALUES
(1, 'Justin Bieber là một ca sĩ nhạc pop nổi tiếng người Canada, bắt đầu sự nghiệp từ khi còn nhỏ.', 1, '2008-01-01 00:00:00', '2024-10-22 06:32:11', '2024-10-22 06:32:11'),
(2, 'Taylor Swift là một ca sĩ và nhạc sĩ người Mỹ nổi tiếng với các bản hit như \"Love Story\" và \"Shake It Off\".', 2, '2006-10-24 00:00:00', '2024-10-22 06:32:11', '2024-10-22 06:32:11'),
(3, 'Bruno Mars là một ca sĩ người Mỹ với các bản hit như \"Just the Way You Are\" và \"Uptown Funk\".', 3, '2010-07-20 00:00:00', '2024-10-22 06:32:11', '2024-10-22 06:32:11'),
(4, 'Ed Sheeran là một ca sĩ người Anh với các bản hit như \"Shape of You\" và \"Perfect\".', 4, '2011-09-09 00:00:00', '2024-10-22 06:32:11', '2024-10-22 06:32:11'),
(5, 'Ariana Grande là một ca sĩ người Mỹ nổi tiếng với giọng hát mạnh mẽ và các ca khúc như \"Thank U, Next\".', 5, '2013-03-25 00:00:00', '2024-10-22 06:32:11', '2024-10-22 06:32:11'),
(6, 'The Weeknd là một ca sĩ người Canada nổi tiếng với âm nhạc đầy cảm xúc và sâu lắng.', 6, '2010-12-08 00:00:00', '2024-10-22 06:32:11', '2024-10-22 06:32:11');

-- --------------------------------------------------------

--
-- Table structure for table `artist_songs`
--

DROP TABLE IF EXISTS `artist_songs`;
CREATE TABLE IF NOT EXISTS `artist_songs` (
  `artist_song_id` int NOT NULL AUTO_INCREMENT,
  `artist_id` int NOT NULL,
  `song_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`artist_song_id`)
) ENGINE=MyISAM AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `artist_songs`
--

INSERT INTO `artist_songs` (`artist_song_id`, `artist_id`, `song_id`, `created_at`, `updated_at`) VALUES
(13, 1, 1, '2024-10-22 06:54:31', '2024-10-22 06:54:31'),
(14, 1, 2, '2024-10-22 06:54:31', '2024-10-22 06:54:31'),
(15, 2, 3, '2024-10-22 06:54:31', '2024-10-22 06:54:31'),
(16, 2, 4, '2024-10-22 06:54:31', '2024-10-22 06:54:31'),
(17, 3, 5, '2024-10-22 06:54:31', '2024-10-22 06:54:31'),
(18, 3, 6, '2024-10-22 06:54:31', '2024-10-22 06:54:31'),
(19, 4, 7, '2024-10-22 06:54:31', '2024-10-22 06:54:31'),
(20, 4, 8, '2024-10-22 06:54:31', '2024-10-22 06:54:31'),
(21, 5, 9, '2024-10-22 06:54:31', '2024-10-22 06:54:31'),
(22, 5, 10, '2024-10-22 06:54:31', '2024-10-22 06:54:31'),
(23, 6, 11, '2024-10-22 06:54:31', '2024-10-22 06:54:31'),
(24, 6, 12, '2024-10-22 06:54:31', '2024-10-22 06:54:31'),
(25, 1, 13, '2024-10-22 06:54:31', '2024-10-22 06:54:31'),
(26, 2, 14, '2024-10-22 06:54:31', '2024-10-22 06:54:31'),
(27, 3, 15, '2024-10-22 06:54:31', '2024-10-22 06:54:31'),
(28, 4, 16, '2024-10-22 06:54:31', '2024-10-22 06:54:31'),
(29, 5, 17, '2024-10-22 06:54:31', '2024-10-22 06:54:31'),
(30, 6, 18, '2024-10-22 06:54:31', '2024-10-22 06:54:31'),
(31, 6, 19, '2024-10-22 06:54:31', '2024-10-22 06:54:31'),
(32, 5, 20, '2024-10-22 06:54:31', '2024-10-22 06:54:31');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
CREATE TABLE IF NOT EXISTS `comments` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `song_id` int NOT NULL,
  `comment` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`comment_id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`comment_id`, `user_id`, `song_id`, `comment`, `created_at`) VALUES
(1, 1, 1, 'This song is amazing!', '2024-10-22 00:00:00'),
(2, 2, 2, 'I love this track!', '2024-10-22 00:01:00');

-- --------------------------------------------------------

--
-- Table structure for table `favorites`
--

DROP TABLE IF EXISTS `favorites`;
CREATE TABLE IF NOT EXISTS `favorites` (
  `favorite_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `song_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`favorite_id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `favorites`
--

INSERT INTO `favorites` (`favorite_id`, `user_id`, `song_id`, `created_at`) VALUES
(1, 1, 1, '2024-10-22 00:05:00'),
(2, 2, 3, '2024-10-22 00:06:00');

-- --------------------------------------------------------

--
-- Table structure for table `genres`
--

DROP TABLE IF EXISTS `genres`;
CREATE TABLE IF NOT EXISTS `genres` (
  `genre_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`genre_id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `genres`
--

INSERT INTO `genres` (`genre_id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Pop', '2024-10-22 00:10:00', '2024-10-22 00:10:00'),
(2, 'Rock', '2024-10-22 00:10:00', '2024-10-22 00:10:00'),
(3, 'Hip-Hop', '2024-10-22 01:00:00', '2024-10-22 01:00:00'),
(4, 'Jazz', '2024-10-22 01:01:00', '2024-10-22 01:01:00'),
(5, 'Electronic', '2024-10-22 01:02:00', '2024-10-22 01:02:00'),
(6, 'Classical', '2024-10-22 01:03:00', '2024-10-22 01:03:00'),
(7, 'R&B', '2024-10-22 01:04:00', '2024-10-22 01:04:00');

-- --------------------------------------------------------

--
-- Table structure for table `listening_history`
--

DROP TABLE IF EXISTS `listening_history`;
CREATE TABLE IF NOT EXISTS `listening_history` (
  `listening_history_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `song_id` int NOT NULL,
  `listening_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `duration_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`listening_history_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `playlists`
--

DROP TABLE IF EXISTS `playlists`;
CREATE TABLE IF NOT EXISTS `playlists` (
  `playlist_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`playlist_id`)
) ENGINE=MyISAM AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `playlists`
--

INSERT INTO `playlists` (`playlist_id`, `title`, `user_id`, `created_at`, `updated_at`) VALUES
(1, 'Justin\'s Favorites', 1, '2024-10-22 06:37:41', '2024-10-22 06:37:41'),
(2, 'Chill Vibes', 1, '2024-10-22 06:37:41', '2024-10-22 06:37:41'),
(3, 'Taylor\'s Love Songs', 2, '2024-10-22 06:37:41', '2024-10-22 06:37:41'),
(4, 'Country Classics', 2, '2024-10-22 06:37:41', '2024-10-22 06:37:41'),
(5, 'Funky Hits', 3, '2024-10-22 06:37:41', '2024-10-22 06:37:41'),
(6, 'Feel Good Tunes', 3, '2024-10-22 06:37:41', '2024-10-22 06:37:41'),
(7, 'Ed\'s Romantic Collection', 4, '2024-10-22 06:37:41', '2024-10-22 06:37:41'),
(8, 'Acoustic Favorites', 4, '2024-10-22 06:37:41', '2024-10-22 06:37:41'),
(9, 'Ariana\'s Top Hits', 5, '2024-10-22 06:37:41', '2024-10-22 06:37:41'),
(10, 'Pop Anthems', 5, '2024-10-22 06:37:41', '2024-10-22 06:37:41'),
(11, 'The Weeknd\'s Essentials', 6, '2024-10-22 06:37:41', '2024-10-22 06:37:41'),
(12, 'Night Vibes', 6, '2024-10-22 06:37:41', '2024-10-22 06:37:41'),
(13, 'Daily Mix', 7, '2024-10-22 06:37:41', '2024-10-22 06:37:41'),
(14, 'Road Trip Songs', 7, '2024-10-22 06:37:41', '2024-10-22 06:37:41'),
(15, 'Workout Playlist', 8, '2024-10-22 06:37:41', '2024-10-22 06:37:41'),
(16, 'Relaxing Tunes', 8, '2024-10-22 06:37:41', '2024-10-22 06:37:41');

-- --------------------------------------------------------

--
-- Table structure for table `playlist_songs`
--

DROP TABLE IF EXISTS `playlist_songs`;
CREATE TABLE IF NOT EXISTS `playlist_songs` (
  `playlist_song_id` int NOT NULL AUTO_INCREMENT,
  `playlist_id` int NOT NULL,
  `song_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`playlist_song_id`)
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `playlist_songs`
--

INSERT INTO `playlist_songs` (`playlist_song_id`, `playlist_id`, `song_id`, `created_at`, `updated_at`) VALUES
(1, 1, 1, '2024-10-21 23:40:00', '2024-10-21 23:40:00'),
(2, 1, 2, '2024-10-21 23:40:00', '2024-10-21 23:40:00'),
(3, 2, 3, '2024-10-21 23:41:00', '2024-10-21 23:41:00'),
(4, 2, 4, '2024-10-21 23:41:00', '2024-10-21 23:41:00'),
(5, 3, 5, '2024-10-21 23:42:00', '2024-10-21 23:42:00'),
(6, 3, 6, '2024-10-21 23:42:00', '2024-10-21 23:42:00'),
(7, 4, 7, '2024-10-21 23:43:00', '2024-10-21 23:43:00'),
(8, 4, 8, '2024-10-21 23:43:00', '2024-10-21 23:43:00'),
(9, 5, 9, '2024-10-21 23:44:00', '2024-10-21 23:44:00'),
(10, 5, 10, '2024-10-21 23:44:00', '2024-10-21 23:44:00'),
(11, 6, 11, '2024-10-21 23:45:00', '2024-10-21 23:45:00'),
(12, 6, 12, '2024-10-21 23:45:00', '2024-10-21 23:45:00'),
(13, 7, 13, '2024-10-21 23:46:00', '2024-10-21 23:46:00'),
(14, 7, 14, '2024-10-21 23:46:00', '2024-10-21 23:46:00'),
(15, 8, 15, '2024-10-21 23:47:00', '2024-10-21 23:47:00'),
(16, 8, 16, '2024-10-21 23:47:00', '2024-10-21 23:47:00'),
(17, 9, 17, '2024-10-21 23:48:00', '2024-10-21 23:48:00'),
(18, 9, 18, '2024-10-21 23:48:00', '2024-10-21 23:48:00'),
(19, 10, 19, '2024-10-21 23:49:00', '2024-10-21 23:49:00'),
(20, 10, 20, '2024-10-21 23:49:00', '2024-10-21 23:49:00');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `role_id` int NOT NULL AUTO_INCREMENT,
  `role_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`role_id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`role_id`, `role_name`, `created_at`, `updated_at`) VALUES
(1, 'Admin', '2024-10-22 01:30:00', '2024-10-22 01:30:00'),
(2, 'User', '2024-10-22 01:31:00', '2024-10-22 01:31:00'),
(3, 'Moderator', '2024-10-22 01:32:00', '2024-10-22 01:32:00'),
(4, 'Guest', '2024-10-22 01:33:00', '2024-10-22 01:33:00'),
(5, 'Super Admin', '2024-10-22 01:34:00', '2024-10-22 01:34:00'),
(6, 'Content Creator', '2024-10-22 01:35:00', '2024-10-22 01:35:00'),
(7, 'Subscriber', '2024-10-22 01:36:00', '2024-10-22 01:36:00');

-- --------------------------------------------------------

--
-- Table structure for table `royalties`
--

DROP TABLE IF EXISTS `royalties`;
CREATE TABLE IF NOT EXISTS `royalties` (
  `royalties_id` int NOT NULL AUTO_INCREMENT,
  `artist_id` int NOT NULL,
  `song_id` int NOT NULL,
  `amount` double NOT NULL,
  `payment_date` datetime NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`royalties_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `songs`
--

DROP TABLE IF EXISTS `songs`;
CREATE TABLE IF NOT EXISTS `songs` (
  `song_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `duration` int NOT NULL,
  `genre_id` int NOT NULL,
  `release_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `file_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `cover_image_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `lyric` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `play_count` int DEFAULT '0',
  PRIMARY KEY (`song_id`)
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `songs`
--

INSERT INTO `songs` (`song_id`, `title`, `duration`, `genre_id`, `release_date`, `file_url`, `cover_image_url`, `lyric`, `created_at`, `updated_at`, `play_count`) VALUES
(1, 'Love Yourself', 240, 1, '2015-11-13 00:00:00', 'songs/love_yourself.mp3', 'covers/love_yourself.jpg', 'For all the times that you rain on my parade...', '2024-10-22 06:34:50', '2024-10-22 06:34:50', 0),
(2, 'Sorry', 200, 1, '2015-10-23 00:00:00', 'songs/sorry.mp3', 'covers/sorry.jpg', 'Is it too late now to say sorry?', '2024-10-22 06:34:50', '2024-10-22 06:34:50', 0),
(3, 'Blank Space', 231, 2, '2014-11-10 00:00:00', 'songs/blank_space.mp3', 'covers/blank_space.jpg', 'Got a long list of ex-lovers, they\'ll tell you I\'m insane...', '2024-10-22 06:34:50', '2024-10-22 06:34:50', 0),
(4, 'Love Story', 235, 2, '2008-09-15 00:00:00', 'songs/love_story.mp3', 'covers/love_story.jpg', 'Romeo, take me somewhere we can be alone...', '2024-10-22 06:34:50', '2024-10-22 06:34:50', 0),
(5, 'Just The Way You Are', 220, 3, '2010-07-20 00:00:00', 'songs/just_the_way_you_are.mp3', 'covers/just_the_way_you_are.jpg', 'When I see your face, there\'s not a thing that I would change...', '2024-10-22 06:34:50', '2024-10-22 06:34:50', 0),
(6, 'Uptown Funk', 270, 3, '2014-11-10 00:00:00', 'songs/uptown_funk.mp3', 'covers/uptown_funk.jpg', 'This hit, that ice cold, Michelle Pfeiffer, that white gold...', '2024-10-22 06:34:50', '2024-10-22 06:34:50', 0),
(7, 'Shape of You', 233, 4, '2017-01-06 00:00:00', 'songs/shape_of_you.mp3', 'covers/shape_of_you.jpg', 'I\'m in love with the shape of you...', '2024-10-22 06:34:50', '2024-10-22 06:34:50', 0),
(8, 'Perfect', 263, 4, '2017-03-03 00:00:00', 'songs/perfect.mp3', 'covers/perfect.jpg', 'Darling, you look perfect tonight...', '2024-10-22 06:34:50', '2024-10-22 06:34:50', 0),
(9, 'Thank U, Next', 207, 5, '2018-11-03 00:00:00', 'songs/thank_u_next.mp3', 'covers/thank_u_next.jpg', 'Thank you, next...', '2024-10-22 06:34:50', '2024-10-22 06:34:50', 0),
(10, '7 rings', 178, 5, '2019-01-18 00:00:00', 'songs/7_rings.mp3', 'covers/7_rings.jpg', 'I want it, I got it...', '2024-10-22 06:34:50', '2024-10-22 06:34:50', 0),
(11, 'Blinding Lights', 200, 6, '2019-11-29 00:00:00', 'songs/blinding_lights.mp3', 'covers/blinding_lights.jpg', 'I said, ooh, I\'m blinded by the lights...', '2024-10-22 06:34:50', '2024-10-22 06:34:50', 0),
(12, 'Starboy', 230, 6, '2016-09-22 00:00:00', 'songs/starboy.mp3', 'covers/starboy.jpg', 'I\'m tryna put you in the worst mood...', '2024-10-22 06:34:50', '2024-10-22 06:34:50', 0),
(13, 'Sorry', 230, 1, '2015-10-23 00:00:00', 'songs/sorry.mp3', 'covers/sorry.jpg', 'Is it too late now to say sorry?', '2024-10-22 01:10:00', '2024-10-22 01:10:00', 0),
(14, 'Shake It Off', 250, 1, '2014-08-18 00:00:00', 'songs/shake_it_off.mp3', 'covers/shake_it_off.jpg', 'Cause the players gonna play...', '2024-10-22 01:12:00', '2024-10-22 01:12:00', 0),
(15, 'Uptown Funk', 270, 3, '2014-11-10 00:00:00', 'songs/uptown_funk.mp3', 'covers/uptown_funk.jpg', 'Don\'t believe me, just watch...', '2024-10-22 01:14:00', '2024-10-22 01:14:00', 0),
(16, 'Take Five', 320, 4, '1959-09-21 00:00:00', 'songs/take_five.mp3', 'covers/take_five.jpg', 'Instrumental jazz song.', '2024-10-22 01:15:00', '2024-10-22 01:15:00', 0),
(17, 'Billie Jean', 300, 7, '1982-01-02 00:00:00', 'songs/billie_jean.mp3', 'covers/billie_jean.jpg', 'Billie Jean is not my lover...', '2024-10-22 01:17:00', '2024-10-22 01:17:00', 0),
(18, 'All of Me', 260, 7, '2013-08-12 00:00:00', 'songs/all_of_me.mp3', 'covers/all_of_me.jpg', 'Cause all of me, loves all of you...', '2024-10-22 01:18:00', '2024-10-22 01:18:00', 0),
(19, 'Blinding Lights', 240, 5, '2019-11-29 00:00:00', 'songs/blinding_lights.mp3', 'covers/blinding_lights.jpg', 'I\'m blinded by the lights...', '2024-10-22 01:20:00', '2024-10-22 01:20:00', 0),
(20, 'Beethoven Symphony No.9', 400, 6, '1824-05-07 00:00:00', 'songs/symphony_9.mp3', 'covers/symphony_9.jpg', 'Instrumental classical music.', '2024-10-22 01:22:00', '2024-10-22 01:22:00', 0);

-- --------------------------------------------------------

--
-- Table structure for table `statistics`
--

DROP TABLE IF EXISTS `statistics`;
CREATE TABLE IF NOT EXISTS `statistics` (
  `statistics_id` int NOT NULL AUTO_INCREMENT,
  `song_id` int NOT NULL,
  `play_count` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`statistics_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `subscription`
--

DROP TABLE IF EXISTS `subscription`;
CREATE TABLE IF NOT EXISTS `subscription` (
  `subscription_id` int NOT NULL AUTO_INCREMENT,
  `subscription_name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subscription_valid_date` int NOT NULL,
  PRIMARY KEY (`subscription_id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `subscription`
--

INSERT INTO `subscription` (`subscription_id`, `subscription_name`, `subscription_valid_date`) VALUES
(1, 'Mini', 7),
(2, 'Individual', 30),
(3, 'Student', 30);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `role_id` int DEFAULT NULL,
  `date_registered` datetime DEFAULT CURRENT_TIMESTAMP,
  `profile_url` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_login` datetime DEFAULT CURRENT_TIMESTAMP,
  `subscription_id` int DEFAULT '1',
  `phone_number` int DEFAULT NULL,
  `is_vip` tinyint(1) DEFAULT '0',
  `vip_expiration` datetime DEFAULT CURRENT_TIMESTAMP,
  `login_attempts` int DEFAULT '0',
  `last_login_attempt` datetime DEFAULT CURRENT_TIMESTAMP,
  `gender` tinyint(1) DEFAULT '0',
  `date_of_birth` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `first_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `email`, `password`, `role_id`, `date_registered`, `profile_url`, `status`, `last_login`, `subscription_id`, `phone_number`, `is_vip`, `vip_expiration`, `login_attempts`, `last_login_attempt`, `gender`, `date_of_birth`, `created_at`, `updated_at`, `first_name`, `last_name`) VALUES
(1, 'justinbieber', 'a@gmail.com', '1', 2, '2024-10-22 13:32:11', '/profiles/justinbieber.jpg', NULL, '2024-10-22 13:32:11', 0, 1234567890, 0, '2024-10-22 13:32:11', 0, '2024-10-22 13:32:11', 1, '1994-03-01 00:00:00', '2024-10-23 07:17:02', '2024-10-23 07:17:02', NULL, NULL),
(2, 'taylorswift', 'taylorswift@example.com', 'hashedpassword123', 2, '2024-10-22 13:32:11', '/profiles/taylorswift.jpg', NULL, '2024-10-22 13:32:11', 0, 1234567891, 0, '2024-10-22 13:32:11', 0, '2024-10-22 13:32:11', 0, '1989-12-13 00:00:00', '2024-10-22 06:32:11', '2024-10-22 06:32:11', NULL, NULL),
(3, 'brunomars', 'brunomars@example.com', 'hashedpassword123', 2, '2024-10-22 13:32:11', '/profiles/brunomars.jpg', NULL, '2024-10-22 13:32:11', 0, 1234567892, 0, '2024-10-22 13:32:11', 0, '2024-10-22 13:32:11', 1, '1985-10-08 00:00:00', '2024-10-22 06:32:11', '2024-10-22 06:32:11', NULL, NULL),
(4, 'edsheeran', 'edsheeran@example.com', 'hashedpassword123', 2, '2024-10-22 13:32:11', '/profiles/edsheeran.jpg', NULL, '2024-10-22 13:32:11', 0, 1234567893, 0, '2024-10-22 13:32:11', 0, '2024-10-22 13:32:11', 1, '1991-02-17 00:00:00', '2024-10-22 06:32:11', '2024-10-22 06:32:11', NULL, NULL),
(5, 'arianagrande', 'arianagrande@example.com', 'hashedpassword123', 2, '2024-10-22 13:32:11', '/profiles/arianagrande.jpg', NULL, '2024-10-22 13:32:11', 0, 1234567894, 0, '2024-10-22 13:32:11', 0, '2024-10-22 13:32:11', 0, '1993-06-26 00:00:00', '2024-10-22 06:32:11', '2024-10-22 06:32:11', NULL, NULL),
(6, 'theweeknd', 'theweeknd@example.com', 'hashedpassword123', 2, '2024-10-22 13:32:11', '/profiles/theweeknd.jpg', NULL, '2024-10-22 13:32:11', 0, 1234567895, 0, '2024-10-22 13:32:11', 0, '2024-10-22 13:32:11', 1, '1990-02-16 00:00:00', '2024-10-22 06:32:11', '2024-10-22 06:32:11', NULL, NULL),
(7, 'john_doe', 'johndoe@example.com', 'hashedpassword123', 1, '2024-10-22 13:32:28', '/profiles/johndoe.jpg', NULL, '2024-10-22 13:32:28', 0, 1234567896, 0, '2024-10-22 13:32:28', 0, '2024-10-22 13:32:28', 1, '1995-07-19 00:00:00', '2024-10-22 06:32:28', '2024-10-22 06:32:28', NULL, NULL),
(8, 'jane_smith', 'janesmith@example.com', 'hashedpassword123', 1, '2024-10-22 13:32:28', '/profiles/janesmith.jpg', NULL, '2024-10-22 13:32:28', 0, 1234567897, 0, '2024-10-22 13:32:28', 0, '2024-10-22 13:32:28', 0, '1997-04-14 00:00:00', '2024-10-22 06:32:28', '2024-10-22 06:32:28', NULL, NULL),
(21, 'Admin', 'caot43069@gmail.com', '$2a$10$LMzzzwMiPg7/eRVN8iKpbekBSG44njPgLuB431pUXoaOSYdtU3Yma', 1, '2024-10-23 15:55:50', '', 'active', '2024-10-23 15:55:50', 0, 123, 0, '2024-10-23 15:55:50', 0, '2024-10-23 15:55:50', 0, NULL, '2024-11-04 06:20:45', '2024-11-04 06:20:45', 'Truong', 'Thanh'),
(22, 'Admin', 'thanht43069@gmail.com', '$2a$10$uhV33uEVBcC6Odd2xIr.5uINTHSRjzYj.xPFYi5d/pvXM9qOCnpKO', 1, '2024-10-23 17:01:04', '', 'active', '2024-10-23 17:01:04', 2, 123, 1, '2024-10-23 17:01:04', 0, '2024-10-23 17:01:04', 0, NULL, '2024-11-04 06:30:55', '2024-11-04 06:30:55', 'Truong', 'Thanh'),
(23, '123', 'ab@gmail.com', '$2a$10$w7I3pMdFk9AmZSq6hRoEZu5gA9nPCPbI/AHIvJtl3RoqcXmkv/zaa', 1, '2024-10-23 17:18:32', '', 'active', '2024-10-23 17:18:32', 0, 123, 0, '2024-10-23 17:18:32', 0, '2024-10-23 17:18:32', 0, NULL, '2024-10-23 10:18:32', '2024-10-23 10:18:32', 'Truong', 'Thanh');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
