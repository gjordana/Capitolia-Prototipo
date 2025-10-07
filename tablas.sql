--Capitolia.sql

CREATE TABLE Clientes (
    ClienteID INT PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL
);

CREATE TABLE Contactos (
    ContactoID INT PRIMARY KEY,
    ClienteID INT,
    Nombre VARCHAR(100) NOT NULL,
    Email VARCHAR(100),
    Telefono VARCHAR(15),
    ZonaID INT,
    Direccion VARCHAR(255),
    CompraServicios BIT NOT NULL,
    CompraProductos BIT NOT NULL,
    FOREIGN KEY (ClienteID) REFERENCES Clientes(ClienteID),
    FOREIGN KEY (ZonaID) REFERENCES Zonas(ZonaID)
);

CREATE TABLE Zonas (
    ZonaID INT PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL
);

CREATE TABLE Productos (
    ProductoID INT PRIMARY KEY,
    Codigo VARCHAR(50) NOT NULL UNIQUE,
    Nombre VARCHAR(100) NOT NULL,
    Descripcion TEXT,
    Foto VARBINARY(MAX),
    Stock INT NOT NULL,
    StockReservado INT NOT NULL,
    EsServicio BIT NOT NULL
);

CREATE TABLE NotasEnvios (
    NotaEnvioID INT PRIMARY KEY,
    ContactoID INT,
    Fecha DATETIME NOT NULL,
    FOREIGN KEY (ContactoID) REFERENCES Contactos(ContactoID)
);

CREATE Table NotasEnvios_Detalle (
    NotaEnvioDetalleID INT PRIMARY KEY,
    NotaEnvioID INT,
    ProductoID INT,
    Cantidad INT NOT NULL,
    FOREIGN KEY (NotaEnvioID) REFERENCES NotasEnvios(NotaEnvioID),
    FOREIGN KEY (ProductoID) REFERENCES Productos(ProductoID)
);

CREATE TABLE MovimientosStock (
    MovimientoID INT PRIMARY KEY,
    ProductoID INT,
    Cantidad INT NOT NULL,
    TipoMovimiento VARCHAR(50) NOT NULL,
    Fecha DATETIME NOT NULL,
    FOREIGN KEY (ProductoID) REFERENCES Productos(ProductoID)
);

CREATE TABLE OrdenesPedidos (
    OrdenPedidoID INT PRIMARY KEY,
    NotaEnvioID INT,
    Fecha DATETIME NOT NULL,
    FOREIGN KEY (NotaEnvioID) REFERENCES NotasEnvios(NotaEnvioID)
);

CREATE TABLE OrdenesPedidos_Detalle (
    OrdenPedidoDetalleID INT PRIMARY KEY,
    OrdenPedidoID INT,
    ProductoID INT,
    Cantidad INT NOT NULL,
    FOREIGN KEY (OrdenPedidoID) REFERENCES OrdenesPedidos(OrdenPedidoID),
    FOREIGN KEY (ProductoID) REFERENCES Productos(ProductoID)
);

CREATE TABLE PlanningEnvios (
    PlanningEnvioID INT PRIMARY KEY,
    Fecha DATETIME NOT NULL,
    OrdenPedidoID INT,
    ZonaID INT,
    FOREIGN KEY (OrdenPedidoID) REFERENCES OrdenesPedidos(OrdenPedidoID),
    FOREIGN KEY (ZonaID) REFERENCES Zonas(ZonaID)
);

CREATE TABLE Roles (
    RolID INT PRIMARY KEY,
    Nombre VARCHAR(50) NOT NULL UNIQUE,
    Descripcion TEXT
);

CREATE TABLE Usuarios (
    UsuarioID INT PRIMARY KEY,
    NombreUsuario VARCHAR(50) NOT NULL UNIQUE,
    Correo VARCHAR(100) NOT NULL UNIQUE,
    ContrasenaHash VARBINARY(64) NOT NULL,
    RolID INT NOT NULL,
    FOREIGN KEY (RolID) REFERENCES Roles(RolID
);