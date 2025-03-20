<?php
include 'conexion.php';

try {
    if ($_SERVER["REQUEST_METHOD"] !== "POST") {
        echo json_encode(["status" => "error", "message" => "Método no permitido"]);
        exit;
    }

    $codigo = $_POST['codigo'] ?? '';
    $nombre = $_POST['nombre'] ?? '';
    $bodega_id = $_POST['bodega'] ?? null;
    $sucursal_id = $_POST['sucursal'] ?? null;
    $moneda_id = $_POST['moneda'] ?? null;
    $precio = $_POST['precio'] ?? '';
    $descripcion = $_POST['descripcion'] ?? '';

    $plastico = isset($_POST["plastico"]) ? 'TRUE' : 'FALSE';
    $metal = isset($_POST["metal"]) ? 'TRUE' : 'FALSE';
    $madera = isset($_POST["madera"]) ? 'TRUE' : 'FALSE';
    $vidrio = isset($_POST["vidrio"]) ? 'TRUE' : 'FALSE';
    $textil = isset($_POST["textil"]) ? 'TRUE' : 'FALSE';

    // 1️⃣ Verificar si el código ya existe
    $sql_verificar = "SELECT sp_verificar_producto(:codigo)";
    $stmt_verificar = $conn->prepare($sql_verificar);
    $stmt_verificar->execute([':codigo' => $codigo]);
    $existe = $stmt_verificar->fetchColumn();

    if ($existe == 1) {
        echo json_encode(["status" => "error", "message" => "El código del producto ya está registrado."]);
        exit;
    }

    // 2️⃣ Insertar el producto si pasa la validación
    $sql_insertar = "SELECT sp_insertar_producto(:codigo, :nombre, :bodega, :sucursal, :moneda, :precio, :descripcion, :plastico, :metal, :madera, :vidrio, :textil)";
    
    $stmt_insertar = $conn->prepare($sql_insertar);
    $stmt_insertar->execute([
        ':codigo' => $codigo,
        ':nombre' => $nombre,
        ':bodega' => $bodega_id,
        ':sucursal' => $sucursal_id,
        ':moneda' => $moneda_id,
        ':precio' => $precio,
        ':descripcion' => $descripcion,
        ':plastico' => $plastico,
        ':metal' => $metal,
        ':madera' => $madera,
        ':vidrio' => $vidrio,
        ':textil' => $textil
    ]);

    $resultado = $stmt_insertar->fetchColumn();

    echo json_encode(["status" => "success", "message" => $resultado]);

} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => "Error en la base de datos: " . $e->getMessage()]);
}
?>