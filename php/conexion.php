<?php
$host = "localhost"; // Servidor donde corre PostgreSQL
$dbname = "registro_productos"; // Nombre de la base de datos
$user = "postgres"; // Usuario de de la base de datos
$password = "Ilover321"; // Remplazar con contraseña de la base de datos

try {
    $conn = new PDO("pgsql:host=$host;dbname=$dbname", $user, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

} catch (PDOException $e) {
    die("❌ Error en la conexión: " . $e->getMessage());
}
?>
