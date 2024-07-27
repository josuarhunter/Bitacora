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
    // Verifica que la conexión esté establecida correctamente
    if (mysqli_connect_errno()) {
        throw new Exception("No se pudo establecer la conexión a la base de datos: " . mysqli_connect_error());
    }

    if (isset($_GET['nombre_usuario'])) {
        $nombre_usuario = $_GET['nombre_usuario'];

        // Prepara la consulta
        $query = "SELECT * FROM usuario WHERE nombre_usuario = ?";
        $stmt = mysqli_prepare($conexion, $query);
        mysqli_stmt_bind_param($stmt, 's', $nombre_usuario);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);

        if (!$result) {
            throw new Exception("Error en la consulta de la base de datos: " . mysqli_error($conexion));
        }

        $usuario = mysqli_fetch_assoc($result);

        echo json_encode($usuario);
    } else {
        throw new Exception("No se proporcionó el nombre de usuario.");
    }
} catch (Exception $e) {
    // Manejo de errores
    echo json_encode(['error' => $e->getMessage()]);
} finally {
    // Cierre de la conexión
    mysqli_close($conexion);
}
?>