--PASO-1

CREATE TABLE bodegas (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

CREATE TABLE sucursales (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    bodega_id INT REFERENCES bodegas(id) ON DELETE CASCADE
);

CREATE TABLE monedas (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(15) UNIQUE NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    bodega_id INT NOT NULL,
    sucursal_id INT NOT NULL,
    moneda_id INT NOT NULL,
    precio DECIMAL(15,2) NOT NULL,
    descripcion TEXT NOT NULL,
    plastico BOOLEAN NOT NULL DEFAULT FALSE,
    metal BOOLEAN NOT NULL DEFAULT FALSE,
    madera BOOLEAN NOT NULL DEFAULT FALSE,
    vidrio BOOLEAN NOT NULL DEFAULT FALSE,
    textil BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (bodega_id) REFERENCES bodegas(id),
    FOREIGN KEY (sucursal_id) REFERENCES sucursales(id),
    FOREIGN KEY (moneda_id) REFERENCES monedas(id)
);