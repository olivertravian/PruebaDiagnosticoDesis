--DROP FUNCTION IF EXISTS sp_verificar_producto(varchar);

CREATE OR REPLACE FUNCTION sp_verificar_producto(p_codigo VARCHAR(15))
RETURNS INT AS $$
DECLARE 
    existe INT;
BEGIN
    SELECT COUNT(*) INTO existe FROM productos WHERE codigo = p_codigo;
    
    IF existe > 0 THEN
        RETURN 1; 
    ELSE
        RETURN 0;
    END IF;
END;
$$ LANGUAGE plpgsql;


--DROP FUNCTION IF EXISTS sp_insertar_producto(varchar, varchar, int4, int4, int4, numeric, text, bool, bool, bool, bool, bool);

CREATE OR REPLACE FUNCTION sp_insertar_producto(
    p_codigo VARCHAR(15),
    p_nombre VARCHAR(50),
    p_bodega_id INTEGER,
    p_sucursal_id INTEGER,
    p_moneda_id INTEGER,
    p_precio DECIMAL(10,2),
    p_descripcion TEXT,
    p_plastico BOOLEAN,
    p_metal BOOLEAN,
    p_madera BOOLEAN,
    p_vidrio BOOLEAN,
    p_textil BOOLEAN
) RETURNS TEXT AS $$
BEGIN
    INSERT INTO productos (codigo, nombre, bodega_id, sucursal_id, moneda_id, precio, descripcion, plastico, metal, madera, vidrio, textil)
    VALUES (p_codigo, p_nombre, p_bodega_id, p_sucursal_id, p_moneda_id, p_precio, p_descripcion, p_plastico, p_metal, p_madera, p_vidrio, p_textil);
    
    RETURN 'Producto registrado correctamente.';
END;
$$ LANGUAGE plpgsql;
