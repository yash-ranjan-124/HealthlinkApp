-- MySQL dump 10.13  Distrib 5.7.17, for macos10.12 (x86_64)
--
-- Host: 127.0.0.1    Database: Healthlink_programs
-- ------------------------------------------------------
-- Server version	5.5.5-10.1.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `MedicalConditions`
--

DROP TABLE IF EXISTS `MedicalConditions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `MedicalConditions` (
  `condId` int(7) NOT NULL AUTO_INCREMENT,
  `conditionName` text,
  PRIMARY KEY (`condId`)
) ENGINE=InnoDB AUTO_INCREMENT=222 DEFAULT CHARSET=big5;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MedicalConditions`
--

LOCK TABLES `MedicalConditions` WRITE;
/*!40000 ALTER TABLE `MedicalConditions` DISABLE KEYS */;
INSERT INTO `MedicalConditions` VALUES (200,'Arm Dislocation'),(201,'Calf pain'),(202,'Cough'),(203,'Cold'),(204,'Dizziness'),(205,'Dark Circles'),(206,'Ear Bleeding'),(207,'Ear Blocked'),(208,'Eyes bleeding'),(209,'Eustachian Tube Dysfunction'),(210,'Fist Paining'),(211,'Fever'),(212,'High Fever'),(213,'Iris Irritation'),(214,'Limbs dislocation'),(215,'Lose Motion'),(216,'Mind Pain'),(217,'Night Blind'),(218,'Night Blindness'),(219,'Brain Fever'),(220,'Heart Pain'),(221,'Tooth Ache');
/*!40000 ALTER TABLE `MedicalConditions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-06-06 16:05:13
