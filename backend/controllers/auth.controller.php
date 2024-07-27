<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once '../vendor/autoload.php';
require_once '../models/auth.model.php';
use \Firebase\JWT\JWT;

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    if (isset($data['nombre_usuario']) && isset($data['contraseña'])) {
        $nombre_usuario = $data['nombre_usuario'];
        $contraseña = $data['contraseña']; 

        $usuarioModel = new UsuarioModel($conexion);
        $user = $usuarioModel->getUserByNombreUsuario($nombre_usuario);

        if ($user) {
            if (password_verify($contraseña, $user['contraseña'])) {
                $token = generateJWT($user['id_usuario'], $nombre_usuario, $user['tipo_usuario']);
                echo json_encode(['token' => $token]);
                http_response_code(200);
            } else {
                echo json_encode(['error' => 'Contraseña incorrecta']);
                http_response_code(401);
            }
        } else {
            echo json_encode(['error' => 'Usuario no encontrado o deshabilitado']);
            http_response_code(404);
        }
    } else {
        echo json_encode(['error' => 'Faltan parámetros requeridos']);
        http_response_code(400);
    }
}

function generateJWT($id_usuario, $nombre_usuario, $tipo_usuario) {
    $secretKey = 'sopademacaco';
    if (!$secretKey) {
        echo json_encode(['error' => 'Clave secreta no encontrada']);
        http_response_code(500);
        exit();
    }

    $payload = array(
        'id_usuario' => $id_usuario,
        'nombre_usuario' => $nombre_usuario,
        'tipo_usuario' => $tipo_usuario,
        'exp' => time() + 43200
    );

    return JWT::encode($payload, $secretKey, 'HS256');
}
?>
