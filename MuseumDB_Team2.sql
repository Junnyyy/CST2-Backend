-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: cst2-mysql.mysql.database.azure.com    Database: main_db
-- ------------------------------------------------------
-- Server version	5.7.37-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Temporary view structure for view `art_being_refurbished`
--

DROP TABLE IF EXISTS `art_being_refurbished`;
/*!50001 DROP VIEW IF EXISTS `art_being_refurbished`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `art_being_refurbished` AS SELECT 
 1 AS `Title`,
 1 AS `ID`,
 1 AS `Exhibit`,
 1 AS `Department`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `art_piece`
--

DROP TABLE IF EXISTS `art_piece`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `art_piece` (
  `Art_Piece_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Art_Piece_Title` varchar(45) COLLATE utf8_bin DEFAULT NULL,
  `Date_Created` date DEFAULT NULL,
  `Medium` varchar(45) COLLATE utf8_bin DEFAULT NULL,
  `Creator_F_Name` varchar(20) COLLATE utf8_bin DEFAULT 'Unknown',
  `Creator_L_Name` varchar(45) COLLATE utf8_bin DEFAULT 'Unknown',
  `Being_Refurbished` tinyint(1) DEFAULT '0',
  `On_Display` tinyint(1) DEFAULT '0',
  `Year_Acquired` year(4) DEFAULT NULL,
  `Culture` varchar(45) COLLATE utf8_bin DEFAULT NULL,
  `Piece_Height` float DEFAULT NULL,
  `Piece_Length` float DEFAULT NULL,
  `Piece_Width` float DEFAULT NULL,
  `Gallery_Loc` varchar(45) COLLATE utf8_bin DEFAULT NULL,
  `Exhibit_ID` int(11) DEFAULT NULL,
  PRIMARY KEY (`Art_Piece_ID`),
  KEY `Art Piece in Gallery_idx` (`Gallery_Loc`),
  KEY `Art Piece in Exhibit_idx` (`Exhibit_ID`),
  CONSTRAINT `Art Piece in Exhibit` FOREIGN KEY (`Exhibit_ID`) REFERENCES `exhibit` (`Exhibit_ID`) ON UPDATE CASCADE,
  CONSTRAINT `Art Piece in Gallery` FOREIGN KEY (`Gallery_Loc`) REFERENCES `gallery` (`Gallery_Name`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=202251 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`JeremyC`@`%`*/ /*!50003 TRIGGER `Art_Piece_Check_Gallery_Capacity_Set_Year_ID` BEFORE INSERT ON `art_piece` 
FOR EACH ROW 
BEGIN
	IF (SELECT COUNT(*) 
		FROM ART_PIECE 
        WHERE NEW.Gallery_Loc = Art_Piece.Gallery_Loc) >= 
		(SELECT Capacity 
        FROM ART_PIECE, GALLERY 
        WHERE Gallery.Gallery_Name = NEW.Gallery_Loc LIMIT 1)
    THEN signal sqlstate '45000' SET MESSAGE_TEXT = "Gallery is at capacity.";
    END IF;
    
    IF (New.Date_Created > NOW())
	THEN signal sqlstate '45000' SET MESSAGE_TEXT = "Item cannot be created after today.";
    END IF;
    
	IF (New.Date_Created > (SELECT Departure_Date FROM EXHIBIT WHERE Exhibit_ID = NEW.Exhibit_ID))
	THEN signal sqlstate '45000' SET MESSAGE_TEXT = "Item cannot be newer than it's exhibit.";
    END IF;
    
	IF ISNULL(NEW.Gallery_Loc)
    THEN SET NEW.On_Display = 0;
    ELSE 
    SET NEW.On_Display = 1;
    END IF;
    
	IF NEW.Being_Refurbished = 1
    THEN SET NEW.On_Display = 0;
    END IF;
    
    IF ISNULL(NEW.Year_Acquired)
    THEN SET NEW.Year_Acquired = NOW();
    END IF;
    
    SET @v1 = NEW.Year_Acquired;
    SET @v2 = (SELECT COUNT(*) FROM ART_PIECE WHERE ART_PIECE.Year_Acquired = @v1) + 
	(SELECT COUNT(*) FROM ART_PIECE_ARCHIVE WHERE Year_Acquired = @v1) + 1;

    SET New.Art_piece_id = CONCAT(@v1, @v2);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`JeremyC`@`%`*/ /*!50003 TRIGGER `BU_Check_Gallery_Capacity` BEFORE UPDATE ON `art_piece` FOR EACH ROW
BEGIN
	IF (NEW.Gallery_Loc != OLD.Gallery_Loc)
		THEN IF (SELECT COUNT(*) 
			FROM ART_PIECE 
			WHERE NEW.Gallery_Loc = Art_Piece.Gallery_Loc) >= 
			(SELECT Capacity 
			FROM ART_PIECE, GALLERY 
			WHERE Gallery.Gallery_Name = NEW.Gallery_Loc LIMIT 1)
			THEN signal sqlstate '45000' SET MESSAGE_TEXT = "Gallery is at capacity.";
		END IF;
    END IF;
	
	IF ISNULL(NEW.Gallery_Loc)
    THEN SET NEW.On_Display = 0;
    ELSE 
    SET NEW.On_Display = 1;
    END IF;

	IF NEW.Being_Refurbished = 1
    THEN SET NEW.On_Display = 0;
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`JeremyC`@`%`*/ /*!50003 TRIGGER `ART_PIECE_copy_to_archive` BEFORE DELETE ON `art_piece` FOR EACH ROW 
BEGIN
	INSERT INTO `art_piece_archive` (Art_Piece_ID, `Art_Piece_Title`, `Date_Created`, `Medium`, `Creator_F_Name`, `Creator_L_Name`, `Being_Refurbished`, `On_Display`, `Year_Acquired`, `Culture`, `Piece_Height`, `Piece_Length`, `Piece_Width`, `Gallery_Loc`, `Exhibit_ID`)
    VALUES (OLD.ART_PIECE_ID, OLD.Art_Piece_Title, OLD.Date_Created, OLD.Medium, OLD.Creator_F_Name, OLD.Creator_L_Name, OLD.Being_Refurbished, 0, OLD.Year_Acquired, OLD.Culture, OLD.Piece_Height, OLD.Piece_Length, OLD.Piece_Width, NULL, OLD.Exhibit_ID);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `art_piece_archive`
--

DROP TABLE IF EXISTS `art_piece_archive`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `art_piece_archive` (
  `Art_Piece_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Art_Piece_Title` varchar(45) COLLATE utf8_bin DEFAULT NULL,
  `Date_Created` date DEFAULT NULL,
  `Medium` varchar(45) COLLATE utf8_bin DEFAULT NULL,
  `Creator_F_Name` varchar(20) COLLATE utf8_bin DEFAULT 'Unkown',
  `Creator_L_Name` varchar(45) COLLATE utf8_bin DEFAULT 'Unkown',
  `Being_Refurbished` tinyint(1) DEFAULT '0',
  `On_Display` tinyint(1) DEFAULT '0',
  `Year_Acquired` year(4) DEFAULT NULL,
  `Culture` varchar(45) COLLATE utf8_bin DEFAULT NULL,
  `Piece_Height` float DEFAULT NULL,
  `Piece_Length` float DEFAULT NULL,
  `Piece_Width` float DEFAULT NULL,
  `Gallery_Loc` varchar(45) COLLATE utf8_bin DEFAULT NULL,
  `Exhibit_ID` int(11) DEFAULT NULL,
  PRIMARY KEY (`Art_Piece_ID`),
  KEY `Art Piece in Gallery_idx` (`Gallery_Loc`),
  KEY `Art Piece in Exhibit_idx` (`Exhibit_ID`),
  CONSTRAINT `Art Piece Archive in Exhibit` FOREIGN KEY (`Exhibit_ID`) REFERENCES `exhibit` (`Exhibit_ID`) ON DELETE SET NULL ON UPDATE SET NULL,
  CONSTRAINT `Art Piece Archive in Gallery` FOREIGN KEY (`Gallery_Loc`) REFERENCES `gallery` (`Gallery_Name`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=202251 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary view structure for view `current_month_store_sales`
--

DROP TABLE IF EXISTS `current_month_store_sales`;
/*!50001 DROP VIEW IF EXISTS `current_month_store_sales`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `current_month_store_sales` AS SELECT 
 1 AS `Item_Name`,
 1 AS `ID`,
 1 AS `Item_Price`,
 1 AS `Number_Sold`,
 1 AS `Current_Month_Sales_Profit`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `current_month_ticket_sales`
--

DROP TABLE IF EXISTS `current_month_ticket_sales`;
/*!50001 DROP VIEW IF EXISTS `current_month_ticket_sales`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `current_month_ticket_sales` AS SELECT 
 1 AS `Exhibit_Name`,
 1 AS `ID`,
 1 AS `Ticket_Price`,
 1 AS `Number_Tickets_Sold`,
 1 AS `Current_Month_Ticket_Profit`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `Customer_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Customer_F_Name` varchar(45) COLLATE utf8_bin DEFAULT NULL,
  `Customer_M_Name` varchar(45) COLLATE utf8_bin DEFAULT NULL,
  `Customer_L_Name` varchar(45) COLLATE utf8_bin DEFAULT NULL,
  `Membership_Status` tinyint(1) DEFAULT '0',
  `Customer_Username` varchar(45) COLLATE utf8_bin DEFAULT NULL,
  `Customer_Password` varchar(45) COLLATE utf8_bin DEFAULT NULL,
  `Customer_Email` varchar(45) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`Customer_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `department` (
  `Department_Name` varchar(45) COLLATE utf8_bin NOT NULL,
  `Location` varchar(45) COLLATE utf8_bin DEFAULT NULL,
  `Supervisor_ID` int(11) DEFAULT NULL,
  PRIMARY KEY (`Department_Name`),
  KEY `Supervisor ID_idx` (`Supervisor_ID`),
  CONSTRAINT `Supervisor ID` FOREIGN KEY (`Supervisor_ID`) REFERENCES `employee` (`Employee_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `Employee_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Employee_F_Name` varchar(45) COLLATE utf8_bin DEFAULT NULL,
  `Employee_M_Name` varchar(45) COLLATE utf8_bin DEFAULT NULL,
  `Employee_L_Name` varchar(45) COLLATE utf8_bin DEFAULT NULL,
  `Department_Name` varchar(45) COLLATE utf8_bin NOT NULL,
  `Employee_Salary` float DEFAULT '0',
  `Employee_DOB` date DEFAULT NULL,
  `Employee_Email` varchar(45) COLLATE utf8_bin DEFAULT NULL,
  `Employee_Username` varchar(45) COLLATE utf8_bin NOT NULL,
  `Employee_Password` varchar(64) COLLATE utf8_bin NOT NULL,
  `Admin_Flag` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`Employee_ID`),
  KEY `Department_Name_idx` (`Department_Name`),
  CONSTRAINT `Employee's Department Name` FOREIGN KEY (`Department_Name`) REFERENCES `department` (`Department_Name`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12365 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`JeremyC`@`%`*/ /*!50003 TRIGGER `Generate_Employee_Email` BEFORE INSERT ON `employee` FOR EACH ROW 
BEGIN
    SET @v1 = (SELECT COUNT(*) FROM EMPLOYEE WHERE NEW.Employee_L_Name = Employee_L_Name AND Left(NEW.Employee_F_Name, 1) = Left(Employee_F_Name, 1));
    
    IF @v1 >= 1
    THEN SET NEW.Employee_Email = CONCAT(Left(NEW.Employee_F_Name, 1), NEW.Employee_L_Name, @v1, '@mfah.org');
    else SET NEW.Employee_Email = CONCAT(Left(NEW.Employee_F_Name, 1), NEW.Employee_L_Name, '@mfah.org');
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`JeremyC`@`%`*/ /*!50003 TRIGGER `main_db`.`employee_BEFORE_UPDATE` BEFORE UPDATE ON `employee` FOR EACH ROW
BEGIN
    SET @v1 = (SELECT COUNT(*) FROM EMPLOYEE WHERE NEW.Employee_L_Name = Employee_L_Name AND Left(NEW.Employee_F_Name, 1) = Left(Employee_F_Name, 1));
    
    IF @v1 >= 1
    THEN SET NEW.Employee_Email = CONCAT(Left(NEW.Employee_F_Name, 1), NEW.Employee_L_Name, @v1, '@mfah.org');
    else SET NEW.Employee_Email = CONCAT(Left(NEW.Employee_F_Name, 1), NEW.Employee_L_Name, '@mfah.org');
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Temporary view structure for view `employee_address_book`
--

DROP TABLE IF EXISTS `employee_address_book`;
/*!50001 DROP VIEW IF EXISTS `employee_address_book`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `employee_address_book` AS SELECT 
 1 AS `Employee_ID`,
 1 AS `Employee_F_Name`,
 1 AS `Employee_M_Name`,
 1 AS `Employee_L_Name`,
 1 AS `Department_Name`,
 1 AS `Employee_Email`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `exhibit`
--

DROP TABLE IF EXISTS `exhibit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exhibit` (
  `Exhibit_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Exhibit_Name` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `Arrival_Date` date DEFAULT NULL,
  `Departure_Date` date DEFAULT NULL,
  `Permanent` tinyint(1) DEFAULT '0',
  `Ticket_Price` float DEFAULT '19',
  `Number_Tickets_Sold` int(11) DEFAULT '0',
  `Managing_Department` varchar(45) COLLATE utf8_bin DEFAULT NULL,
  `Located_In` varchar(45) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`Exhibit_ID`),
  KEY `Managing Department_idx` (`Managing_Department`),
  KEY `Located in Gallery_idx` (`Located_In`),
  CONSTRAINT `Exhibit's Managing Department` FOREIGN KEY (`Managing_Department`) REFERENCES `department` (`Department_Name`),
  CONSTRAINT `Gallery Location` FOREIGN KEY (`Located_In`) REFERENCES `gallery` (`Gallery_Name`)
) ENGINE=InnoDB AUTO_INCREMENT=202211 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`JeremyC`@`%`*/ /*!50003 TRIGGER `main_db`.`Check_Departure_Arrival_Dates_SET_ID` BEFORE INSERT ON `exhibit` FOR EACH ROW
BEGIN
	IF NEW.Departure_Date < NEW.Arrival_Date
    THEN signal sqlstate '45000' SET MESSAGE_TEXT = "Departure date is before arrival date.";
    END IF;

    SET @v1 = LEFT(NEW.Arrival_Date, 4);
    SET @v2 = (SELECT COUNT(*) FROM EXHIBIT WHERE LEFT(Exhibit.Arrival_Date, 4) = @v1) + (SELECT COUNT(*) FROM Exhibit_Archive WHERE Left(Exhibit_Archive.Arrival_Date, 4) = @v1) + 1;

    SET New.Exhibit_ID = CONCAT(@v1, @v2);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`JeremyC`@`%`*/ /*!50003 TRIGGER `main_db`.`Copy_to_Exhibit_Archive` BEFORE DELETE ON `exhibit` FOR EACH ROW
BEGIN
	INSERT INTO EXHIBIT_ARCHIVE (Exhibit_ID, Exhibit_Name, Arrival_Date, Departure_Date, Ticket_Price, Number_Tickets_Sold, Managing_Department)
    VALUES (OLD.Exhibit_ID, old.Exhibit_Name, Old.Arrival_Date, Old.Departure_Date, Old.Ticket_Price, Old.Number_Tickets_Sold, Old.Managing_Department);
    
    DELETE FROM TICKET_TRANSACTION
    WHERE Ticket_Exhibit_ID = OLD.Exhibit_ID;
    
    DELETE FROM ART_PIECE
	WHERE ART_PIECE.Exhibit_ID = OLD.Exhibit_ID;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `exhibit_archive`
--

DROP TABLE IF EXISTS `exhibit_archive`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exhibit_archive` (
  `Exhibit_ID` int(11) NOT NULL,
  `Exhibit_Name` varchar(45) DEFAULT NULL,
  `Arrival_Date` date DEFAULT NULL,
  `Departure_Date` date DEFAULT NULL,
  `Ticket_Price` float DEFAULT NULL,
  `Number_Tickets_Sold` int(11) DEFAULT NULL,
  `Managing_Department` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`Exhibit_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `gallery`
--

DROP TABLE IF EXISTS `gallery`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gallery` (
  `Gallery_Name` varchar(45) COLLATE utf8_bin NOT NULL,
  `Managing_Department` varchar(45) COLLATE utf8_bin DEFAULT NULL,
  `Capacity` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`Gallery_Name`),
  KEY `Managing Department_idx` (`Managing_Department`),
  CONSTRAINT `Gallery's Managing Department` FOREIGN KEY (`Managing_Department`) REFERENCES `department` (`Department_Name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary view structure for view `member_customer_list`
--

DROP TABLE IF EXISTS `member_customer_list`;
/*!50001 DROP VIEW IF EXISTS `member_customer_list`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `member_customer_list` AS SELECT 
 1 AS `ID`,
 1 AS `First_Name`,
 1 AS `Last_Name`,
 1 AS `Email`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `store_item`
--

DROP TABLE IF EXISTS `store_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `store_item` (
  `Item_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Item_Name` varchar(45) COLLATE utf8_bin DEFAULT NULL,
  `Quantity_In_Stock` int(11) DEFAULT '0',
  `Item_Price` float DEFAULT '0',
  `Number_Sold` int(11) DEFAULT '0',
  `Soldout_Status` tinyint(4) DEFAULT '0' COMMENT 'A Status of 0 means the item is in stock. A status of 1 means the item is out of stock.',
  PRIMARY KEY (`Item_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`JeremyC`@`%`*/ /*!50003 TRIGGER `main_db`.`store_item_BEFORE_UPDATE` BEFORE UPDATE ON `store_item` FOR EACH ROW
BEGIN
    IF NEW.Quantity_In_Stock = 0
    THEN SET NEW.Soldout_Status = 1;
	END IF;
    
    IF NEW.Quantity_In_Stock < 0
    THEN signal sqlstate '45000' SET MESSAGE_TEXT = "Item is soldout";
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `store_transaction`
--

DROP TABLE IF EXISTS `store_transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `store_transaction` (
  `Store_Transaction_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Store_Customer_ID` int(11) DEFAULT NULL,
  `Store_Total_Bill` float DEFAULT '0',
  `Store_Item_ID` int(11) DEFAULT NULL,
  `Store_Transaction_Date` date DEFAULT NULL,
  PRIMARY KEY (`Store_Transaction_ID`),
  KEY `Item_Transaction_idx` (`Store_Item_ID`),
  KEY `Customer_Transaction_idx` (`Store_Customer_ID`),
  CONSTRAINT `Item Transaction ID` FOREIGN KEY (`Store_Item_ID`) REFERENCES `store_item` (`Item_ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Store Customer Transaction ID` FOREIGN KEY (`Store_Customer_ID`) REFERENCES `customer` (`Customer_ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`JeremyC`@`%`*/ /*!50003 TRIGGER `main_db`.`store_transaction_set_date_bill` BEFORE INSERT ON `store_transaction` FOR EACH ROW
BEGIN
	IF (ISNULL(NEW.store_transaction_date))
    THEN SET NEW.store_transaction_date = NOW();
    END IF;
    SET NEW.store_total_bill = (SELECT Item_Price FROM STORE_ITEM WHERE Item_ID = NEW.Store_Item_Id);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`JeremyC`@`%`*/ /*!50003 TRIGGER `main_db`.`store_transaction_Update_Number_Sold_Quantity` AFTER INSERT ON `store_transaction` FOR EACH ROW
BEGIN
	UPDATE store_item, store_transaction
    SET 
		store_item.number_sold = store_item.number_sold + 1, 
        store_item.quantity_in_stock = (store_item.quantity_in_stock - 1)
    WHERE Store_item.Item_ID = NEW.Store_Item_ID;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `ticket_transaction`
--

DROP TABLE IF EXISTS `ticket_transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ticket_transaction` (
  `Ticket_Transaction_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Ticket_Customer_ID` int(11) DEFAULT NULL,
  `Ticket_Total_Bill` float DEFAULT '0',
  `Ticket_Exhibit_ID` int(11) DEFAULT NULL,
  `Ticket_Transaction_Date` date DEFAULT NULL,
  PRIMARY KEY (`Ticket_Transaction_ID`),
  KEY `Customer_Transaction_idx` (`Ticket_Customer_ID`),
  KEY `Exhibit Ticket ID_idx` (`Ticket_Exhibit_ID`),
  CONSTRAINT `Exhibit Ticket ID` FOREIGN KEY (`Ticket_Exhibit_ID`) REFERENCES `exhibit` (`Exhibit_ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Ticket Customer Transaction ID` FOREIGN KEY (`Ticket_Customer_ID`) REFERENCES `customer` (`Customer_ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2022041911 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`JeremyC`@`%`*/ /*!50003 TRIGGER `main_db`.`ticket_transaction_set_date_bill_id` BEFORE INSERT ON `ticket_transaction` FOR EACH ROW
BEGIN
	IF (ISNULL(NEW.ticket_transaction_date))
    THEN SET NEW.ticket_transaction_date = NOW();
    END IF;
    
    SET NEW.ticket_total_bill = (SELECT Ticket_Price FROM EXHIBIT WHERE EXHIBIT.Exhibit_ID = NEW.Ticket_Exhibit_Id);
    
    SET @v1 = CONCAT(LEFT(NEW.ticket_transaction_date, 4), LEFT(RIGHT(NEW.ticket_transaction_date, 5), 2), RIGHT(NEW.ticket_transaction_date, 2));
    SET NEW.ticket_transaction_id = CONCAT(@v1, ((SELECT COUNT(*) FROM TICKET_TRANSACTION WHERE LEFT(ticket_transaction_id, 8) = @v1) + (SELECT COUNT(*) FROM TICKET_TRANSACTION_ARCHIVE WHERE LEFT(ticket_transaction_id, 8) = @v1) + 1));
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`JeremyC`@`%`*/ /*!50003 TRIGGER `main_db`.`ticket_transaction_update_tickets_sold` AFTER INSERT ON `ticket_transaction` FOR EACH ROW
BEGIN
	UPDATE exhibit, ticket_transaction
    SET Number_Tickets_Sold = Number_Tickets_Sold + 1
    WHERE exhibit.Exhibit_ID = NEW.Ticket_Exhibit_ID;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`JeremyC`@`%`*/ /*!50003 TRIGGER `main_db`.`Copy_to_ticket_archive` BEFORE DELETE ON `ticket_transaction` FOR EACH ROW
BEGIN
	INSERT INTO ticket_transaction_archive 
	VALUE (OLD.Ticket_Transaction_Id, OLD.Ticket_Customer_ID, OLD.Ticket_Total_Bill, OLD.Ticket_Exhibit_ID, OLD.Ticket_Transaction_Date);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `ticket_transaction_archive`
--

DROP TABLE IF EXISTS `ticket_transaction_archive`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ticket_transaction_archive` (
  `Ticket_Transaction_ID` int(11) NOT NULL,
  `Ticket_Customer_ID` int(11) DEFAULT NULL,
  `Ticket_Total_Bill` float DEFAULT NULL,
  `Ticket_Exhibit_ID` int(11) DEFAULT NULL,
  `Ticket_Transaction_Date` date DEFAULT NULL,
  PRIMARY KEY (`Ticket_Transaction_ID`),
  KEY `Archive Ticket Exhibit ID_idx` (`Ticket_Exhibit_ID`),
  KEY `Archive Ticket Customer ID_idx` (`Ticket_Customer_ID`),
  CONSTRAINT `Archive Ticket Customer ID` FOREIGN KEY (`Ticket_Customer_ID`) REFERENCES `customer` (`Customer_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Archive Ticket Exhibit ID` FOREIGN KEY (`Ticket_Exhibit_ID`) REFERENCES `exhibit_archive` (`Exhibit_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Final view structure for view `art_being_refurbished`
--

/*!50001 DROP VIEW IF EXISTS `art_being_refurbished`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`JeremyC`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `art_being_refurbished` AS select `art_piece`.`Art_Piece_Title` AS `Title`,`art_piece`.`Art_Piece_ID` AS `ID`,`exhibit`.`Exhibit_Name` AS `Exhibit`,`exhibit`.`Managing_Department` AS `Department` from (`art_piece` join `exhibit`) where ((`art_piece`.`Exhibit_ID` = `exhibit`.`Exhibit_ID`) and (`art_piece`.`Being_Refurbished` = 1)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `current_month_store_sales`
--

/*!50001 DROP VIEW IF EXISTS `current_month_store_sales`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`JeremyC`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `current_month_store_sales` AS select `store_item`.`Item_Name` AS `Item_Name`,`store_item`.`Item_ID` AS `ID`,`store_item`.`Item_Price` AS `Item_Price`,sum(if((`store_item`.`Item_ID` = `store_transaction`.`Store_Item_ID`),1,0)) AS `Number_Sold`,truncate(sum(if((`store_item`.`Item_ID` = `store_transaction`.`Store_Item_ID`),`store_item`.`Item_Price`,0)),2) AS `Current_Month_Sales_Profit` from (`store_item` join `store_transaction`) where (left(`store_transaction`.`Store_Transaction_Date`,7) = left(now(),7)) group by `store_item`.`Item_ID` order by `store_item`.`Item_ID` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `current_month_ticket_sales`
--

/*!50001 DROP VIEW IF EXISTS `current_month_ticket_sales`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`JeremyC`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `current_month_ticket_sales` AS select `exhibit`.`Exhibit_Name` AS `Exhibit_Name`,`exhibit`.`Exhibit_ID` AS `ID`,`exhibit`.`Ticket_Price` AS `Ticket_Price`,sum(if((`exhibit`.`Exhibit_ID` = `ticket_transaction`.`Ticket_Exhibit_ID`),1,0)) AS `Number_Tickets_Sold`,truncate(sum(if((`exhibit`.`Exhibit_ID` = `ticket_transaction`.`Ticket_Exhibit_ID`),`exhibit`.`Ticket_Price`,0)),2) AS `Current_Month_Ticket_Profit` from (`exhibit` join `ticket_transaction`) where (left(`ticket_transaction`.`Ticket_Transaction_Date`,7) = left(now(),7)) group by `exhibit`.`Exhibit_ID` order by `exhibit`.`Exhibit_ID` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `employee_address_book`
--

/*!50001 DROP VIEW IF EXISTS `employee_address_book`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`JeremyC`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `employee_address_book` AS select `employee`.`Employee_ID` AS `Employee_ID`,`employee`.`Employee_F_Name` AS `Employee_F_Name`,`employee`.`Employee_M_Name` AS `Employee_M_Name`,`employee`.`Employee_L_Name` AS `Employee_L_Name`,`employee`.`Department_Name` AS `Department_Name`,`employee`.`Employee_Email` AS `Employee_Email` from `employee` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `member_customer_list`
--

/*!50001 DROP VIEW IF EXISTS `member_customer_list`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`JeremyC`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `member_customer_list` AS select `customer`.`Customer_ID` AS `ID`,`customer`.`Customer_F_Name` AS `First_Name`,`customer`.`Customer_L_Name` AS `Last_Name`,`customer`.`Customer_Email` AS `Email` from `customer` where (`customer`.`Membership_Status` = 1) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-24 21:23:41
