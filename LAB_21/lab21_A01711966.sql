-- LABORATORIO 21 - CONSULTAS CON FUNCIONES AGREGADAS Y SUBCONSULTAS
-- Autor: Aksel Deneken

-- 1. Suma de cantidades e importe total de todas las entregas realizadas durante 1997
SELECT 
    SUM(e.Cantidad) AS TotalCantidad, 
    SUM(e.Cantidad * m.Costo * (1 + m.PorcentajeImpuesto)) AS ImporteTotal
FROM Entregan e
JOIN Materiales m ON e.Clave = m.Clave
WHERE YEAR(e.Fecha) = 1997;

-- 2. Por proveedor: razón social, número de entregas e importe total
SELECT 
    p.RazonSocial, 
    COUNT(*) AS NumEntregas, 
    SUM(e.Cantidad * m.Costo * (1 + m.PorcentajeImpuesto)) AS ImporteTotal
FROM Entregan e
JOIN Proveedores p ON e.RFC = p.RFC
JOIN Materiales m ON e.Clave = m.Clave
GROUP BY p.RazonSocial;

-- 3. Por cada material con promedio > 400, obtener estadísticas
SELECT 
    m.Clave, m.Descripcion, 
    SUM(e.Cantidad) AS TotalEntregada,
    MIN(e.Cantidad) AS MinEntregada,
    MAX(e.Cantidad) AS MaxEntregada,
    SUM(e.Cantidad * m.Costo * (1 + m.PorcentajeImpuesto)) AS ImporteTotal
FROM Entregan e
JOIN Materiales m ON e.Clave = m.Clave
GROUP BY m.Clave, m.Descripcion
HAVING AVG(e.Cantidad) > 400;

-- 4. Por proveedor, cantidad promedio de cada material entregado (si promedio >= 500)
SELECT 
    p.RazonSocial, m.Clave, m.Descripcion, 
    AVG(e.Cantidad) AS Promedio
FROM Entregan e
JOIN Proveedores p ON e.RFC = p.RFC
JOIN Materiales m ON e.Clave = m.Clave
GROUP BY p.RazonSocial, m.Clave, m.Descripcion
HAVING AVG(e.Cantidad) >= 500;

-- 5. Mismos datos que anterior pero 2 grupos: <370 y >450
SELECT 
    p.RazonSocial, m.Clave, m.Descripcion, 
    AVG(e.Cantidad) AS Promedio, 
    CASE 
        WHEN AVG(e.Cantidad) < 370 THEN 'Grupo A (<370)' 
        WHEN AVG(e.Cantidad) > 450 THEN 'Grupo B (>450)' 
    END AS Grupo
FROM Entregan e
JOIN Proveedores p ON e.RFC = p.RFC
JOIN Materiales m ON e.Clave = m.Clave
GROUP BY p.RazonSocial, m.Clave, m.Descripcion
HAVING AVG(e.Cantidad) < 370 OR AVG(e.Cantidad) > 450;

-- 6. Insertar 5 nuevos materiales
INSERT INTO Materiales VALUES 
('M010', 'Arena Gruesa', 100.00, 0.16),
('M011', 'Arena Fina', 120.00, 0.16),
('M012', 'Cemento Blanco', 210.00, 0.16),
('M013', 'Ladrillo Rojo', 150.00, 0.16),
('M014', 'Yeso', 80.00, 0.16);

-- 7. Materiales nunca entregados
SELECT Clave, Descripcion 
FROM Materiales 
WHERE Clave NOT IN (SELECT Clave FROM Entregan);

-- 8. Proveedores que entregaron a 'Vamos México' y 'Querétaro Limpio'
SELECT RazonSocial
FROM Proveedores
WHERE RFC IN (
    SELECT RFC FROM Entregan WHERE Numero IN (
        SELECT Numero FROM Proyectos WHERE Denominacion = 'Vamos México'
    )
    INTERSECT
    SELECT RFC FROM Entregan WHERE Numero IN (
        SELECT Numero FROM Proyectos WHERE Denominacion = 'Querétaro Limpio'
    )
);

-- 9. Materiales nunca entregados a 'CIT Yucatán'
SELECT Descripcion 
FROM Materiales 
WHERE Clave NOT IN (
    SELECT Clave FROM Entregan WHERE Numero = (
        SELECT Numero FROM Proyectos WHERE Denominacion = 'CIT Yucatán'
    )
);

-- 10. Proveedores con promedio mayor al de VAGO780901
SELECT p.RazonSocial, AVG(e.Cantidad) AS Promedio
FROM Entregan e
JOIN Proveedores p ON e.RFC = p.RFC
GROUP BY p.RazonSocial
HAVING AVG(e.Cantidad) > (
    SELECT AVG(Cantidad) FROM Entregan WHERE RFC = 'VAGO780901'
);

-- 11. Proveedores con entregas mayores en 2000 que en 2001 para 'Infonavit Durango'
SELECT DISTINCT p.RFC, p.RazonSocial
FROM Proveedores p
JOIN Entregan e ON p.RFC = e.RFC
WHERE e.Numero = (
    SELECT Numero FROM Proyectos WHERE Denominacion = 'Infonavit Durango'
)
GROUP BY p.RFC, p.RazonSocial
HAVING 
    SUM(CASE WHEN YEAR(e.Fecha) = 2000 THEN e.Cantidad ELSE 0 END) >
    SUM(CASE WHEN YEAR(e.Fecha) = 2001 THEN e.Cantidad ELSE 0 END);
