-- Aksel Deneken A01711966

-- ¿Qué desventajas identificas en la utilización de stored procedures?
-- Aunque los stored procedures ayudan a encapsular la lógica y mejorar el rendimiento, 
-- tienen algunas desventajas. Una es que pueden hacer que parte de la lógica del sistema 
-- esté encerrada en la base de datos, lo cual puede dificultar la portabilidad del sistema 
-- o la integración con otros entornos. También puede ser más complicado hacer control de 
-- versiones o debugging si todo está dentro del motor de base de datos, especialmente si 
--no hay buena documentación o nombres claros. Además, si se abusa de ellos, pueden volver el 
-- sistema menos flexible, especialmente si se requiere modificar procesos frecuentemente.


-- PROCEDURE 1: Agregar una nueva entrega
DELIMITER //
CREATE PROCEDURE AgregarEntrega(
    IN clave_material INT,
    IN rfc_proveedor VARCHAR(13),
    IN numero_proyecto INT,
    IN fecha_entrega DATE,
    IN cantidad_entregada DECIMAL(10,2)
)
BEGIN
    INSERT INTO Entregan (Clave, RFC, Numero, Fecha, Cantidad)
    VALUES (clave_material, rfc_proveedor, numero_proyecto, fecha_entrega, cantidad_entregada);
END;
//
DELIMITER ;

-- PROCEDURE 2: Consultar entregas por proveedor
DELIMITER //
CREATE PROCEDURE ConsultarEntregasProveedor(
    IN rfc_proveedor VARCHAR(13)
)
BEGIN
    SELECT m.Descripcion, e.Cantidad, e.Fecha
    FROM Entregan e
    JOIN Materiales m ON e.Clave = m.Clave
    WHERE e.RFC = rfc_proveedor;
END;
//
DELIMITER ;

-- PROCEDURE 3: Calcular importe total entregado por año
DELIMITER //
CREATE PROCEDURE CalcularImportePorAnio(
    IN anio_consulta INT
)
BEGIN
    SELECT 
        m.Descripcion,
        SUM(e.Cantidad * m.Costo * (1 + m.PorcentajeImpuesto / 100)) AS ImporteTotal
    FROM Entregan e
    JOIN Materiales m ON e.Clave = m.Clave
    WHERE YEAR(e.Fecha) = anio_consulta
    GROUP BY m.Descripcion;
END;
//
DELIMITER ;
