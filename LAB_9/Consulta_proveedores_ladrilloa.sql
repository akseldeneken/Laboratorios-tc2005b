SELECT m.Descripcion, p.RazonSocial, pr.Denominacion, e.Fecha, e.Cantidad
FROM entregan e
JOIN materiales m ON e.Clave = m.Clave
JOIN proveedores p ON e.RFC = p.RFC
JOIN proyectos pr ON e.Numero = pr.Numero
WHERE m.Descripcion LIKE '%Pintura%'
  AND YEAR(e.Fecha) = 1998;
