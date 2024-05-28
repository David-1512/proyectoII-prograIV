-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: proyecto2_progra4
-- ------------------------------------------------------
-- Server version	8.3.0

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
-- Table structure for table `actividad_comercial`
--

DROP TABLE IF EXISTS `actividad_comercial`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `actividad_comercial` (
  `id_actividad_comercial` varchar(10) NOT NULL,
  `nombre` varchar(70) DEFAULT NULL,
  PRIMARY KEY (`id_actividad_comercial`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actividad_comercial`
--

LOCK TABLES `actividad_comercial` WRITE;
/*!40000 ALTER TABLE `actividad_comercial` DISABLE KEYS */;
INSERT INTO `actividad_comercial` VALUES ('1234','Venta');
/*!40000 ALTER TABLE `actividad_comercial` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cliente` (
  `id_cliente` varchar(20) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `tipo_identificacion` varchar(20) NOT NULL,
  `telefono` varchar(12) DEFAULT NULL,
  `correo_electronico` varchar(70) DEFAULT NULL,
  PRIMARY KEY (`id_cliente`),
  UNIQUE KEY `correo_electronico_UNIQUE` (`correo_electronico`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES ('2345','David Serrano','nacional','85843812','davidj@gmail.com');
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cliente_proveedor`
--

DROP TABLE IF EXISTS `cliente_proveedor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cliente_proveedor` (
  `id_proveedor` varchar(20) NOT NULL,
  `id_cliente` varchar(20) NOT NULL,
  PRIMARY KEY (`id_proveedor`,`id_cliente`),
  KEY `fk_id_cliente` (`id_cliente`),
  CONSTRAINT `fk_id_cliente` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id_cliente`),
  CONSTRAINT `fk_id_proveedor2` FOREIGN KEY (`id_proveedor`) REFERENCES `proveedor` (`id_proveedor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente_proveedor`
--

LOCK TABLES `cliente_proveedor` WRITE;
/*!40000 ALTER TABLE `cliente_proveedor` DISABLE KEYS */;
INSERT INTO `cliente_proveedor` VALUES ('666','2345');
/*!40000 ALTER TABLE `cliente_proveedor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cliente_stub`
--

DROP TABLE IF EXISTS `cliente_stub`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cliente_stub` (
  `id_cliente_stub` varchar(20) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  PRIMARY KEY (`id_cliente_stub`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente_stub`
--

LOCK TABLES `cliente_stub` WRITE;
/*!40000 ALTER TABLE `cliente_stub` DISABLE KEYS */;
/*!40000 ALTER TABLE `cliente_stub` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `factura`
--

DROP TABLE IF EXISTS `factura`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `factura` (
  `id_factura` varchar(15) NOT NULL,
  `consecutivo` bigint NOT NULL,
  `fecha` datetime NOT NULL,
  `medio_pago` varchar(25) DEFAULT NULL,
  `total` double NOT NULL,
  `id_proveedor` varchar(20) NOT NULL,
  `id_cliente` varchar(20) NOT NULL,
  PRIMARY KEY (`id_factura`),
  KEY `fk_id_proveedor3` (`id_proveedor`),
  KEY `fk_id_cliente3` (`id_cliente`),
  CONSTRAINT `fk_id_cliente3` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id_cliente`),
  CONSTRAINT `fk_id_proveedor3` FOREIGN KEY (`id_proveedor`) REFERENCES `proveedor` (`id_proveedor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `factura`
--

LOCK TABLES `factura` WRITE;
/*!40000 ALTER TABLE `factura` DISABLE KEYS */;
INSERT INTO `factura` VALUES ('0000000001',1,'2024-05-27 00:00:00','Tarjeta',8050,'666','2345');
/*!40000 ALTER TABLE `factura` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `linea_servicio`
--

DROP TABLE IF EXISTS `linea_servicio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `linea_servicio` (
  `id_linea_servicio` bigint NOT NULL AUTO_INCREMENT,
  `linea_detalle` int DEFAULT NULL,
  `cantidad` int NOT NULL,
  `impuesto` double DEFAULT NULL,
  `total_linea` double DEFAULT NULL,
  `id_producto_proveedor` int NOT NULL,
  `id_factura` varchar(15) NOT NULL,
  PRIMARY KEY (`id_linea_servicio`),
  KEY `fk_id_factura` (`id_factura`),
  KEY `fk_id_producto_proveedor` (`id_producto_proveedor`),
  CONSTRAINT `fk_id_factura` FOREIGN KEY (`id_factura`) REFERENCES `factura` (`id_factura`),
  CONSTRAINT `fk_id_producto_proveedor` FOREIGN KEY (`id_producto_proveedor`) REFERENCES `producto_proveedor` (`id_producto_proveedor`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `linea_servicio`
--

LOCK TABLES `linea_servicio` WRITE;
/*!40000 ALTER TABLE `linea_servicio` DISABLE KEYS */;
INSERT INTO `linea_servicio` VALUES (1,1,7,1.05,8050,1,'0000000001');
/*!40000 ALTER TABLE `linea_servicio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producto_cabys`
--

DROP TABLE IF EXISTS `producto_cabys`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `producto_cabys` (
  `id_producto_cabys` varchar(8) NOT NULL,
  `nombre` varchar(60) DEFAULT NULL,
  `impuesto` float DEFAULT NULL,
  PRIMARY KEY (`id_producto_cabys`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto_cabys`
--

LOCK TABLES `producto_cabys` WRITE;
/*!40000 ALTER TABLE `producto_cabys` DISABLE KEYS */;
INSERT INTO `producto_cabys` VALUES ('156','Macarrones',0.15);
/*!40000 ALTER TABLE `producto_cabys` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producto_proveedor`
--

DROP TABLE IF EXISTS `producto_proveedor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `producto_proveedor` (
  `id_producto_proveedor` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(70) NOT NULL,
  `precio_unitario` double NOT NULL,
  `id_proveedor` varchar(20) NOT NULL,
  `id_unidad_medida` varchar(10) NOT NULL,
  `id_producto_cabys` varchar(8) NOT NULL,
  PRIMARY KEY (`id_producto_proveedor`),
  KEY `fk_id_proveedor` (`id_proveedor`),
  KEY `fk_id_unidad_medida` (`id_unidad_medida`),
  KEY `fk_id_producto_cabys` (`id_producto_cabys`),
  CONSTRAINT `fk_id_producto_cabys` FOREIGN KEY (`id_producto_cabys`) REFERENCES `producto_cabys` (`id_producto_cabys`),
  CONSTRAINT `fk_id_proveedor` FOREIGN KEY (`id_proveedor`) REFERENCES `proveedor` (`id_proveedor`),
  CONSTRAINT `fk_id_unidad_medida` FOREIGN KEY (`id_unidad_medida`) REFERENCES `unidad_medida` (`id_unidad_medida`)
) ENGINE=InnoDB AUTO_INCREMENT=46363 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto_proveedor`
--

LOCK TABLES `producto_proveedor` WRITE;
/*!40000 ALTER TABLE `producto_proveedor` DISABLE KEYS */;
INSERT INTO `producto_proveedor` VALUES (1,'Macarrones Sabor',1000,'666','1','156');
/*!40000 ALTER TABLE `producto_proveedor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proveedor`
--

DROP TABLE IF EXISTS `proveedor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proveedor` (
  `id_proveedor` varchar(20) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `tipo_identificacion` varchar(20) DEFAULT NULL,
  `nombre_comercial` varchar(45) DEFAULT NULL,
  `ubicacion` varchar(400) DEFAULT NULL,
  `telefono` int DEFAULT NULL,
  `correo_electronico` varchar(128) DEFAULT NULL,
  `clave` varchar(200) DEFAULT NULL,
  `estado` char(1) DEFAULT 'E',
  `id_actividad_comercial` int DEFAULT NULL,
  PRIMARY KEY (`id_proveedor`),
  UNIQUE KEY `nombre_comercial_UNIQUE` (`nombre_comercial`),
  UNIQUE KEY `correo_electronico_UNIQUE` (`correo_electronico`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proveedor`
--

LOCK TABLES `proveedor` WRITE;
/*!40000 ALTER TABLE `proveedor` DISABLE KEYS */;
INSERT INTO `proveedor` VALUES ('666','david','Persona Fisica','David Service','San Jose',888954,'davidj@gmail','{bcrypt}$2a$10$3adMZT6.NR.RLhMq5tJmBO51onSG0R0Rtn4ERUWY4J5/blFxfggSe','A',0);
/*!40000 ALTER TABLE `proveedor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proveedor_stub`
--

DROP TABLE IF EXISTS `proveedor_stub`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proveedor_stub` (
  `id_proveedor_stub` varchar(20) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  PRIMARY KEY (`id_proveedor_stub`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proveedor_stub`
--

LOCK TABLES `proveedor_stub` WRITE;
/*!40000 ALTER TABLE `proveedor_stub` DISABLE KEYS */;
INSERT INTO `proveedor_stub` VALUES ('666','6');
/*!40000 ALTER TABLE `proveedor_stub` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `unidad_medida`
--

DROP TABLE IF EXISTS `unidad_medida`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `unidad_medida` (
  `id_unidad_medida` varchar(10) NOT NULL,
  `descripcion` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`id_unidad_medida`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `unidad_medida`
--

LOCK TABLES `unidad_medida` WRITE;
/*!40000 ALTER TABLE `unidad_medida` DISABLE KEYS */;
INSERT INTO `unidad_medida` VALUES ('1','KG');
/*!40000 ALTER TABLE `unidad_medida` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-27 20:47:38
