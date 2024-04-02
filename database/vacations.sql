-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 02, 2024 at 11:28 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vacations`
--
CREATE DATABASE IF NOT EXISTS `vacations` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `vacations`;

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `userId` char(36) DEFAULT NULL,
  `vacationId` char(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`userId`, `vacationId`) VALUES
('0598271f-0c91-4679-9640-3c1f933d437f', '412b5b71-ab99-4269-a2be-5792b4273d4a'),
('0598271f-0c91-4679-9640-3c1f933d437f', '2242efa2-f4fd-46e2-bee8-d85b255cf168'),
('0598271f-0c91-4679-9640-3c1f933d437f', '2242efa2-f4fd-46e2-bee8-d85b255cf168'),
('0598271f-0c91-4679-9640-3c1f933d437f', '412b5b71-ab99-4269-a2be-5792b4273d4a'),
('0598271f-0c91-4679-9640-3c1f933d437f', '2242efa2-f4fd-46e2-bee8-d85b255cf168'),
('0598271f-0c91-4679-9640-3c1f933d437f', '2242efa2-f4fd-46e2-bee8-d85b255cf168'),
('0598271f-0c91-4679-9640-3c1f933d437f', '412b5b71-ab99-4269-a2be-5792b4273d4a');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `roleId` int(11) NOT NULL,
  `roleName` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`roleId`, `roleName`) VALUES
(1, 'USER'),
(2, 'ADMIN');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` char(36) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `roleId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `firstName`, `lastName`, `email`, `password`, `roleId`) VALUES
('0598271f-0c91-4679-9640-3c1f933d437f', 'Bar', 'Zeitony', 'barzeitony@gmail.com', 'a163dde4abcf270073d5b8d41c73cac8', 1);

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacationId` varchar(36) NOT NULL,
  `destination` varchar(50) NOT NULL,
  `description` varchar(255) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationId`, `destination`, `description`, `startDate`, `endDate`, `price`, `image`) VALUES
('2242efa2-f4fd-46e2-bee8-d85b255cf168', 'Cape Town, South Africa', 'Experience the natural beauty and cultural diversity of Cape Town, with its stunning Table Mountain views, vibrant neighborhoods, and world-class vineyards.', '2026-02-03', '2026-02-28', 2400, 'fc780659-3e47-4da2-bce7-560eee537273.jpeg'),
('412b5b71-ab99-4269-a2be-5792b4273d4a', 'Barcelona, Spain', 'Discover the artistic treasures of Barcelona, from the surreal architecture of Antoni Gaudí to the lively streets of La Rambla. Indulge in tapas, sangria, and beachside relaxation.', '2025-01-02', '2025-01-10', 2100, '44f07f3d-e66f-4ab4-b209-039c183ac966.jpeg'),
('4c96b69d-de7a-4ca6-b6eb-8558bc4fb3f9', 'Paris, France', 'Experience the romance of Paris with its iconic landmarks such as the Eiffel Tower, Louvre Museum, and Notre-Dame Cathedral. Enjoy exquisite French cuisine and stroll along the Seine River.', '2024-05-07', '2024-05-22', 2500, 'af6e6abe-a160-471a-a0d1-059dcb903b5a.jpeg'),
('6b5fc8c1-a943-4c55-ac84-e3d9c4b10c50', 'Bali, Indonesia', 'Explore the serene beaches and lush landscapes of Bali. Immerse yourself in the vibrant culture and indulge in delicious local cuisine.', '2025-02-28', '2025-03-07', 1500, '53c1cf33-19d8-4d3c-97c5-9d82c542f36e.jpeg'),
('800ce066-52e5-46fd-a701-7cdcab1cbeb6', 'Rome, Italy', 'Immerse yourself in the rich history and culture of Rome, home to ancient ruins like the Colosseum and Roman Forum. Indulge in authentic Italian cuisine and gelato.', '2024-07-08', '2024-07-17', 1900, 'e24755f0-254a-4e73-b259-6f9b84ec05e4.jpeg'),
('8443b2fe-2878-44cf-8fc8-202e1bb9eef1', 'Tokyo, Japan', 'Dive into the bustling metropolis of Tokyo with its blend of modernity and tradition. Visit ancient temples, indulge in delicious sushi, and experience vibrant street life.', '2024-04-01', '2024-04-29', 2200, '4fbf8cb2-3ef6-43fe-9425-70f11037613d.jpeg'),
('881addd3-1ced-4723-9531-23fc2a0566e7', 'Phuket, Thailand', 'Relax on the golden sands of Phuket\'s beaches, enjoy snorkeling in clear waters, and explore the vibrant nightlife of Patong. Discover Buddhist temples and indulge in Thai cuisine.', '2024-11-30', '2024-12-31', 1600, '9c677f56-554f-4471-ac9e-372258bfd199.jpeg'),
('8bfd86d1-3df2-4750-8a30-0dfca6eb86cb', 'Rio de Janeiro, Brazil', 'Experience the vibrant energy of Rio de Janeiro, with its famous Copacabana and Ipanema beaches, Christ the Redeemer statue, and colorful Carnival celebrations.', '2024-08-31', '2024-09-19', 1700, 'e6d0b30a-60c2-4da9-98e5-a233eefe9fa5.jpeg'),
('8d852bcd-a693-45f1-bd99-4e53898c0c25', 'Maldives', 'Relax in luxury at the stunning Maldives, known for its pristine beaches, crystal-clear waters, and overwater bungalows. Enjoy snorkeling, diving, and romantic sunset cruises.', '2024-04-02', '2024-05-14', 3000, '5bb0b66f-f150-437d-8d5d-54e2fcc4271a.jpeg'),
('b7ab1da2-70fe-47d2-ac51-5d68c06db8be', 'New York City, USA', 'Explore the iconic sights of the Big Apple, from Times Square and Central Park to the Statue of Liberty and Broadway theaters. Enjoy diverse cuisines and endless shopping opportunities.\n', '2024-05-31', '2024-06-29', 2000, 'adc3f1df-48de-4ce7-a7c8-ba6e07ecca9d.jpeg'),
('c1b7571f-cabc-4c7b-bc93-f403ebdf21be', 'Santorini, Greece', 'Discover the breathtaking beauty of Santorini with its stunning sunsets, white-washed buildings, and crystal-clear waters. Explore charming villages and savor traditional Greek dishes.', '2024-04-09', '2024-04-15', 1800, '1d2535f1-fa00-41d5-bb8c-21fe5e1b6ce7.jpeg'),
('c2837c2e-2895-4554-94da-0ad195a0ea57', 'Dubai, UAE', 'Explore the futuristic cityscape of Dubai, home to towering skyscrapers, luxurious malls, and desert adventures. Enjoy fine dining, desert safaris, and shopping extravaganzas.', '2024-10-12', '2024-10-19', 2800, 'ecfff450-1201-4925-bef7-ace1ba0f7665.jpeg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD KEY `vacationId` (`vacationId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`roleId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`),
  ADD KEY `roleId` (`roleId`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `roleId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`roleId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
