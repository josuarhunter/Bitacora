<?php
// Permitir solicitudes desde cualquier origen
header("Access-Control-Allow-Origin: *");
// Permitir métodos HTTP específicos
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
// Permitir encabezados específicos
header("Access-Control-Allow-Headers: Content-Type, Authorization");

header('Content-Type: application/json');
require '../config/conexion.php';

try {
    // Verifica errores de conexión
    if (mysqli_connect_errno()) {
        throw new Exception("No se pudo conectar a la base de datos: " . mysqli_connect_error());
    }

    // Consulta para obtener los últimos 5 usuarios creados
    $query = "SELECT * FROM usuario ORDER BY id_usuario DESC LIMIT 5";
    $result = mysqli_query($conexion, $query);

    if (!$result) {
        throw new Exception("La consulta de la base de datos falló: " . mysqli_error($conexion));
    }

    // Obtener todos los resultados como un array asociativo
    $usuarios = mysqli_fetch_all($result, MYSQLI_ASSOC);

    // Liberar el resultado
    mysqli_free_result($result);

    echo json_encode($usuarios);
} catch (Exception $e) {
    // Manejo de errores
    echo json_encode(['error' => $e->getMessage()]);
} finally {
    // Cerrar la conexión
    mysqli_close($conexion);
}
?>