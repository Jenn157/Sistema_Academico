-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: localhost    Database: bd_colegio
-- ------------------------------------------------------
-- Server version	8.4.7

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
-- Table structure for table `materia_dictada`
--

DROP TABLE IF EXISTS `materia_dictada`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `materia_dictada` (
  `Id_materia_dictada` int NOT NULL AUTO_INCREMENT,
  `Id_usuario` int NOT NULL,
  `Cod_materia` int NOT NULL,
  `Horario` varchar(50) NOT NULL,
  PRIMARY KEY (`Id_materia_dictada`),
  KEY `Id_usuario` (`Id_usuario`),
  KEY `Cod_materia` (`Cod_materia`),
  CONSTRAINT `materia_dictada_ibfk_1` FOREIGN KEY (`Id_usuario`) REFERENCES `usuarios` (`Id_usuario`),
  CONSTRAINT `materia_dictada_ibfk_2` FOREIGN KEY (`Cod_materia`) REFERENCES `materias` (`Cod_materia`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `materia_dictada`
--

LOCK TABLES `materia_dictada` WRITE;
/*!40000 ALTER TABLE `materia_dictada` DISABLE KEYS */;
INSERT INTO `materia_dictada` VALUES (1,2,1,'Lunes 8-10 AM'),(2,2,5,'Miercoles 8 AM'),(3,2,2,'Viernes 4 - 6 pm'),(4,2,3,'Sabado 6-8 AM'),(5,4,3,'Miercoles 4-6 PM'),(6,4,4,'Lunes 2-4 PM');
/*!40000 ALTER TABLE `materia_dictada` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `materia_inscrita`
--

DROP TABLE IF EXISTS `materia_inscrita`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `materia_inscrita` (
  `Id_materia_inscrita` int NOT NULL AUTO_INCREMENT,
  `Id_usuario` int NOT NULL,
  `Id_materia_dictada` int NOT NULL,
  PRIMARY KEY (`Id_materia_inscrita`),
  KEY `Id_usuario` (`Id_usuario`),
  KEY `Id_materia_dictada` (`Id_materia_dictada`),
  CONSTRAINT `materia_inscrita_ibfk_1` FOREIGN KEY (`Id_usuario`) REFERENCES `usuarios` (`Id_usuario`),
  CONSTRAINT `materia_inscrita_ibfk_2` FOREIGN KEY (`Id_materia_dictada`) REFERENCES `materia_dictada` (`Id_materia_dictada`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `materia_inscrita`
--

LOCK TABLES `materia_inscrita` WRITE;
/*!40000 ALTER TABLE `materia_inscrita` DISABLE KEYS */;
INSERT INTO `materia_inscrita` VALUES (1,1,1),(2,3,2),(3,3,5),(4,3,6);
/*!40000 ALTER TABLE `materia_inscrita` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `materias`
--

DROP TABLE IF EXISTS `materias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `materias` (
  `Cod_materia` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`Cod_materia`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `materias`
--

LOCK TABLES `materias` WRITE;
/*!40000 ALTER TABLE `materias` DISABLE KEYS */;
INSERT INTO `materias` VALUES (1,'Programación web'),(2,'Base de datos'),(3,'Calculo'),(4,'Fisica'),(5,'Ingles');
/*!40000 ALTER TABLE `materias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notas`
--

DROP TABLE IF EXISTS `notas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notas` (
  `Id_nota` int NOT NULL AUTO_INCREMENT,
  `Id_materia_inscrita` int NOT NULL,
  `Nota` float NOT NULL,
  `Descripcion` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`Id_nota`),
  KEY `fk_notas_materia_inscrita` (`Id_materia_inscrita`),
  CONSTRAINT `fk_notas_materia_inscrita` FOREIGN KEY (`Id_materia_inscrita`) REFERENCES `materia_inscrita` (`Id_materia_inscrita`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notas`
--

LOCK TABLES `notas` WRITE;
/*!40000 ALTER TABLE `notas` DISABLE KEYS */;
INSERT INTO `notas` VALUES (1,1,3,'Taller'),(2,1,4.5,'Parcial'),(3,1,3.8,'Quiz'),(4,1,2.5,'Exposicion'),(5,2,4,'Quiz'),(6,2,3.5,'Parcial');
/*!40000 ALTER TABLE `notas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rol`
--

DROP TABLE IF EXISTS `rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rol` (
  `Id_rol` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`Id_rol`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol`
--

LOCK TABLES `rol` WRITE;
/*!40000 ALTER TABLE `rol` DISABLE KEYS */;
INSERT INTO `rol` VALUES (1,'Profesor'),(2,'Estudiante');
/*!40000 ALTER TABLE `rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `Id_usuario` int NOT NULL AUTO_INCREMENT,
  `Identificacion` varchar(20) NOT NULL,
  `Nombre` varchar(50) NOT NULL,
  `Clave` varchar(50) NOT NULL,
  `Id_rol` int NOT NULL,
  PRIMARY KEY (`Id_usuario`),
  UNIQUE KEY `Identificacion` (`Identificacion`),
  KEY `Id_rol` (`Id_rol`),
  CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`Id_rol`) REFERENCES `rol` (`Id_rol`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'1023362600','Jennifer Acuña','Esjdaa20251',2),(2,'1026578586','Yesid Amado','Profyaa202511',1),(3,'28205058','Sebastian Nuñez','Esjsn20251',2),(4,'5568292','Wendy Cardenas','Profwcc202512',1);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-19 15:45:13
