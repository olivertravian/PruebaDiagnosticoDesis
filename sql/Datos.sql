INSERT INTO bodegas (nombre) VALUES ('Bodega Central'), ('Bodega Norte'), ('Bodega Sur');

INSERT INTO sucursales (nombre, bodega_id) VALUES 
    ('Sucursal 1', 1),
    ('Sucursal 2', 1),
    ('Sucursal 3', 2),
    ('Sucursal 4', 3);

INSERT INTO monedas (nombre) VALUES ('USD'), ('Euro'), ('Peso Chileno');