<?php
include 'conexion.php';

$tipo = $_GET['tipo'] ?? '';

if ($tipo == 'bodegas') {
    $sql = "SELECT * FROM bodegas";
} elseif ($tipo == 'monedas') {
    $sql = "SELECT * FROM monedas";
} elseif ($tipo == 'sucursales' && isset($_GET['bodega_id'])) {
    $bodega_id = intval($_GET['bodega_id']);
    $sql = "SELECT * FROM sucursales WHERE bodega_id = $bodega_id";
} else {
    echo json_encode([]);
    exit;
}

$stmt = $conn->prepare($sql);
$stmt->execute();
$resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($resultado);
?>
