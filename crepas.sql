CREATE DATABASE crepas_db;

USE crepas_db;

CREATE TABLE crepas_admin(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(16) NOT NULL,
    password VARCHAR(60) NOT NULL,
    fullname VARCHAR(100) NOT NULL    
);

ALTER TABLE crepas_admin ADD id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY;
ALTER TABLE crepas_admin ADD lang VARCHAR(180) NOT NULL DEFAULT 'en';

CREATE TABLE cdth(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    harina VARCHAR(180)
);

CREATE TABLE cdiu(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    ingrediente_unt VARCHAR(180) NOT NULL
);

CREATE TABLE cdic(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    ingrediente_com VARCHAR(180) NOT NULL
);

ALTER TABLE cdic ADD tipo VARCHAR(180) NOT NULL;

CREATE TABLE cdn(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nieve VARCHAR(180) NOT NULL
);

CREATE TABLE cdd(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    decoracion VARCHAR(180) NOT NULL
);

CREATE TABLE cdp(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    descripcion VARCHAR(180) NOT NULL,
    precio INT(11) NOT NULL
);

CREATE TABLE csip(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    ingrediente_pri VARCHAR(180) NOT NULL
);

CREATE TABLE csib(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    ingrediente_base VARCHAR(180) NOT NULL
);

CREATE TABLE csab(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    adereso_base VARCHAR(180) NOT NULL
);

CREATE TABLE csa(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    adereso VARCHAR(180) NOT NULL
);

CREATE TABLE csei(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    ensalada_ind VARCHAR(180) NOT NULL,
    descripcion VARCHAR(180)
);

CREATE TABLE csb(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    botana VARCHAR(180) NOT NULL,
    precio INT(11) NOT NULL
);

CREATE TABLE csp(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    descripcion VARCHAR(180) NOT NULL,
    precio INT(11) NOT NULL
);

CREATE TABLE wiu(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    ingrediente_unt VARCHAR(180) NOT NULL
);

CREATE TABLE wic(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    ingrediente_com VARCHAR(180) NOT NULL
);
ALTER TABLE wic ADD tipo VARCHAR(180) NOT NULL;

CREATE TABLE wn(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nieve VARCHAR(180) NOT NULL
);

CREATE TABLE wd(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    decoracion VARCHAR(180) NOT NULL
);

CREATE TABLE wp(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    descripcion VARCHAR(180) NOT NULL,
    precio INT(11) NOT NULL
);

CREATE TABLE wciu(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    ingrediente_unt VARCHAR(180) NOT NULL
);

CREATE TABLE wcic(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    ingrediente_com VARCHAR(180) NOT NULL
);

ALTER TABLE wcic ADD tipo VARCHAR(180) NOT NULL;

CREATE TABLE wcn(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nieve VARCHAR(180) NOT NULL
);

CREATE TABLE wcd(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    decoracion VARCHAR(180) NOT NULL
);

CREATE TABLE wcp(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    descripcion VARCHAR(180) NOT NULL,
    precio INT(11) NOT NULL
);

CREATE TABLE bf(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    bebida VARCHAR(180) NOT NULL,
    descripcion VARCHAR(180) NOT NULL,
    precio INT(11) NOT NULL
);

CREATE TABLE bc(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    bebida VARCHAR(180) NOT NULL,
    descripcion VARCHAR(180) NOT NULL,
    precio INT(11) NOT NULL
);

    ALTER TABLE cdth ADD inventario BOOLEAN NOT NULL;
    ALTER TABLE cdiu ADD inventario BOOLEAN NOT NULL;
    ALTER TABLE cdic ADD inventario BOOLEAN NOT NULL;
    ALTER TABLE cdn ADD inventario BOOLEAN NOT NULL;
    ALTER TABLE cdd ADD inventario BOOLEAN NOT NULL;
    ALTER TABLE csip ADD inventario BOOLEAN NOT NULL;
    ALTER TABLE csib ADD inventario BOOLEAN NOT NULL;
    ALTER TABLE csab ADD inventario BOOLEAN NOT NULL;
    ALTER TABLE csa ADD inventario BOOLEAN NOT NULL;
    ALTER TABLE csei ADD inventario BOOLEAN NOT NULL;
    ALTER TABLE csb ADD inventario BOOLEAN NOT NULL;
    ALTER TABLE wiu ADD inventario BOOLEAN NOT NULL;
    ALTER TABLE wic ADD inventario BOOLEAN NOT NULL;
    ALTER TABLE wn ADD inventario BOOLEAN NOT NULL;
    ALTER TABLE wd ADD inventario BOOLEAN NOT NULL;
    ALTER TABLE wciu ADD inventario BOOLEAN NOT NULL;
    ALTER TABLE wcic ADD inventario BOOLEAN NOT NULL;
    ALTER TABLE wcn ADD inventario BOOLEAN NOT NULL;
    ALTER TABLE wcd ADD inventario BOOLEAN NOT NULL;
    ALTER TABLE bf ADD inventario BOOLEAN NOT NULL;
    ALTER TABLE bc ADD inventario BOOLEAN NOT NULL;

    ALTER TABLE cdth ADD adminId INT(11) NOT NULL;
ALTER TABLE cdiu ADD adminId INT(11) NOT NULL;
ALTER TABLE cdic ADD adminId INT(11) NOT NULL;
ALTER TABLE cdn ADD adminId INT(11) NOT NULL;
ALTER TABLE cdd ADD adminId INT(11) NOT NULL;
ALTER TABLE cdp ADD adminId INT(11) NOT NULL;
ALTER TABLE csip ADD adminId INT(11) NOT NULL;
ALTER TABLE csib ADD adminId INT(11) NOT NULL;
ALTER TABLE csab ADD adminId INT(11) NOT NULL;
ALTER TABLE csa ADD adminId INT(11) NOT NULL;
ALTER TABLE csei ADD adminId INT(11) NOT NULL;
ALTER TABLE csb ADD adminId INT(11) NOT NULL;
ALTER TABLE csp ADD adminId INT(11) NOT NULL;
ALTER TABLE wiu ADD adminId INT(11) NOT NULL;
ALTER TABLE wic ADD adminId INT(11) NOT NULL;
ALTER TABLE wn ADD adminId INT(11) NOT NULL;
ALTER TABLE wd ADD adminId INT(11) NOT NULL;
ALTER TABLE wp ADD adminId INT(11) NOT NULL;
ALTER TABLE wciu ADD adminId INT(11) NOT NULL;
ALTER TABLE wcic ADD adminId INT(11) NOT NULL;
ALTER TABLE wcn ADD adminId INT(11) NOT NULL;
ALTER TABLE wcd ADD adminId INT(11) NOT NULL;
ALTER TABLE wcp ADD adminId INT(11) NOT NULL;
ALTER TABLE bf ADD adminId INT(11) NOT NULL;
ALTER TABLE bc ADD adminId INT(11) NOT NULL;

-- Para los usuarios
CREATE DATABASE crepas_users_db;

USE crepas_users_db;

CREATE TABLE caja_usuarios(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    fullname VARCHAR(255) NOT NULL,
    numero_caja INT(20) NOT NULL,
    estado VARCHAR(20) DEFAULT 'activo',
    sucursal_id INT(20) NOT NULL
);

ALTER TABLE caja_usuarios
MODIFY estado VARCHAR(20) DEFAULT 'activo';

ALTER TABLE caja_usuarios ADD adminId INT(11) NOT NULL;


ALTER TABLE caja_usuarios ADD lang VARCHAR(180) NOT NULL DEFAULT 'en';



CREATE TABLE usuarios(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    fullname VARCHAR(255) NOT NULL,
    estado VARCHAR(20) DEFAULT 'activo'
);
ALTER TABLE usuarios
MODIFY estado VARCHAR(20) DEFAULT 'activo';

ALTER TABLE usuarios ADD adminId INT(11) NOT NULL;

CREATE TABLE direcciones_usuarios(
    fullname VARCHAR(255) NOT NULL,
    Calle VARCHAR(255) NOT NULL,
    numero INT(20) NOT NULL,
    ciudad_localidad VARCHAR(255) NOT NULL,
    estado_provincia VARCHAR(255) NOT NULL,
    codigo_postal INT(20) NOT NULL,
    pais VARCHAR(255) NOT NULL,
    numero_telefono INT(20) NOT NULL
);

-- Facturas
CREATE TABLE factura_caja(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    numero_caja INT(20) NOT NULL,
    numero_productos INT(20) NOT NULL,
    fecha_hora DATETIME,
    orden JSON NOT NULL,
    total INT(20) NOT NULL,
    sucursal_id INT(20) NOT NULL,
    userId INT(11) NOT NULL
);

ALTER TABLE factura_caja ADD mesa INT(11) NOT NULL DEFAULT 1;

ALTER TABLE factura_caja ADD adminId INT(11) NOT NULL;

CREATE TABLE factura_ecommer(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    numero_productos INT(20) NOT NULL,
    fecha_hora DATETIME,
    orden JSON NOT NULL, 
    total INT(20) NOT NULL
);

ALTER TABLE factura_ecommer ADD adminId INT(11) NOT NULL;

CREATE TABLE agotamiento(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    producto VARCHAR(255) NOT NULL,
    sucursal_id INT(20) NOT NULL,
    numero_prdouctos_agotaods INT(20) NOT NULL,
    fecha_hora DATETIME,
    razones VARCHAR(255) NOT NULL,
    solucion VARCHAR(255) NOT NULL,
    userId INT(11) NOT NULL
);

ALTER TABLE agotamiento ADD adminId INT(11) NOT NULL;

CREATE TABLE carrito_caja (
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    orden JSON NOT NULL, 
    precio INT(20) NOT NULL,
    userId INT(11) NOT NULL
);

    ALTER TABLE carrito_caja
     ADD nombre VARCHAR(255) NOT NULL;

         ALTER TABLE carrito_caja
     ADD cantidad INT(11) NOT NULL DEFAULT 1;

    ALTER TABLE carrito_caja
     ADD total INT(11) NOT NULL;

     ALTER TABLE carrito_caja ADD adminId INT(11) NOT NULL;
     ALTER TABLE carrito_caja ADD mesa INT(11) NOT NULL DEFAULT 1;

CREATE TABLE sucursales (
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    direccion JSON NOT NULL,
    nombre VARCHAR(255) NOT NULL
);

ALTER TABLE sucursales ADD adminId INT(11) NOT NULL;

CREATE TABLE paises (
  id INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(255) NOT NULL,
  clave CHAR(20) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO paises (nombre, clave) VALUES
('México', 'MEX'),
('Estados Unidos', 'USA'),
('Canadá', 'CAN'),
('España', 'ESP'),
('Francia', 'FRA'),
('Alemania', 'ALE'),
('Reino Unido', 'GBR'),
('China', 'CHN'),
('India', 'IND'),
('Brasil', 'BRA'),
('Rusia', 'RUS'),
('Japón', 'JPN'),
('Australia', 'AUS'),
('Argentina', 'ARG'),
('Colombia', 'COL'),
('Perú', 'PER'),
('Chile', 'CHL'),
('Venezuela', 'VEN'),
('Ecuador', 'ECU'),
('Guatemala', 'GTM'),
('Honduras', 'HND'),
('Costa Rica', 'CRI'),
('Panamá', 'PAN'),
('Nicaragua', 'NIC'),
('El Salvador', 'SLV'),
('Bolivia', 'BOL'),
('Paraguay', 'PRY'),
('Uruguay', 'URY'),
('Cuba', 'CUB'),
('Haití', 'HTI'),
('República Dominicana', 'DOM');


CREATE TABLE estados (
  id INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(255) NOT NULL,
  clave VARCHAR(20) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO estados (nombre, clave) VALUES
('Aguascalientes', 'AGS'),
('Baja California', 'BC'),
('Baja California Sur', 'BCS'),
('Campeche', 'CAM'),
('Chiapas', 'CHIS'),
('Chihuahua', 'CHIH'),
('Coahuila', 'COAH'),
('Colima', 'COL'),
('CDMX', 'CDMX'),
('Durango', 'DURANGO'),
('Guanajuato', 'GTO'),
('Guerrero', 'GRO'),
('Hidalgo', 'HGO'),
('Jalisco', 'JAL'),
('México', 'MEX'),
('Michoacán', 'MICH'),
('Morelos', 'MOR'),
('Nayarit', 'NAY'),
('Nuevo León', 'NL'),
('Oaxaca', 'OAX'),
('Puebla', 'PUE'),
('Querétaro', 'QRO'),
('Quintana Roo', 'ROO'),
('San Luis Potosí', 'SLP'),
('Sinaloa', 'SIN'),
('Sonora', 'SON'),
('Tabasco', 'TAB'),
('Tamaulipas', 'TAM'),
('Tlaxcala', 'TLAX'),
('Veracruz', 'VER'),
('Yucatán', 'YUC'),
('Zacatecas', 'ZAC');

-- Productos en existencia o en ineccistencia en sucursales

USE crepas_db;

CREATE TABLE cdthe(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    harina VARCHAR(180),
    product_id INT(11) NOT NULL,
    sucursal_id INT(11) NOT NULL,
    existencia BOOLEAN DEFAULT false
);

CREATE TABLE cdiue(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    ingrediente_unt VARCHAR(180) NOT NULL,
    product_id INT(11) NOT NULL,
    sucursal_id INT(11) NOT NULL,
    existencia BOOLEAN DEFAULT false
);

CREATE TABLE cdice(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    ingrediente_com VARCHAR(180) NOT NULL,
    product_id INT(11) NOT NULL,
    sucursal_id INT(11) NOT NULL,
    existencia BOOLEAN DEFAULT false
);

CREATE TABLE cdne(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nieve VARCHAR(180) NOT NULL,
    product_id INT(11) NOT NULL,
    sucursal_id INT(11) NOT NULL,
    existencia BOOLEAN DEFAULT false
);

CREATE TABLE cdde(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    decoracion VARCHAR(180) NOT NULL,
    product_id INT(11) NOT NULL,
    sucursal_id INT(11) NOT NULL,
    existencia BOOLEAN DEFAULT false
);

CREATE TABLE csipe(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    ingrediente_pri VARCHAR(180) NOT NULL,
    product_id INT(11) NOT NULL,
    sucursal_id INT(11) NOT NULL,
    existencia BOOLEAN DEFAULT false
);

CREATE TABLE csibe(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    ingrediente_base VARCHAR(180) NOT NULL,
    product_id INT(11) NOT NULL,
    sucursal_id INT(11) NOT NULL,
    existencia BOOLEAN DEFAULT false
);

CREATE TABLE csabe(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    adereso_base VARCHAR(180) NOT NULL,
    product_id INT(11) NOT NULL,
    sucursal_id INT(11) NOT NULL,
    existencia BOOLEAN DEFAULT false
);

CREATE TABLE csae(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    adereso VARCHAR(180) NOT NULL,
    product_id INT(11) NOT NULL,
    sucursal_id INT(11) NOT NULL,
    existencia BOOLEAN DEFAULT false
);

CREATE TABLE cseie(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    ensalada_ind VARCHAR(180) NOT NULL,
    descripcion VARCHAR(180),
    product_id INT(11) NOT NULL,
    sucursal_id INT(11) NOT NULL,
    existencia BOOLEAN DEFAULT false
);

CREATE TABLE csbe(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    botana VARCHAR(180) NOT NULL,
    product_id INT(11) NOT NULL,
    sucursal_id INT(11) NOT NULL,
    existencia BOOLEAN DEFAULT false
);

CREATE TABLE wiue(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    ingrediente_unt VARCHAR(180) NOT NULL,
    product_id INT(11) NOT NULL,
    sucursal_id INT(11) NOT NULL,
    existencia BOOLEAN DEFAULT false
);

CREATE TABLE wice(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    ingrediente_com VARCHAR(180) NOT NULL,
    product_id INT(11) NOT NULL,
    sucursal_id INT(11) NOT NULL,
    existencia BOOLEAN DEFAULT false
);

CREATE TABLE wne(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nieve VARCHAR(180) NOT NULL,
    product_id INT(11) NOT NULL,
    sucursal_id INT(11) NOT NULL,
    existencia BOOLEAN DEFAULT false
);

CREATE TABLE wde(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    decoracion VARCHAR(180) NOT NULL,
    product_id INT(11) NOT NULL,
    sucursal_id INT(11) NOT NULL,
    existencia BOOLEAN DEFAULT false
);

CREATE TABLE wciue(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    ingrediente_unt VARCHAR(180) NOT NULL,
    product_id INT(11) NOT NULL,
    sucursal_id INT(11) NOT NULL,
    existencia BOOLEAN DEFAULT false
);

CREATE TABLE wcice(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    ingrediente_com VARCHAR(180) NOT NULL,
    product_id INT(11) NOT NULL,
    sucursal_id INT(11) NOT NULL,
    existencia BOOLEAN DEFAULT false
);

CREATE TABLE wcne(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nieve VARCHAR(180) NOT NULL,
    product_id INT(11) NOT NULL,
    sucursal_id INT(11) NOT NULL,
    existencia BOOLEAN DEFAULT false
);

CREATE TABLE wcde(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    decoracion VARCHAR(180) NOT NULL,
    product_id INT(11) NOT NULL,
    sucursal_id INT(11) NOT NULL,
    existencia BOOLEAN DEFAULT false
);

CREATE TABLE bfe(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    bebida VARCHAR(180) NOT NULL,
    descripcion VARCHAR(180) NOT NULL,
    product_id INT(11) NOT NULL,
    sucursal_id INT(11) NOT NULL,
    existencia BOOLEAN DEFAULT false
);

CREATE TABLE bce(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    bebida VARCHAR(180) NOT NULL,
    descripcion VARCHAR(180) NOT NULL,
    product_id INT(11) NOT NULL,
    sucursal_id INT(11) NOT NULL,
    existencia BOOLEAN DEFAULT false
);

ALTER TABLE cdthe ADD adminId INT(11) NOT NULL;
ALTER TABLE cdiue ADD adminId INT(11) NOT NULL;
ALTER TABLE cdice ADD adminId INT(11) NOT NULL;
ALTER TABLE cdne ADD adminId INT(11) NOT NULL;
ALTER TABLE cdde ADD adminId INT(11) NOT NULL;
ALTER TABLE csipe ADD adminId INT(11) NOT NULL;
ALTER TABLE csibe ADD adminId INT(11) NOT NULL;
ALTER TABLE csabe ADD adminId INT(11) NOT NULL;
ALTER TABLE csae ADD adminId INT(11) NOT NULL;
ALTER TABLE cseie ADD adminId INT(11) NOT NULL;
ALTER TABLE csbe ADD adminId INT(11) NOT NULL;
ALTER TABLE wiue ADD adminId INT(11) NOT NULL;
ALTER TABLE wice ADD adminId INT(11) NOT NULL;
ALTER TABLE wne ADD adminId INT(11) NOT NULL;
ALTER TABLE wde ADD adminId INT(11) NOT NULL;
ALTER TABLE wciue ADD adminId INT(11) NOT NULL;
ALTER TABLE wcice ADD adminId INT(11) NOT NULL;
ALTER TABLE wcne ADD adminId INT(11) NOT NULL;
ALTER TABLE wcde ADD adminId INT(11) NOT NULL;
ALTER TABLE bfe ADD adminId INT(11) NOT NULL;
ALTER TABLE bce ADD adminId INT(11) NOT NULL;


ALTER TABLE cdthe ADD inventario INT(11);
ALTER TABLE cdiue ADD inventario INT(11);
ALTER TABLE cdice ADD inventario INT(11);
ALTER TABLE cdne ADD inventario INT(11);
ALTER TABLE cdde ADD inventario INT(11);
ALTER TABLE csipe ADD inventario INT(11);
ALTER TABLE csibe ADD inventario INT(11);
ALTER TABLE csabe ADD inventario INT(11);
ALTER TABLE csae ADD inventario INT(11);
ALTER TABLE cseie ADD inventario INT(11);
ALTER TABLE csbe ADD inventario INT(11);
ALTER TABLE wiue ADD inventario INT(11);
ALTER TABLE wice ADD inventario INT(11);
ALTER TABLE wne ADD inventario INT(11);
ALTER TABLE wde ADD inventario INT(11);
ALTER TABLE wciue ADD inventario INT(11);
ALTER TABLE wcice ADD inventario INT(11);
ALTER TABLE wcne ADD inventario INT(11);
ALTER TABLE wcde ADD inventario INT(11);
ALTER TABLE bfe ADD inventario INT(11);
ALTER TABLE bce ADD inventario INT(11);


ALTER TABLE cdthe ADD cantidad BOOLEAN;
ALTER TABLE cdiue ADD cantidad BOOLEAN;
ALTER TABLE cdice ADD cantidad BOOLEAN;
ALTER TABLE cdne ADD cantidad BOOLEAN;
ALTER TABLE cdde ADD cantidad BOOLEAN;
ALTER TABLE csipe ADD cantidad BOOLEAN;
ALTER TABLE csibe ADD cantidad BOOLEAN;
ALTER TABLE csabe ADD cantidad BOOLEAN;
ALTER TABLE csae ADD cantidad BOOLEAN;
ALTER TABLE cseie ADD cantidad BOOLEAN;
ALTER TABLE csbe ADD cantidad BOOLEAN;
ALTER TABLE wiue ADD cantidad BOOLEAN;
ALTER TABLE wice ADD cantidad BOOLEAN;
ALTER TABLE wne ADD cantidad BOOLEAN;
ALTER TABLE wde ADD cantidad BOOLEAN;
ALTER TABLE wciue ADD cantidad BOOLEAN;
ALTER TABLE wcice ADD cantidad BOOLEAN;
ALTER TABLE wcne ADD cantidad BOOLEAN;
ALTER TABLE wcde ADD cantidad BOOLEAN;
ALTER TABLE bfe ADD cantidad BOOLEAN;
ALTER TABLE bce ADD cantidad BOOLEAN;


ALTER TABLE cdthe ALTER COLUMN inventario SET DEFAULT 0;
ALTER TABLE cdiue ALTER COLUMN inventario SET DEFAULT 0;
ALTER TABLE cdice ALTER COLUMN inventario SET DEFAULT 0;
ALTER TABLE cdne ALTER COLUMN inventario SET DEFAULT 0;
ALTER TABLE cdde ALTER COLUMN inventario SET DEFAULT 0;
ALTER TABLE csipe ALTER COLUMN inventario SET DEFAULT 0;
ALTER TABLE csibe ALTER COLUMN inventario SET DEFAULT 0;
ALTER TABLE csabe ALTER COLUMN inventario SET DEFAULT 0;
ALTER TABLE csae ALTER COLUMN inventario SET DEFAULT 0;
ALTER TABLE cseie ALTER COLUMN inventario SET DEFAULT 0;
ALTER TABLE csbe ALTER COLUMN inventario SET DEFAULT 0;
ALTER TABLE wiue ALTER COLUMN inventario SET DEFAULT 0;
ALTER TABLE wice ALTER COLUMN inventario SET DEFAULT 0;
ALTER TABLE wne ALTER COLUMN inventario SET DEFAULT 0;
ALTER TABLE wde ALTER COLUMN inventario SET DEFAULT 0;
ALTER TABLE wciue ALTER COLUMN inventario SET DEFAULT 0;
ALTER TABLE wcice ALTER COLUMN inventario SET DEFAULT 0;
ALTER TABLE wcne ALTER COLUMN inventario SET DEFAULT 0;
ALTER TABLE wcde ALTER COLUMN inventario SET DEFAULT 0;
ALTER TABLE bfe ALTER COLUMN inventario SET DEFAULT 0;
ALTER TABLE bce ALTER COLUMN inventario SET DEFAULT 0;

ALTER TABLE cdthe ALTER COLUMN cantidad SET DEFAULT false;
ALTER TABLE cdiue ALTER COLUMN cantidad SET DEFAULT false;
ALTER TABLE cdice ALTER COLUMN cantidad SET DEFAULT false;
ALTER TABLE cdne ALTER COLUMN cantidad SET DEFAULT false;
ALTER TABLE cdde ALTER COLUMN cantidad SET DEFAULT false;
ALTER TABLE csipe ALTER COLUMN cantidad SET DEFAULT false;
ALTER TABLE csibe ALTER COLUMN cantidad SET DEFAULT false;
ALTER TABLE csabe ALTER COLUMN cantidad SET DEFAULT false;
ALTER TABLE csae ALTER COLUMN cantidad SET DEFAULT false;
ALTER TABLE cseie ALTER COLUMN cantidad SET DEFAULT false;
ALTER TABLE csbe ALTER COLUMN cantidad SET DEFAULT false;
ALTER TABLE wiue ALTER COLUMN cantidad SET DEFAULT false;
ALTER TABLE wice ALTER COLUMN cantidad SET DEFAULT false;
ALTER TABLE wne ALTER COLUMN cantidad SET DEFAULT false;
ALTER TABLE wde ALTER COLUMN cantidad SET DEFAULT false;
ALTER TABLE wciue ALTER COLUMN cantidad SET DEFAULT false;
ALTER TABLE wcice ALTER COLUMN cantidad SET DEFAULT false;
ALTER TABLE wcne ALTER COLUMN cantidad SET DEFAULT false;
ALTER TABLE wcde ALTER COLUMN cantidad SET DEFAULT false;
ALTER TABLE bfe ALTER COLUMN cantidad SET DEFAULT false;
ALTER TABLE bce ALTER COLUMN cantidad SET DEFAULT false;

-- Para las ventas de cada sucursal 

CREATE TABLE cdthv(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    harina VARCHAR(180),
    product_id INT(11) NOT NULL,
    sucursal_id INT(11) NOT NULL,
    ventas INT(11) NOT NULL DEFAULT 0,
    created_at DATETIME
);

CREATE TABLE cdiuv(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    ingrediente_unt VARCHAR(180) NOT NULL,
    product_id INT(11) NOT NULL,
    sucursal_id INT(11) NOT NULL,
    ventas INT(11) NOT NULL DEFAULT 0,
    created_at DATETIME
);

CREATE TABLE cdicv(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    ingrediente_com VARCHAR(180) NOT NULL,
    product_id INT(11) NOT NULL,
    sucursal_id INT(11) NOT NULL,
    ventas INT(11) NOT NULL DEFAULT 0,
    created_at DATETIME
);

CREATE TABLE cdnv(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nieve VARCHAR(180) NOT NULL,
    product_id INT(11) NOT NULL,
    sucursal_id INT(11) NOT NULL,
    ventas INT(11) NOT NULL DEFAULT 0,
    created_at DATETIME
);

CREATE TABLE cddv(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    decoracion VARCHAR(180) NOT NULL,
    product_id INT(11) NOT NULL,
    sucursal_id INT(11) NOT NULL,
    ventas INT(11) NOT NULL DEFAULT 0,
    created_at DATETIME
);

CREATE TABLE csipv(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    ingrediente_pri VARCHAR(180) NOT NULL,
    product_id INT(11) NOT NULL,
    sucursal_id INT(11) NOT NULL,
    ventas INT(11) NOT NULL DEFAULT 0,
    created_at DATETIME
);

CREATE TABLE csibv(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    ingrediente_base VARCHAR(180) NOT NULL,
    product_id INT(11) NOT NULL,
    sucursal_id INT(11) NOT NULL,
    ventas INT(11) NOT NULL DEFAULT 0,
    created_at DATETIME
);

CREATE TABLE csabv(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    adereso_base VARCHAR(180) NOT NULL,
    product_id INT(11) NOT NULL,
    sucursal_id INT(11) NOT NULL,
    ventas INT(11) NOT NULL DEFAULT 0,
    created_at DATETIME
);

CREATE TABLE csav(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    adereso VARCHAR(180) NOT NULL,
    product_id INT(11) NOT NULL,
    sucursal_id INT(11) NOT NULL,
    ventas INT(11) NOT NULL DEFAULT 0,
    created_at DATETIME
);

CREATE TABLE cseiv(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    ensalada_ind VARCHAR(180) NOT NULL,
    descripcion VARCHAR(180),
    product_id INT(11) NOT NULL,
    sucursal_id INT(11) NOT NULL,
    ventas INT(11) NOT NULL DEFAULT 0,
    created_at DATETIME
);

CREATE TABLE csbv(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    botana VARCHAR(180) NOT NULL,
    product_id INT(11) NOT NULL,
    sucursal_id INT(11) NOT NULL,
    ventas INT(11) NOT NULL DEFAULT 0,
    created_at DATETIME
);

CREATE TABLE wiuv(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    ingrediente_unt VARCHAR(180) NOT NULL,
    product_id INT(11) NOT NULL,
    sucursal_id INT(11) NOT NULL,
    ventas INT(11) NOT NULL DEFAULT 0,
    created_at DATETIME
);

CREATE TABLE wicv(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    ingrediente_com VARCHAR(180) NOT NULL,
    product_id INT(11) NOT NULL,
    sucursal_id INT(11) NOT NULL,
    ventas INT(11) NOT NULL DEFAULT 0,
    created_at DATETIME
);

CREATE TABLE wnv(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nieve VARCHAR(180) NOT NULL,
    product_id INT(11) NOT NULL,
    sucursal_id INT(11) NOT NULL,
    ventas INT(11) NOT NULL DEFAULT 0,
    created_at DATETIME
);

CREATE TABLE wdv(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    decoracion VARCHAR(180) NOT NULL,
    product_id INT(11) NOT NULL,
    sucursal_id INT(11) NOT NULL,
    ventas INT(11) NOT NULL DEFAULT 0,
    created_at DATETIME
);

CREATE TABLE wciuv(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    ingrediente_unt VARCHAR(180) NOT NULL,
    product_id INT(11) NOT NULL,
    sucursal_id INT(11) NOT NULL,
    ventas INT(11) NOT NULL DEFAULT 0,
    created_at DATETIME
);

CREATE TABLE wcicv(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    ingrediente_com VARCHAR(180) NOT NULL,
    product_id INT(11) NOT NULL,
    sucursal_id INT(11) NOT NULL,
    ventas INT(11) NOT NULL DEFAULT 0,
    created_at DATETIME
);

CREATE TABLE wcnv(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nieve VARCHAR(180) NOT NULL,
    product_id INT(11) NOT NULL,
    sucursal_id INT(11) NOT NULL,
    ventas INT(11) NOT NULL DEFAULT 0,
    created_at DATETIME
);

CREATE TABLE wcdv(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    decoracion VARCHAR(180) NOT NULL,
    product_id INT(11) NOT NULL,
    sucursal_id INT(11) NOT NULL,
    ventas INT(11) NOT NULL DEFAULT 0,
    created_at DATETIME
);

CREATE TABLE bfv(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    bebida VARCHAR(180) NOT NULL,
    descripcion VARCHAR(180) NOT NULL,
    product_id INT(11) NOT NULL,
    sucursal_id INT(11) NOT NULL,
    ventas INT(11) NOT NULL DEFAULT 0,
    created_at DATETIME
);

CREATE TABLE bcv(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    bebida VARCHAR(180) NOT NULL,
    descripcion VARCHAR(180) NOT NULL,
    product_id INT(11) NOT NULL,
    sucursal_id INT(11) NOT NULL,
    ventas INT(11) NOT NULL DEFAULT 0,
    created_at DATETIME
);

ALTER TABLE cdthv ADD factura_id INT(11) NOT NULL;
ALTER TABLE cdiuv ADD factura_id INT(11) NOT NULL;
ALTER TABLE cdicv ADD factura_id INT(11) NOT NULL;
ALTER TABLE cdnv ADD factura_id INT(11) NOT NULL;
ALTER TABLE cddv ADD factura_id INT(11) NOT NULL;
ALTER TABLE csipv ADD factura_id INT(11) NOT NULL;
ALTER TABLE csibv ADD factura_id INT(11) NOT NULL;
ALTER TABLE csabv ADD factura_id INT(11) NOT NULL;
ALTER TABLE csav ADD factura_id INT(11) NOT NULL;
ALTER TABLE cseiv ADD factura_id INT(11) NOT NULL;
ALTER TABLE csbv ADD factura_id INT(11) NOT NULL;
ALTER TABLE wiuv ADD factura_id INT(11) NOT NULL;
ALTER TABLE wicv ADD factura_id INT(11) NOT NULL;
ALTER TABLE wnv ADD factura_id INT(11) NOT NULL;
ALTER TABLE wdv ADD factura_id INT(11) NOT NULL;
ALTER TABLE wciuv ADD factura_id INT(11) NOT NULL;
ALTER TABLE wcicv ADD factura_id INT(11) NOT NULL;
ALTER TABLE wcnv ADD factura_id INT(11) NOT NULL;
ALTER TABLE wcdv ADD factura_id INT(11) NOT NULL;
ALTER TABLE bfv ADD factura_id INT(11) NOT NULL;
ALTER TABLE bcv ADD factura_id INT(11) NOT NULL;


ALTER TABLE cdthv ADD adminId INT(11) NOT NULL;
ALTER TABLE cdiuv ADD adminId INT(11) NOT NULL;
ALTER TABLE cdicv ADD adminId INT(11) NOT NULL;
ALTER TABLE cdnv ADD adminId INT(11) NOT NULL;
ALTER TABLE cddv ADD adminId INT(11) NOT NULL;
ALTER TABLE csipv ADD adminId INT(11) NOT NULL;
ALTER TABLE csibv ADD adminId INT(11) NOT NULL;
ALTER TABLE csabv ADD adminId INT(11) NOT NULL;
ALTER TABLE csav ADD adminId INT(11) NOT NULL;
ALTER TABLE cseiv ADD adminId INT(11) NOT NULL;
ALTER TABLE csbv ADD adminId INT(11) NOT NULL;
ALTER TABLE wiuv ADD adminId INT(11) NOT NULL;
ALTER TABLE wicv ADD adminId INT(11) NOT NULL;
ALTER TABLE wnv ADD adminId INT(11) NOT NULL;
ALTER TABLE wdv ADD adminId INT(11) NOT NULL;
ALTER TABLE wciuv ADD adminId INT(11) NOT NULL;
ALTER TABLE wcicv ADD adminId INT(11) NOT NULL;
ALTER TABLE wcnv ADD adminId INT(11) NOT NULL;
ALTER TABLE wcdv ADD adminId INT(11) NOT NULL;
ALTER TABLE bfv ADD adminId INT(11) NOT NULL;
ALTER TABLE bcv ADD adminId INT(11) NOT NULL;

