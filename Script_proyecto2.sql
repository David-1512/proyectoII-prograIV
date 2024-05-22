CREATE DATABASE proyecto2_progra4 /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

use proyecto2_progra4;

/*-------------------------------------------------------------------------------------*/

CREATE TABLE proveedor_stub(
	id_proveedor_stub varchar(20) NOT NULL,
	nombre varchar(45) NOT NULL,
    
    PRIMARY KEY (id_proveedor_stub)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*-------------------------------------------------------------------------------------*/

CREATE TABLE cliente_stub(
	id_cliente_stub varchar(20) NOT NULL,
	nombre varchar(45) NOT NULL,
    
    PRIMARY KEY (id_cliente_stub)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*-------------------------------------------------------------------------------------*/

CREATE TABLE producto_cabys(
	id_producto_cabys varchar(8) NOT NULL,
    nombre varchar(60) DEFAULT NULL,   
    impuesto float DEFAULT NULL,
    
    PRIMARY KEY (id_producto_cabys) 
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*-------------------------------------------------------------------------------------*/

CREATE TABLE actividad_comercial (
  id_actividad_comercial int NOT NULL,
  nombre varchar(70) DEFAULT NULL,
  
  PRIMARY KEY (id_actividad_comercial)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*-------------------------------------------------------------------------------------*/

CREATE TABLE unidad_medida (
  id_unidad_medida varchar(10),
  descripcion varchar(32) DEFAULT NULL,
  
  PRIMARY KEY (id_unidad_medida)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*-------------------------------------------------------------------------------------*/

CREATE TABLE proveedor (
  id_proveedor varchar(20) NOT NULL,
  nombre varchar(45) NOT NULL,
  tipo_identificacion varchar(20) NOT NULL,
  nombre_comercial varchar(45) DEFAULT NULL,  
  ubicacion varchar(120) DEFAULT NULL,   
  telefono int DEFAULT NULL,
  correo_electronico varchar(128) DEFAULT NULL,
  clave varchar(64) DEFAULT NULL,
  estado char(1) DEFAULT 'E',
  
  PRIMARY KEY (id_proveedor),
  
  UNIQUE KEY nombre_comercial_UNIQUE (nombre_comercial),
  UNIQUE KEY correo_electronico_UNIQUE (correo_electronico)
  
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*-------------------------------------------------------------------------------------*/

CREATE TABLE producto_proveedor(
	id_producto_proveedor int NOT NULL AUTO_INCREMENT,
    descripcion varchar(70) NOT NULL,
    precio_unitario double NOT NULL, 
    
    id_proveedor varchar(20) NOT NULL,
    id_unidad_medida varchar(10) NOT NULL,
    id_producto_cabys varchar(8) NOT NULL,

	PRIMARY KEY (id_producto_proveedor),
    
    CONSTRAINT fk_id_proveedor FOREIGN KEY (id_proveedor) REFERENCES proveedor (id_proveedor),
	CONSTRAINT fk_id_unidad_medida FOREIGN KEY (id_unidad_medida) REFERENCES unidad_medida (id_unidad_medida),    
	CONSTRAINT fk_id_producto_cabys FOREIGN KEY (id_producto_cabys) REFERENCES producto_cabys (id_producto_cabys)
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*-------------------------------------------------------------------------------------*/

CREATE TABLE cliente (
  id_cliente varchar(20) NOT NULL,
  nombre varchar(45) NOT NULL,
  tipo_identificacion varchar(20) NOT NULL,
  telefono varchar(12) DEFAULT NULL,
  correo_electronico varchar(70) DEFAULT NULL,
  
  PRIMARY KEY (id_cliente),
  
  UNIQUE KEY correo_electronico_UNIQUE (correo_electronico)
 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*-------------------------------------------------------------------------------------*/

CREATE TABLE cliente_proveedor(	
	id_proveedor varchar(20) NOT NULL,
	id_cliente varchar(20) NOT NULL,
    
    PRIMARY KEY(id_proveedor, id_cliente),

	CONSTRAINT fk_id_proveedor2 FOREIGN KEY (id_proveedor) REFERENCES proveedor (id_proveedor),
	CONSTRAINT fk_id_cliente FOREIGN KEY (id_cliente) REFERENCES cliente (id_cliente)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*-------------------------------------------------------------------------------------*/

CREATE TABLE factura (
  id_factura varchar(15) NOT NULL,  
  consecutivo bigint NOT NULL,
  fecha datetime NOT NULL,
  medio_pago varchar(25) DEFAULT NULL,
  total double NOT NULL,
  
  id_proveedor varchar(20) NOT NULL,
  id_cliente varchar(20) NOT NULL,
  
  PRIMARY KEY (id_factura),  
  
  CONSTRAINT fk_id_proveedor3 FOREIGN KEY (id_proveedor) REFERENCES proveedor (id_proveedor),
  CONSTRAINT fk_id_cliente3 FOREIGN KEY (id_cliente) REFERENCES cliente (id_cliente) 

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*-------------------------------------------------------------------------------------*/

CREATE TABLE linea_servicio (
  id_linea_servicio bigint NOT NULL AUTO_INCREMENT,  
  linea_detalle int DEFAULT NULL,  
  cantidad int NOT NULL, 
  impuesto double DEFAULT NULL,
  total_linea double DEFAULT NULL,
  
  id_producto_proveedor int NOT NULL,
  id_factura varchar(15) NOT NULL,
  
  PRIMARY KEY (id_linea_servicio),  

  CONSTRAINT fk_id_factura  FOREIGN KEY (id_factura ) REFERENCES factura (id_factura ),
  CONSTRAINT fk_id_producto_proveedor FOREIGN KEY (id_producto_proveedor) REFERENCES producto_proveedor (id_producto_proveedor)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;














