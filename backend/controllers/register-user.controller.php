<?php
// Permitir solicitudes desde cualquier origen
header("Access-Control-Allow-Origin: *");
// Permitir métodos HTTP específicos
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
// Permitir encabezados específicos
header("Access-Control-Allow-Headers: Content-Type, Authorization");

header('Content-Type: application/json');
require '../config/conexion.php';
require '../models/register-user.model.php';

$data = json_decode(file_get_contents("php://input"), true);

$nombres = $conexion->real_escape_string($data['nombres']);
$apellidos = $conexion->real_escape_string($data['apellidos']);
$tipo_documento = $conexion->real_escape_string($data['tipo_documento']);
$no_identificacion = $conexion->real_escape_string($data['no_identificacion']);
$correo = $conexion->real_escape_string($data['correo']);
$nombre_usuario = $conexion->real_escape_string($data['nombre_usuario']);
$contraseña = $conexion->real_escape_string($data['contraseña']);
$tipo_usuario = $conexion->real_escape_string($data['tipo_usuario']);

$usuarioModel = new UsuarioModel($conexion);

try {
    // Iniciar transacción
    $conexion->begin_transaction();

    if ($usuarioModel->incrementarNumerador() === TRUE) {
        $new_id = $usuarioModel->obtenerNuevoID();

        if ($new_id !== null && $usuarioModel->registrarUsuario($new_id, $nombres, $apellidos, $tipo_documento, $no_identificacion, $correo, $nombre_usuario, $contraseña, $tipo_usuario) === TRUE) {
            // Confirmar transacción
            $conexion->commit();
            echo json_encode(["message" => "Usuario registrado exitosamente"]);
        } else {
            // Revertir transacción en caso de error
            $conexion->rollback();
            echo json_encode(["message" => "Error al registrar el usuario"]);
        }
    } else {
        // Revertir transacción en caso de error al actualizar el contador
        $conexion->rollback();
        echo json_encode(["message" => "Error al actualizar el contador"]);
    }

} catch (Exception $e) {
    // Manejo de excepciones y revertir transacción
    $conexion->rollback();
    echo json_encode(["message" => "Exception: " . $e->getMessage()]);
}

$conexion->close();
?>
