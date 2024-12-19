-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Nov 22, 2024 at 02:50 PM
-- Server version: 8.3.0
-- PHP Version: 7.4.33

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
(1, 'Rosie', 'rosie.png', 7, '2015-11-13 00:00:00', '2024-11-20 11:15:36', '2024-11-20 11:15:36'),
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
(16, 'Born Pink', 'born_pink.png', 7, '2014-05-26 00:00:00', '2024-11-20 11:21:28', '2024-11-20 11:21:28'),
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
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `artists`
--

INSERT INTO `artists` (`artist_id`, `bio`, `user_id`, `debut_date`, `created_at`, `updated_at`) VALUES
(1, 'League of Legends (LoL), commonly referred to as League, is a 2009 multiplayer online battle arena video game developed and published by Riot Games. Inspired by Defense of the Ancients, a custom map for Warcraft III, Riot\'s founders sought to develop a stand-alone game in the same genre. Since its release in October 2009, League has been free-to-play and is monetized through purchasable character customization. The game is available for Microsoft Windows and macOS.', 1, '2008-01-01 00:00:00', '2024-11-18 13:04:05', '2024-11-18 13:04:05'),
(2, 'NewJeans (뉴진스) là một nhóm nhạc nữ gồm 5 thành viên trực thuộc ADOR và HYBE Labels . Các thành viên là  Minji, Hanni ,  Danielle , Haerin và Hyein . Họ đã phát hành đĩa đơn đầu tay \"Attention\" vào ngày 22 tháng 7 năm 2022. Họ chính thức ra mắt vào ngày 1 tháng 8 năm 2022 với EP đầu tiên của mình, New Jeans .', 2, '2006-10-24 00:00:00', '2024-11-18 13:04:27', '2024-11-18 13:04:27'),
(3, 'Peter Gene Hernandez (sinh 8 tháng 10 năm 1985), được biết đến với nghệ danh Bruno Mars, là một ca sĩ-nhạc sĩ và nhà sản xuất thu âm người Mỹ. Mars lớn lên trong một gia đình nghệ sĩ ở Honolulu, Hawaii và anh đã bắt đầu ca hát từ khi còn nhỏ. Sau khi biểu diễn nhiều nơi ở quê nhà quê anh thời niên thiếu, anh quyết định theo đuổi sự nghiệp ca hát. Anh đã bắt đầu sản xuất bài hát cho các nghệ sĩ khác, tham gia nhóm sản xuất The Smeezingtons.', 3, '2010-07-20 00:00:00', '2024-11-18 13:04:57', '2024-11-18 13:04:57'),
(4, 'Edward Christopher \"Ed\" Sheeran MBE (sinh ngày 17 tháng 2 năm 1991)[4] hay còn được biết đến với nghệ danh Ed Sheeran là một nam ca sĩ-nhạc sĩ người Anh. Ed được sinh ra tại Hebden Bridge, Yorkshire và lớn lên tại Framlingham, Suffolk.', 4, '2011-09-09 00:00:00', '2024-11-18 13:05:14', '2024-11-18 13:05:14'),
(5, 'Taylor Alison Swift (sinh ngày 13 tháng 12 năm 1989) là một ca sĩ kiêm nhạc sĩ người Mỹ. Được biết đến với khả năng sáng tác tiểu sử, sáng tạo nghệ thuật và tác động văn hóa , Swift là một nhân vật hàng đầu trong nền âm nhạc đại chúng và là chủ đề được công chúng quan tâm rộng rãi .', 5, '2013-03-25 00:00:00', '2024-11-18 13:05:44', '2024-11-18 13:05:44'),
(6, 'Maroon 5 là một ban nhạc pop rock người Mỹ đến từ Los Angeles, California.[1][2][3] Nổi tiếng từ năm 2004 sau single \"This Love\", sự nghiệp của Maroon 5 liên tục có những bước tiến vững chắc. Dù từng phải thay đổi thành viên (tay trống Ryan Dusick rời nhóm vào năm 2006) song Maroon 5 vẫn tiếp tục thành công nhờ sự định hướng của Jesse Carmicheal, Adam Levine và James Valentine.', 6, '2010-12-08 00:00:00', '2024-11-18 13:06:01', '2024-11-18 13:06:01'),
(7, 'Roseanne Park MBE (sinh ngày 11 tháng 2 năm 1997), được biết đến với nghệ danh là Rosé (Tiếng Hàn: 로제), là một ca sỹ và vũ công người Hàn Quốc gốc New Zealand[3][4] hoạt động tại Hàn Quốc.[5] Sinh ra ở New Zealand và lớn lên ở Úc, Rosé đã ký hợp đồng với công ty Hàn Quốc YG Entertainment sau buổi thử giọng thành công vào năm 2012 và được đào tạo trong bốn năm trước khi ra mắt với tư cách là thành viên của nhóm nhạc nữ Blackpink vào tháng 8 năm 2016.', 24, '2024-11-05 16:19:00', '2024-11-05 09:19:00', '2024-11-05 09:19:00'),
(8, 'Roseanne Park MBE (sinh ngày 11 tháng 2 năm 1997), được biết đến với nghệ danh là Rosé (Tiếng Hàn: 로제), là một ca sỹ và vũ công người Hàn Quốc gốc New Zealand[3][4] hoạt động tại Hàn Quốc.[5] Sinh ra ở New Zealand và lớn lên ở Úc, Rosé đã ký hợp đồng với công ty Hàn Quốc YG Entertainment sau buổi thử giọng thành công vào năm 2012 và được đào tạo trong bốn năm trước khi ra mắt với tư cách là thành viên của nhóm nhạc nữ Blackpink vào tháng 8 năm 2016.', 21, '2024-11-14 14:32:16', '2024-11-18 13:06:17', '2024-11-18 13:06:17');

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
) ENGINE=MyISAM AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `artist_songs`
--

INSERT INTO `artist_songs` (`artist_song_id`, `artist_id`, `song_id`, `created_at`, `updated_at`) VALUES
(13, 1, 1, '2024-10-22 06:54:31', '2024-10-22 06:54:31'),
(14, 2, 2, '2024-11-14 06:28:54', '2024-11-14 06:28:54'),
(15, 1, 3, '2024-11-14 07:03:37', '2024-11-14 07:03:37'),
(16, 1, 4, '2024-11-14 07:21:41', '2024-11-14 07:21:41'),
(17, 8, 5, '2024-11-14 07:32:27', '2024-11-14 07:32:27'),
(18, 3, 6, '2024-10-22 06:54:31', '2024-10-22 06:54:31'),
(19, 4, 7, '2024-10-22 06:54:31', '2024-10-22 06:54:31'),
(20, 8, 8, '2024-11-14 08:07:08', '2024-11-14 08:07:08'),
(21, 8, 9, '2024-11-14 08:12:52', '2024-11-14 08:12:52'),
(22, 1, 10, '2024-11-14 08:15:51', '2024-11-14 08:15:51'),
(23, 8, 11, '2024-11-14 08:19:18', '2024-11-14 08:19:18'),
(24, 5, 12, '2024-11-14 08:26:09', '2024-11-14 08:26:09'),
(25, 5, 13, '2024-11-14 08:22:55', '2024-11-14 08:22:55'),
(26, 5, 14, '2024-11-14 08:23:07', '2024-11-14 08:23:07'),
(27, 3, 15, '2024-10-22 06:54:31', '2024-10-22 06:54:31'),
(28, 6, 16, '2024-11-14 08:37:01', '2024-11-14 08:37:01'),
(29, 5, 17, '2024-10-22 06:54:31', '2024-10-22 06:54:31'),
(30, 6, 18, '2024-10-22 06:54:31', '2024-10-22 06:54:31'),
(31, 6, 19, '2024-10-22 06:54:31', '2024-10-22 06:54:31'),
(32, 5, 20, '2024-10-22 06:54:31', '2024-10-22 06:54:31'),
(33, 7, 21, '2024-11-05 09:19:30', '2024-11-05 09:19:30'),
(38, 7, 27, '2024-11-21 12:16:43', '2024-11-21 12:16:43'),
(40, 8, 29, '2024-11-21 14:17:59', '2024-11-21 14:17:59'),
(41, 7, 30, '2024-11-22 14:42:24', '2024-11-22 14:42:24');

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
  `image` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `title` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`playlist_id`)
) ENGINE=MyISAM AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `playlists`
--

INSERT INTO `playlists` (`playlist_id`, `image`, `title`, `user_id`, `created_at`, `updated_at`) VALUES
(1, 'us-uk-chill.png', 'US-UK Chill', 1, '2024-11-05 07:51:04', '2024-11-05 07:51:04'),
(2, 'edm.png', 'EDM', 1, '2024-11-05 07:53:32', '2024-11-05 07:53:32'),
(3, 'taylor_love_song.png', 'Taylor\'s Love Songs', 2, '2024-11-05 07:55:01', '2024-11-05 07:55:01'),
(4, 'country_classic.png', 'Country Classics', 2, '2024-11-05 07:55:46', '2024-11-05 07:55:46'),
(5, 'funky_hits.png', 'Funky Hits', 3, '2024-11-05 07:56:44', '2024-11-05 07:56:44'),
(6, 'feel_good_tunes.png', 'Feel Good Tunes', 3, '2024-11-05 07:57:44', '2024-11-05 07:57:44'),
(7, 'romantic.png', 'Ed\'s Romantic Collection', 4, '2024-11-05 08:02:45', '2024-11-05 08:02:45'),
(8, 'acoustic.png', 'Acoustic Favorites', 4, '2024-11-05 08:03:47', '2024-11-05 08:03:47'),
(9, 'arina_top_hits.png', 'Ariana\'s Top Hits', 5, '2024-11-05 08:04:56', '2024-11-05 08:04:56'),
(10, 'pop_anthems.png', 'Pop Anthems', 5, '2024-11-05 08:05:51', '2024-11-05 08:05:51'),
(11, 'theweekend_essential.png', 'The Weeknd\'s Essentials', 6, '2024-11-05 08:06:49', '2024-11-05 08:06:49'),
(12, 'night_vibes.png', 'Night Vibes', 6, '2024-11-05 08:08:24', '2024-11-05 08:08:24'),
(13, 'daily_mix.png', 'Daily Mix', 7, '2024-11-05 08:09:39', '2024-11-05 08:09:39'),
(14, 'road_trip.png', 'Road Trip Songs', 7, '2024-11-05 08:18:48', '2024-11-05 08:18:48'),
(15, 'workout.png', 'Workout Playlist', 8, '2024-11-05 08:20:41', '2024-11-05 08:20:41'),
(16, 'relax_tunes.png', 'Relaxing Tunes', 8, '2024-11-05 08:21:12', '2024-11-05 08:21:12');

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
) ENGINE=MyISAM AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `playlist_songs`
--

INSERT INTO `playlist_songs` (`playlist_song_id`, `playlist_id`, `song_id`, `created_at`, `updated_at`) VALUES
(1, 1, 1, '2024-10-21 23:40:00', '2024-10-21 23:40:00'),
(2, 1, 2, '2024-10-21 23:40:00', '2024-10-21 23:40:00'),
(3, 1, 3, '2024-11-14 07:21:32', '2024-11-14 07:21:32'),
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
(20, 10, 20, '2024-10-21 23:49:00', '2024-10-21 23:49:00'),
(22, 18, 21, '2024-11-17 03:22:33', '2024-11-17 03:22:33'),
(24, 17, 1, '2024-11-17 05:46:40', '2024-11-17 05:46:40'),
(27, 17, 2, '2024-11-20 07:11:12', '2024-11-20 07:11:12'),
(28, 18, 2, '2024-11-20 07:20:59', '2024-11-20 07:20:59'),
(29, 21, 2, '2024-11-20 07:21:25', '2024-11-20 07:21:25'),
(31, 22, 21, '2024-11-21 13:40:47', '2024-11-21 13:40:47');

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
(3, 'Artist', '2024-11-20 10:21:58', '2024-11-20 10:21:58'),
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
  `duration` int DEFAULT NULL,
  `genre_id` int DEFAULT NULL,
  `release_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `file_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cover_image_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lyric` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `play_count` int DEFAULT '0',
  PRIMARY KEY (`song_id`)
) ENGINE=MyISAM AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `songs`
--

INSERT INTO `songs` (`song_id`, `title`, `duration`, `genre_id`, `release_date`, `file_url`, `cover_image_url`, `lyric`, `created_at`, `updated_at`, `play_count`) VALUES
(1, 'Heavy Is the Crown', 240, 1, '2015-11-13 00:00:00', 'heavy_is_the_crown.mp3', 'heavy_is_the_crown.png', 'It\'s pourin\' in, you\'re laid on the floor again\nOne knock at the door and then\nWe both know how the story ends\nYou can\'t win if your white flag\'s out when the war begins\nAimin\' so high, but swingin\' so low\nTryna catch fire, but feelin\' so cold\nHold it inside, and hope it won\'t show\nI\'m sayin\' it\'s not, but inside I know\nToday\'s gonna be the day you notice\n\'Cause I\'m tired of explainin\' what the joke is\nThis is what you asked for, heavy is the crown\nFire in the sunrise, ashes rainin\' down\nTry to hold it in, but it keeps bleedin\' out\nThis is what you asked for, heavy is the -\nHeavy is the crown\nTurn to run, now look what it\'s become\nOutnumbered, ten to one\nBack then, should\'ve bit your tongue\n\'Cause there\'s no turnin\' back this path once it\'s begun\nYou\'re already on that list\nSay you don\'t want what you can\'t resist\nWavin\' that sword when the pen won\'t miss\nWatch it all fallin\' apart like this\nThis is what you asked for, heavy is the crown\nFire in the sunrise, ashes rainin\' down\nTry to hold it in, but it keeps bleedin\' out\nThis is what you asked for, heavy is the -\nHeavy is the crown\nToday\'s gonna be the day you notice\n\'Cause I\'m tired of explainin\' what the joke is\nThis is what you asked for\nThis is what you asked for, heavy is the crown\nFire in the sunrise, ashes rainin\' down\nTry to hold it in, but it keeps bleedin\' out\nThis is what you asked for, heavy is the -\nHeavy is the crown\nHeavy is the crown\nHeavy is the -, heavy is the crown', '2024-11-20 07:23:28', '2024-11-20 07:23:28', 0),
(2, 'GODS', 200, 1, '2015-10-23 00:00:00', 'gods.mp3', 'gods.png', 'Go-go-go-go-go-gods\r\nGo-go-go-go-go-gods\r\nAy, this is what you came for, blood on the game ball\r\nEverybody dropping like rainfall\r\nUh, this is your moment, eyes on the pulpit, kid\r\nThink church just opened\r\nAnd they\'re singing your praises, la-la-la\r\nScreaming your name out lo-lo-loud\r\nOne more step, you\'re immortal now, \'cause\r\nOnce you play God, once you play God\r\nThey\'re gonna crumble one by one\r\nThen we gon\' ride right into the sun\r\nLike it\'s the day my kingdom come\r\nBaby, we\'re go-go-go-go-go-gods\r\nYeah, we\'re go-go-go-go-go-gods\r\nAy, welcome to the big show, next on the ladder\r\nIs it your name in the rafters?\r\nBrief-brief-brief moment of silence\r\nBad girl woke up and chose violence\r\nAnd they\'re singing my praises, la-la-la\r\nScreaming my name out lo-lo-loud\r\nThis is why we\'re immortal now, \'cause\r\nOnce you play God, once you play God\r\nThey\'re gonna crumble one by one (crumble one by one)\r\nThen we gon\' ride right into the sun\r\nLike it\'s the day my kingdom come\r\nBaby, we\'re go-go-go-go-go-gods\r\nYeah, we\'re go-go-go-go-go-gods\r\nI\'m on my knees, pray for glory\r\nAnyone read this underdog story?\r\nI can\'t lose myself again\r\nHelp me raise this heart\r\nHeart unbreakable\r\nOnce you play God, once you play God\r\nThey\'re gonna crumble one by one\r\nThen we gon\' ride right into the sun\r\nLike it\'s the day my kingdom come\r\nOnce you play God, once you play God\r\nThey\'re gonna crumble one by one\r\nThen we gon\' ride right into the sun\r\nLike it\'s the day my kingdom come\r\nBaby, we\'re go-go-go-go-go-gods\r\nYeah, we\'re go-go-go-go-go-gods\r\nGo-go-go-go-go-gods\r\nYeah, we\'re go-go-go-go-go-gods\r\nOnce you play', '2024-11-20 07:03:56', '2024-11-20 07:03:56', 0),
(3, 'Get Jinxed', 231, 2, '2014-11-10 00:00:00', 'get_jinxed.mp3', 'get_jinxed.png', 'Wanna join me?\nCome and play\nBut I might shoot you in your face\nBombs and bullets will do the trick\nWhat we need here is a little bit of panic\nDo you ever wanna catch me?\nRight now I\'m feeling ignored\nSo can you try a little harder?\nI\'m really getting bored\nCome on, shoot faster\nJust a little bit of energy, yeah\nI wanna try something fun right now\nI guess some people call it anarchy\nLet\'s blow this city to ashes\nAnd see what Pow-Pow thinks\nIt\'s such pathetic neatness\nBut not for long \'cause it\'ll get jinxed\nSo much better, so much fun\nLet\'s start from scratch and blow up the sun\nCome on, shoot faster\nJust a little bit of energy, Yeah\nI wanna try something fun right now\nI guess some people call it anarchy\nLet\'s blow this city to ashes\nAnd see what Pow-Pow thinks\nIt\'s such pathetic neatness\nBut not for long \'cause it\'ll get jinxed\nCome on\nCome on\nAnd get jinxed', '2024-11-20 07:22:59', '2024-11-20 07:22:59', 0),
(4, 'Silver Scrapes', 235, 2, '2008-09-15 00:00:00', 'silver_scrapes.mp3', 'silver_scrapes.png', 'No Lyrics', '2024-11-20 07:23:42', '2024-11-20 07:23:42', 0),
(5, 'This Is What You Came For', 220, 3, '2010-07-20 00:00:00', 'this_is_what_you_came_for.mp3', 'this_is_what_you_came_for.png', 'Baby, this is what you came for\nLightning strikes every time she moves\nAnd everybody\'s watchin\' her\nBut she\'s lookin\' at you, ooh, ooh\nYou, ooh, ooh, you, ooh, ooh\nYou, ooh, ooh, you, ooh, ooh\nYou, ooh, ooh\nOoh\nBaby, this is what you came for\nLightning strikes every time she moves\nAnd everybody\'s watchin\' her\nBut she\'s lookin\' at you, ooh, ooh\nYou, ooh, ooh, you, ooh, ooh\nYou, ooh, ooh, you, ooh, ooh\nYou, ooh, ooh\nOoh\nYou, ooh, ooh, you, ooh, ooh\nYou, ooh, ooh, you, ooh, ooh\nYou, ooh, ooh, you, ooh, ooh\nOoh\nWe go fast with the game we play\nWho knows why it\'s gotta be this way\nWe say nothin\' more than we need\nI say, \"Your place, \" when we leave\nBaby, this is what you came for\nLightning strikes every time she moves\nAnd everybody\'s watchin\' her\nBut she\'s lookin\' at you, ooh, ooh\nYou, ooh, ooh, you, ooh, ooh\nYou, ooh, ooh, you, ooh, ooh\nYou, ooh, ooh\nOoh\nYou, ooh, ooh, you, ooh, ooh\nYou, ooh, ooh, you, ooh, ooh\nYou, ooh, ooh, you, ooh, ooh\nOoh\nBaby, this is what you came for\nLightning strikes every time she moves\nYeah\nBaby, this is what you came for\nLightning strikes every time she moves\nAnd everybody\'s watchin\' her\nBut she\'s lookin\' at you, ooh, ooh\nYou, ooh, ooh, you, ooh, ooh\nYou, ooh, ooh, you, ooh, ooh\nYou, ooh, ooh\nOoh\nYou, ooh, ooh, you, ooh, ooh\nYou, ooh, ooh, you, ooh, ooh\nYou, ooh, ooh, you, ooh, ooh\nOoh', '2024-11-20 07:24:14', '2024-11-20 07:24:14', 0),
(6, 'Uptown Funk', 270, 3, '2014-11-10 00:00:00', 'uptown_funk.mp3', 'uptown_funk.png', 'This hit, that ice cold, Michelle Pfeiffer, that white gold...', '2024-11-14 08:03:20', '2024-11-14 08:03:20', 0),
(7, 'Shape of You', 233, 4, '2017-01-06 00:00:00', 'shape_of_you.mp3', 'shape_of_you.png', 'I\'m in love with the shape of you...', '2024-11-14 08:05:48', '2024-11-14 08:05:48', 0),
(8, 'Apollo', 263, 4, '2017-03-03 00:00:00', 'apollo.mp3', 'apollo.png', 'Darling, you look perfect tonight...', '2024-11-14 08:06:53', '2024-11-14 08:06:53', 0),
(9, 'I\'m In Love With a Monster', 207, 5, '2018-11-03 00:00:00', 'im_in_love_with_a_monster.mp3', 'im_in_love_with_a_monster.png', 'Thank you, next...', '2024-11-14 08:11:09', '2024-11-14 08:11:09', 0),
(10, 'Sett, the Boss', 178, 5, '2019-01-18 00:00:00', 'sett_the_boss.mp3', 'sett_the_boss.png', 'I want it, I got it...', '2024-11-14 08:13:49', '2024-11-14 08:13:49', 0),
(11, 'Lone Ranger', 200, 6, '2019-11-29 00:00:00', 'lone_ranger.mp3', 'lone_ranger.png', 'I said, ooh, I\'m blinded by the lights...', '2024-11-14 08:17:05', '2024-11-14 08:17:05', 0),
(12, 'Blank Space', 230, 6, '2016-09-22 00:00:00', 'blank_space.mp3', 'blank_space.png', 'I\'m tryna put you in the worst mood...', '2024-11-14 08:25:33', '2024-11-14 08:25:33', 0),
(14, 'Shake It Off', 250, 1, '2014-08-18 00:00:00', 'shake_it_off.mp3', 'shake_it_off.png', 'Cause the players gonna play...', '2024-11-14 08:20:22', '2024-11-14 08:20:22', 0),
(16, 'Sugar', 320, 4, '1959-09-21 00:00:00', 'sugar', 'sugar.png', 'Instrumental jazz song.', '2024-11-14 08:33:54', '2024-11-14 08:33:54', 0),
(17, 'You Belong With Me', 300, 7, '1982-01-02 00:00:00', 'you_belong_with_me.mp3', 'you_belong_with_me.png', 'Billie Jean is not my lover...', '2024-11-14 08:29:57', '2024-11-14 08:29:57', 0),
(18, 'Girls Like You', 260, 7, '2013-08-12 00:00:00', 'girl_like_you.mp3', 'girl_like_you.png', 'Cause all of me, loves all of you...', '2024-11-14 08:38:09', '2024-11-14 08:38:09', 0),
(21, 'APT', 173, 1, '2024-11-05 16:16:56', 'apt.mp3', 'apt.png', '', '2024-11-17 03:36:32', '2024-11-17 03:36:32', 10000000);

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
  `subscription_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
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
-- Table structure for table `tickets`
--

DROP TABLE IF EXISTS `tickets`;
CREATE TABLE IF NOT EXISTS `tickets` (
  `ticket_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `subject` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('Open','In Progress','Closed','Resolved') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'Open',
  `priority` enum('Low','Medium','High') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'Medium',
  `assigned_to` int DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `closed_at` datetime DEFAULT NULL,
  `resolved_at` datetime DEFAULT NULL,
  `attachment` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `customer_feedback` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `ticket_type` enum('Technical','Billing','General','Other') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'General',
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ticket_id`),
  KEY `user_id` (`user_id`),
  KEY `assigned_to` (`assigned_to`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
  `subscription_id` int DEFAULT '0',
  `phone_number` int DEFAULT NULL,
  `is_vip` tinyint(1) DEFAULT '0',
  `vip_expiration` datetime DEFAULT CURRENT_TIMESTAMP,
  `login_attempts` int DEFAULT '0',
  `last_login_attempt` datetime DEFAULT CURRENT_TIMESTAMP,
  `gender` tinyint(1) DEFAULT '0',
  `date_of_birth` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `first_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `reset_token` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `reset_token_expires` datetime DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `email`, `password`, `role_id`, `date_registered`, `profile_url`, `status`, `last_login`, `subscription_id`, `phone_number`, `is_vip`, `vip_expiration`, `login_attempts`, `last_login_attempt`, `gender`, `date_of_birth`, `created_at`, `updated_at`, `first_name`, `last_name`, `reset_token`, `reset_token_expires`) VALUES
(1, 'LoL', 'lol@gmail.com', '1', 2, '2024-10-22 13:32:11', 'lol.png', NULL, '2024-10-22 13:32:11', 0, 1234567890, 0, '2024-10-22 13:32:11', 0, '2024-10-22 13:32:11', 1, '1994-03-01 00:00:00', '2024-11-18 12:45:58', '2024-11-18 12:45:58', 'League of', 'Legend', NULL, NULL),
(2, 'newjeans', 'newjeans@gmail.com', 'hashedpassword123', 2, '2024-10-22 13:32:11', 'newjeans.png', NULL, '2024-10-22 13:32:11', 0, 1234567891, 0, '2024-10-22 13:32:11', 0, '2024-10-22 13:32:11', 0, '1989-12-13 00:00:00', '2024-11-18 12:51:02', '2024-11-18 12:51:02', 'Newjeans', NULL, NULL, NULL),
(3, 'brunomars', 'brunomars@example.com', 'hashedpassword123', 2, '2024-10-22 13:32:11', 'bruno_mars.png', NULL, '2024-10-22 13:32:11', 0, 1234567892, 0, '2024-10-22 13:32:11', 0, '2024-10-22 13:32:11', 1, '1985-10-08 00:00:00', '2024-11-18 12:52:20', '2024-11-18 12:52:20', 'Bruno', 'Mars', NULL, NULL),
(4, 'edsheeran', 'edsheeran@example.com', 'hashedpassword123', 2, '2024-10-22 13:32:11', 'ed_sheeran.png', NULL, '2024-10-22 13:32:11', 0, 1234567893, 0, '2024-10-22 13:32:11', 0, '2024-10-22 13:32:11', 1, '1991-02-17 00:00:00', '2024-11-18 12:53:20', '2024-11-18 12:53:20', 'ED', 'Sheeran', NULL, NULL),
(5, 'taylorswift', 'taylor@gmail.com', 'hashedpassword123', 2, '2024-10-22 13:32:11', 'taylor_swift.png', NULL, '2024-10-22 13:32:11', 0, 1234567894, 0, '2024-10-22 13:32:11', 0, '2024-10-22 13:32:11', 0, '1993-06-26 00:00:00', '2024-11-18 12:54:49', '2024-11-18 12:54:49', 'Taylor', 'Swift', NULL, NULL),
(6, 'maroon5', 'maroon5@gmail.com', 'hashedpassword123', 2, '2024-10-22 13:32:11', 'maroon_5.png', NULL, '2024-10-22 13:32:11', 0, 1234567895, 0, '2024-10-22 13:32:11', 0, '2024-10-22 13:32:11', 1, '1990-02-16 00:00:00', '2024-11-18 12:55:25', '2024-11-18 12:55:25', 'Maroon 5', NULL, NULL, NULL),
(7, 'john_doe', 'johndoe@example.com', 'hashedpassword123', 1, '2024-10-22 13:32:28', '', NULL, '2024-10-22 13:32:28', 0, 1234567896, 0, '2024-10-22 13:32:28', 0, '2024-10-22 13:32:28', 1, '1995-07-19 00:00:00', '2024-11-18 12:56:01', '2024-11-18 12:56:01', 'John', 'Doe', NULL, NULL),
(8, 'jane_smith', 'janesmith@example.com', 'hashedpassword123', 1, '2024-10-22 13:32:28', '/profiles/janesmith.jpg', NULL, '2024-10-22 13:32:28', 0, 1234567897, 0, '2024-10-22 13:32:28', 0, '2024-10-22 13:32:28', 0, '1997-04-14 00:00:00', '2024-11-05 07:02:56', '2024-11-05 07:02:56', 'Jane', 'Smith', NULL, NULL),
(21, 'HOPI', 'caot43069@gmail.com', '$2a$10$Txv6TJ1IeMT1JzbMNcHg8.UhvYAzuefvut9l.poiGf8hFhBg04xR2', 1, '2024-10-23 15:55:50', 'hopi.png', 'active', '2024-10-23 15:55:50', 2, 123, 1, '2024-10-23 15:55:50', 0, '2024-10-23 15:55:50', 0, NULL, '2024-11-22 14:45:09', '2024-11-22 14:45:09', 'HOPI', NULL, NULL, NULL),
(22, 'USER', 'thanht43069@gmail.com', '$2a$10$Txv6TJ1IeMT1JzbMNcHg8.UhvYAzuefvut9l.poiGf8hFhBg04xR2', 2, '2024-10-23 17:01:04', '', 'active', '2024-10-23 17:01:04', 2, 123, 1, '2024-10-23 17:01:04', 0, '2024-10-23 17:01:04', 0, NULL, '2024-11-22 08:31:01', '2024-11-22 08:31:01', 'Truong', 'Thanh', NULL, NULL),
(23, 'ADMIN', 'a@gmail.com', '$2a$10$w7I3pMdFk9AmZSq6hRoEZu5gA9nPCPbI/AHIvJtl3RoqcXmkv/zaa', 1, '2024-10-23 17:18:32', '', 'active', '2024-10-23 17:18:32', 0, 123, 0, '2024-10-23 17:18:32', 0, '2024-10-23 17:18:32', 0, NULL, '2024-11-22 08:29:50', '2024-11-22 08:29:50', 'Truong', 'Thanh', NULL, NULL),
(24, 'ROSÉ', 'rose@gmail.com', '$2a$10$Wta2lMjiRmWVCWraPtrXbeR.8g1uMbbtshD.DbBoeeXwZxiW7lq4i', 3, '2024-11-05 16:18:12', 'rose.png', 'active', '2024-11-05 16:18:12', 2, 123, 1, '2024-11-05 16:18:12', 0, '2024-11-05 16:18:12', 1, NULL, '2024-11-20 10:29:32', '2024-11-20 10:29:32', 'ROSÉ', NULL, NULL, NULL);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
