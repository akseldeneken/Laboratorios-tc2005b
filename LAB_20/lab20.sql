-- LAB 20 SQL – Aksel Deneken

-- BASE DE DATOS Y TABLAS
CREATE DATABASE IF NOT EXISTS lab20_sql;
USE lab20_sql;

-- Tablas
CREATE TABLE Materiales (
  Clave INT PRIMARY KEY,
  Descripcion VARCHAR(100),
  Costo DECIMAL(10,2)
);

CREATE TABLE Proveedores (
  RFC VARCHAR(13) PRIMARY KEY,
  RazonSocial VARCHAR(100)
);

CREATE TABLE Proyectos (
  Numero INT PRIMARY KEY,
  Denominacion VARCHAR(100)
);

CREATE TABLE Entregan (
  Clave INT,
  RFC VARCHAR(13),
  Numero INT,
  Fecha DATE,
  Cantidad INT,
  FOREIGN KEY (Clave) REFERENCES Materiales(Clave),
  FOREIGN KEY (RFC) REFERENCES Proveedores(RFC),
  FOREIGN KEY (Numero) REFERENCES Proyectos(Numero)
);

-- Datos de prueba
INSERT INTO Materiales VALUES
(1000, 'Cemento gris', 120.00),
(1300, 'Tubo PVC', 50.00),
(1450, 'Arena fina', 30.00),
(1600, 'Acero reforzado', 200.00),
(2000, 'Cubrebocas', 5.00);

INSERT INTO Proveedores VALUES
('ACM010101AAA', 'Acme tools'),
('CEM020202BBB', 'Cemex'),
('CON030303CCC', 'Constructora Alfa'),
('PIP040404DDD', 'Proveedora Industrial');

INSERT INTO Proyectos VALUES
(5000, 'Televisa en acción'),
(5001, 'México sin ti no estamos completos'),
(5002, 'Educando en Coahuila');

INSERT INTO Entregan VALUES
(1000, 'ACM010101AAA', 5001, '2000-01-15', 300),
(1300, 'CEM020202BBB', 5001, '2000-03-10', 500),
(1450, 'ACM010101AAA', 5000, '2000-07-05', 150),
(1450, 'CEM020202BBB', 5001, '2000-09-01', 200),
(1450, 'ACM010101AAA', 5002, '2001-02-20', 400),
(1300, 'CEM020202BBB', 5002, '2001-04-18', 250),
(1600, 'CON030303CCC', 5001, '2001-06-30', 100),
(1000, 'PIP040404DDD', 5000, '1999-12-15', 120),
(2000, 'PIP040404DDD', 5001, '2002-01-01', 100);

-- ALTER TABLE para agregar impuestos
ALTER TABLE Materiales ADD PorcentajeImpuesto DECIMAL(6,2);
UPDATE Materiales SET PorcentajeImpuesto = (2 * Clave) / 1000;

-- Vistas
CREATE VIEW Vista_Materiales2000 AS
SELECT m.Descripcion
FROM Entregan e
JOIN Materiales m ON e.Clave = m.Clave
WHERE YEAR(e.Fecha) = 2000;

CREATE VIEW Vista_TotalesImpuesto AS
SELECT e.Clave, m.Descripcion, e.Cantidad, m.Costo, m.PorcentajeImpuesto,
       (e.Cantidad * m.Costo * (1 + m.PorcentajeImpuesto / 100)) AS ImporteTotal
FROM Entregan e
JOIN Materiales m ON e.Clave = m.Clave;

CREATE VIEW Vista_Entregas5000 AS
SELECT e.RFC, e.Numero
FROM Entregan e
WHERE e.Numero BETWEEN 5000 AND 5010;

CREATE VIEW Vista_LikeCu AS
SELECT * FROM Materiales
WHERE Descripcion LIKE 'Cu%';

-- CONSULTAS FINALES

-- 1. Materiales entregados al proyecto específico
SELECT m.Clave, m.Descripcion
FROM Entregan e
JOIN Proyectos p ON e.Numero = p.Numero
JOIN Materiales m ON e.Clave = m.Clave
WHERE p.Denominacion = 'México sin ti no estamos completos';

-- 2. Materiales del proveedor “Acme tools”
SELECT m.Clave, m.Descripcion
FROM Entregan e
JOIN Proveedores pr ON e.RFC = pr.RFC
JOIN Materiales m ON e.Clave = m.Clave
WHERE pr.RazonSocial = 'Acme tools';

-- 3. RFCs con promedio >= 300 en 2000
SELECT RFC
FROM Entregan
WHERE YEAR(Fecha) = 2000
GROUP BY RFC
HAVING AVG(Cantidad) >= 300;

-- 4. Total entregado por material en 2000
SELECT Clave, SUM(Cantidad) AS TotalEntregado
FROM Entregan
WHERE YEAR(Fecha) = 2000
GROUP BY Clave;

-- 5. Material más vendido en 2001
CREATE VIEW Vista_Entregas2001 AS
SELECT Clave, SUM(Cantidad) AS Total
FROM Entregan
WHERE YEAR(Fecha) = 2001
GROUP BY Clave;

SELECT Clave
FROM Vista_Entregas2001
ORDER BY Total DESC
LIMIT 1;
