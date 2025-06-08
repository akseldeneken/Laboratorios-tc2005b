-- Aksel Deneken A01711966

-- Preguntas y respuestas sobre triggers:
--
-- ¿Qué utilidad tiene un trigger (ventajas)?
-- Un trigger permite ejecutar automáticamente una acción cuando ocurre un evento en una tabla (como una inserción, actualización o eliminación).
-- Ventajas principales:
--   - Aplica reglas de negocio automáticamente.
--   - Mantiene integridad de los datos sin necesidad de que lo controle la aplicación.
--   - Reduce errores humanos al automatizar procesos.
--
-- ¿Tipos de triggers?
-- En MySQL los principales tipos son:
--   - BEFORE INSERT
--   - AFTER INSERT
--   - BEFORE UPDATE
--   - AFTER UPDATE
--   - BEFORE DELETE
--   - AFTER DELETE
--
-- ¿En qué casos NO son de utilidad?
--   - Cuando las reglas de negocio cambian con frecuencia (es mejor mantenerlas en la lógica de aplicación).
--   - Cuando afectan el rendimiento (porque ejecutan lógica extra cada vez que ocurre un evento).
--   - Si complican el debugging al tener efectos invisibles que no están en el código de aplicación.

-- Trigger 1: Registrar cada ataque en log_ataques automáticamente
DELIMITER //

CREATE TRIGGER log_ataque
AFTER INSERT ON turnos
FOR EACH ROW
BEGIN
  INSERT INTO log_ataques (jugador, coordenada_x, coordenada_y, fecha)
  VALUES (NEW.jugador, NEW.x, NEW.y, NOW());
END;
//

DELIMITER ;

-- Trigger 2: Prevenir que un jugador ataque dos veces seguidas
DELIMITER //

CREATE TRIGGER evitar_turno_duplicado
BEFORE INSERT ON turnos
FOR EACH ROW
BEGIN
  DECLARE ultimoJugador INT;

  SELECT jugador INTO ultimoJugador
  FROM turnos
  ORDER BY id DESC
  LIMIT 1;

  IF ultimoJugador = NEW.jugador THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'No puedes atacar dos veces seguidas';
  END IF;
END;
//

DELIMITER ;
