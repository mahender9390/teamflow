-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: localhost    Database: teamflow_db
-- ------------------------------------------------------
-- Server version	8.0.46

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
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `comment` varchar(2000) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `task_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKi7pp0331nbiwd2844kg78kfwb` (`task_id`),
  KEY `FK8omq0tc18jd43bu5tjh6jvraq` (`user_id`),
  CONSTRAINT `FK8omq0tc18jd43bu5tjh6jvraq` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKi7pp0331nbiwd2844kg78kfwb` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,'Started working on this task.','2026-07-04 20:53:28.730251','2026-07-04 20:53:28.730251',1,3),(2,'do it fast','2026-07-06 13:56:09.076562','2026-07-06 13:56:09.076562',2,1);
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifications` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `is_read` bit(1) NOT NULL,
  `message` varchar(1000) NOT NULL,
  `title` varchar(255) NOT NULL,
  `type` enum('COMMENT_ADDED','PROJECT_UPDATED','TASK_ASSIGNED','TASK_UPDATED') NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK9y21adhxn0ayjhfocscqox7bh` (`user_id`),
  CONSTRAINT `FK9y21adhxn0ayjhfocscqox7bh` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
INSERT INTO `notifications` VALUES (1,'2026-07-04 20:35:52.528106',_binary '\0','You have been assigned task: Develop Login API','New Task Assigned','TASK_ASSIGNED',3),(2,'2026-07-04 20:50:04.475694',_binary '\0','Task \'Implement JWT Login\' has been updated.','Task Updated','TASK_UPDATED',3),(4,'2026-07-06 13:03:48.971940',_binary '','Project \'TeamFlow Backend Updated\' has been updated.','Project Updated','PROJECT_UPDATED',1),(5,'2026-07-06 13:03:58.246441',_binary '','Project \'TeamFlow Backend Updated\' has been updated.','Project Updated','PROJECT_UPDATED',1),(6,'2026-07-06 13:13:53.135597',_binary '\0','Task \'Implement JWT Login\' has been updated.','Task Updated','TASK_UPDATED',2),(7,'2026-07-06 13:14:46.451028',_binary '\0','You have been assigned task: hello','New Task Assigned','TASK_ASSIGNED',3),(8,'2026-07-06 13:15:21.831679',_binary '\0','You have been assigned task: asdfghjk','New Task Assigned','TASK_ASSIGNED',2),(9,'2026-07-06 17:20:50.917628',_binary '','Project \'TeamFlow Backend Updated\' has been updated.','Project Updated','PROJECT_UPDATED',1),(10,'2026-07-07 10:38:45.010673',_binary '\0','Project \'asdfghj\' has been updated.','Project Updated','PROJECT_UPDATED',5),(11,'2026-07-07 10:56:29.044094',_binary '\0','Project \'hello\' has been updated.','Project Updated','PROJECT_UPDATED',1);
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `is_active` bit(1) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL,
  `description` text,
  `end_date` date DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `start_date` date DEFAULT NULL,
  `status` enum('COMPLETED','IN_PROGRESS','ON_HOLD','PLANNING') NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `created_by` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKf1ph00os6khfle3ub9b50x594` (`created_by`),
  CONSTRAINT `FKf1ph00os6khfle3ub9b50x594` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES (3,_binary '','2026-07-04 20:34:24.955226','Backend with JWT Authentication DXFCGFHJ','2026-09-01','TeamFlow Backend Updated','2026-07-04','COMPLETED','2026-07-06 17:20:50.899224',1),(4,_binary '','2026-07-06 13:04:46.369553','qwertyui','2026-09-10','hello','2026-07-06','IN_PROGRESS','2026-07-07 10:56:28.978003',1),(5,_binary '','2026-07-06 17:19:25.691669','ASDFGHJ','2222-09-11','asdfg','2222-09-09','PLANNING','2026-07-06 17:19:25.691669',1);
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rcas`
--

DROP TABLE IF EXISTS `rcas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rcas` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `description` varchar(2000) DEFAULT NULL,
  `resolution` varchar(2000) DEFAULT NULL,
  `root_cause` varchar(2000) DEFAULT NULL,
  `severity` enum('CRITICAL','HIGH','LOW','MEDIUM') NOT NULL,
  `status` enum('CLOSED','IN_PROGRESS','OPEN','UNDER_REVIEW') NOT NULL,
  `title` varchar(255) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `reported_by` bigint NOT NULL,
  `task_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKe48wc5jutf9hkss9bagxngwuk` (`reported_by`),
  KEY `FKk2yah5vanbqtfd0utvqekves1` (`task_id`),
  CONSTRAINT `FKe48wc5jutf9hkss9bagxngwuk` FOREIGN KEY (`reported_by`) REFERENCES `users` (`id`),
  CONSTRAINT `FKk2yah5vanbqtfd0utvqekves1` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rcas`
--

LOCK TABLES `rcas` WRITE;
/*!40000 ALTER TABLE `rcas` DISABLE KEYS */;
INSERT INTO `rcas` VALUES (2,'2026-07-05 15:03:00.900404','Application failed to connect to database','Updated datasource configuration','Incorrect database credentials','HIGH','CLOSED','Database Connection Failure','2026-07-05 15:06:04.281779',1,1),(3,'2026-07-06 14:39:29.239329','Users cannot login','Implemented token refresh','Expired JWT Token','HIGH','OPEN','login api failure ','2026-07-06 14:39:29.239329',1,2);
/*!40000 ALTER TABLE `rcas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `comments` varchar(2000) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL,
  `reviewed_at` datetime(6) DEFAULT NULL,
  `status` enum('APPROVED','PENDING','REJECTED') NOT NULL,
  `rca_id` bigint NOT NULL,
  `reviewer_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK9immwgo3w8o1qn9r0fpwhv8yn` (`rca_id`),
  KEY `FKd1isgfajhtdl8mgg29up6mofi` (`reviewer_id`),
  CONSTRAINT `FK9immwgo3w8o1qn9r0fpwhv8yn` FOREIGN KEY (`rca_id`) REFERENCES `rcas` (`id`),
  CONSTRAINT `FKd1isgfajhtdl8mgg29up6mofi` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (1,'Verified successfully.','2026-07-05 15:05:09.581658','2026-07-05 15:09:49.466823','APPROVED',2,1),(2,'nmbcgfxd','2026-07-06 15:05:15.139899','2026-07-06 15:05:15.139899','PENDING',3,1);
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `task_relations`
--

DROP TABLE IF EXISTS `task_relations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `task_relations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `relation_type` enum('BLOCKED_BY','BLOCKS') NOT NULL,
  `predecessor_task_id` bigint NOT NULL,
  `successor_task_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKpxaugw7o79j7f2r0en4gsshxg` (`predecessor_task_id`),
  KEY `FKlus74904ano332bg2r02byolr` (`successor_task_id`),
  CONSTRAINT `FKlus74904ano332bg2r02byolr` FOREIGN KEY (`successor_task_id`) REFERENCES `tasks` (`id`),
  CONSTRAINT `FKpxaugw7o79j7f2r0en4gsshxg` FOREIGN KEY (`predecessor_task_id`) REFERENCES `tasks` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task_relations`
--

LOCK TABLES `task_relations` WRITE;
/*!40000 ALTER TABLE `task_relations` DISABLE KEYS */;
/*!40000 ALTER TABLE `task_relations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tasks` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `due_date` date DEFAULT NULL,
  `priority` enum('CRITICAL','HIGH','LOW','MEDIUM') NOT NULL,
  `status` enum('DONE','IN_PROGRESS','IN_REVIEW','TODO') NOT NULL,
  `title` varchar(150) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `assigned_to` bigint DEFAULT NULL,
  `created_by` bigint NOT NULL,
  `project_id` bigint NOT NULL,
  `is_active` bit(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK2vjo8mbre3rvpbd6e7976b54m` (`assigned_to`),
  KEY `FK9dgm9t7wn4w3gh57h63g712lo` (`created_by`),
  KEY `FKsfhn82y57i3k9uxww1s007acc` (`project_id`),
  CONSTRAINT `FK2vjo8mbre3rvpbd6e7976b54m` FOREIGN KEY (`assigned_to`) REFERENCES `users` (`id`),
  CONSTRAINT `FK9dgm9t7wn4w3gh57h63g712lo` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`),
  CONSTRAINT `FKsfhn82y57i3k9uxww1s007acc` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasks`
--

LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;
INSERT INTO `tasks` VALUES (1,'2026-07-04 20:35:52.514224','Updated task','2026-07-20','CRITICAL','IN_PROGRESS','Implement JWT Login','2026-07-06 13:13:53.102051',2,1,3,_binary ''),(2,'2026-07-06 13:14:46.434318','asdfgh','2026-07-07','MEDIUM','TODO','hello','2026-07-06 13:14:46.434318',3,1,4,_binary ''),(3,'2026-07-06 13:15:21.800540','asdzxfcgvhb','2026-07-07','MEDIUM','TODO','asdfghjk','2026-07-06 13:15:21.800540',2,1,3,_binary '');
/*!40000 ALTER TABLE `tasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `is_active` bit(1) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL,
  `email` varchar(100) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('ADMIN','DEVELOPER','MANAGER','TESTER') NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK6dotkott2kjsp8vw4d0m25fb7` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,_binary '','2026-07-03 22:46:33.673173','mahender@gmail.com','Mahender','$2a$10$Afdystact3ONpoIYHLe4FuP7nP55/moVoDEgxTrTrHk1oPUSV7YzG','DEVELOPER','2026-07-03 22:46:33.673173'),(2,_binary '','2026-07-03 22:54:01.442436','iash@gmail.com','jash','$2a$10$CE7STi/HYbYwVq7PNsaerOG7pRZOM0psx.FkhADNR/9Wd1oerNQNK','DEVELOPER','2026-07-03 22:54:01.442436'),(3,_binary '','2026-07-04 20:08:32.695241','test@gmail.com','Test User','$2a$10$sg3A1EOj/Xps5FmshZrTk.18RRP.LFidWY3U2uP4OZl4czBuCckGS','DEVELOPER','2026-07-04 20:08:32.695241'),(4,_binary '','2026-07-06 10:05:42.038567','hello@gmail.com','Jashwanth','$2a$10$fIcVDPtz3OGeSlgP2RNPW.wwOZP678r7RSAy24lgQeFoBzGoTCmaq','DEVELOPER','2026-07-06 10:05:42.038567'),(5,_binary '','2026-07-06 17:24:04.059132','123@gmail.com','mahi','$2a$10$w2cRTO7ZxW9ZUWO.3TCvXev0KVUmuIzY/ncUATgYl0iJfFgrRYQzu','ADMIN','2026-07-06 17:24:04.059132'),(6,_binary '','2026-07-06 17:25:56.184750','1@gmail.com','qwert','$2a$10$WcaEN/08BpqeD2EFFmU3x.d3ULW5U1WdRvq99jDnVvn58Ho5fslh2','MANAGER','2026-07-06 17:25:56.184750');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-07-07 18:09:58
