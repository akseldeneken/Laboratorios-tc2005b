-- LABORATORIO 15 - TC2005B A01711966 Aksel Deneken

CREATE DATABASE IF NOT EXISTS gestion_entregas;
USE gestion_entregas;

CREATE TABLE Materiales (
    Clave INT PRIMARY KEY,
    Descripcion VARCHAR(255),
    Costo DECIMAL(10,2)
);

CREATE TABLE Proveedores (
    RFC VARCHAR(13) PRIMARY KEY,
    RazonSocial VARCHAR(255)
);

CREATE TABLE Proyectos (
    Numero INT PRIMARY KEY,
    Denominacion VARCHAR(255)
);

CREATE TABLE Entregan (
    Clave INT,
    RFC VARCHAR(13),
    Numero INT,
    Fecha DATE,
    Cantidad INT,
    PRIMARY KEY (Clave, RFC, Numero, Fecha),
    FOREIGN KEY (Clave) REFERENCES Materiales(Clave),
    FOREIGN KEY (RFC) REFERENCES Proveedores(RFC),
    FOREIGN KEY (Numero) REFERENCES Proyectos(Numero)
);

INSERT INTO Materiales (Clave, Descripcion, Costo) VALUES
(1, 'Cemento gris 50kg', 120.00),
(2, 'Varilla 3/8"', 95.50),
(3, 'Ladrillo rojo', 2.30);

INSERT INTO Proveedores (RFC, RazonSocial) VALUES
('ABC1234567890', 'Materiales ABC S.A. de C.V.'),
('DEF0987654321', 'Proveedora DEF S.A.'),
('GHI5678901234', 'ConstruMarket GHI');

INSERT INTO Proyectos (Numero, Denominacion) VALUES
(101, 'Construcción Escuela'),
(102, 'Ampliación Hospital'),
(103, 'Pavimentación Calle Principal');

INSERT INTO Entregan (Clave, RFC, Numero, Fecha, Cantidad) VALUES
(1, 'ABC1234567890', 101, '2025-06-01', 50),
(2, 'DEF0987654321', 102, '2025-06-02', 100),
(1, 'ABC1234567890', 101, '2025-06-03', 25),
(3, 'GHI5678901234', 103, '2025-06-04', 1000);

SELECT 
    e.Fecha,
    p.RazonSocial AS Proveedor,
    m.Descripcion AS Material,
    pr.Denominacion AS Proyecto,
    e.Cantidad
FROM Entregan e
JOIN Proveedores p ON e.RFC = p.RFC
JOIN Materiales m ON e.Clave = m.Clave
JOIN Proyectos pr ON e.Numero = pr.Numero
ORDER BY e.Fecha;
