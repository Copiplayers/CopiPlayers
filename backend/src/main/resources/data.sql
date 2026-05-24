DELETE FROM jugador;
DELETE FROM equipo;

ALTER TABLE equipo ALTER COLUMN id RESTART WITH 1;
ALTER TABLE jugador ALTER COLUMN id RESTART WITH 1;

INSERT INTO equipo (id, nombre, ciudad, conferencia, anio_fundacion) VALUES
  (1, 'Real Madrid', 'Madrid', 'Liga Endesa', 1931),
  (2, 'Barca', 'Barcelona', 'Liga Endesa', 1926),
  (3, 'Unicaja', 'Malaga', 'Liga Endesa', 1977),
  (4, 'Valencia Basket', 'Valencia', 'Liga Endesa', 1986);

INSERT INTO jugador (id, nombre, posicion, dorsal, altura, equipo_id) VALUES
  (1, 'Facu Campazzo', 'Base', 7, 1.81, 1),
  (2, 'Mario Hezonja', 'Alero', 11, 2.02, 1),
  (3, 'Edy Tavares', 'Pivot', 22, 2.20, 1),
  (4, 'Tomas Satoransky', 'Base', 13, 2.01, 2),
  (5, 'Dario Brizuela', 'Escolta', 8, 1.88, 2),
  (6, 'Jan Vesely', 'Pivot', 6, 2.10, 2),
  (7, 'Alberto Diaz', 'Base', 9, 1.90, 3),
  (8, 'Tyler Kalinoski', 'Escolta', 4, 1.93, 3),
  (9, 'Olek Balcerowski', 'Pivot', 2, 2.16, 3),
  (10, 'Jean Montero', 'Base', 8, 1.88, 4),
  (11, 'Darius Thompson', 'Base', 13, 1.93, 4),
  (12, 'Yankuba Sima', 'Pivot', 77, 2.11, 4);

ALTER TABLE equipo ALTER COLUMN id RESTART WITH 5;
ALTER TABLE jugador ALTER COLUMN id RESTART WITH 13;
