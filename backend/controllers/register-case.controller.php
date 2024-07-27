<?php
/* Configurar encabezados para permitir solicitudes desde cualquier origen y métodos específicos */
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once '../models/register-case.model.php';
require_once '../utils/jwt_utils.php'; 

// Manejar solicitud OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Obtener el token JWT de la cabecera Authorization
    $headers = getallheaders();
    if (!isset($headers['Authorization'])) {
        http_response_code(401);
        echo json_encode(["error" => "No autorizado"]);
        exit();
    }

    $authHeader = $headers['Authorization'];
    list($jwt) = sscanf($authHeader, 'Bearer %s');

    // Decodificar el token JWT
    $decoded = getJWTData($jwt);
    if (!$decoded || !isset($decoded['id_usuario'])) {
        http_response_code(401);
        echo json_encode(["error" => "Token inválido"]);
        exit();
    }

    $id_usuario = $decoded['id_usuario'];
    $input = json_decode(file_get_contents('php://input'), true);

    if (!empty($input)) {
        // Agregar id_usuario al array de datos
        $input['id_usuario'] = $id_usuario;

        // Crear instancia del modelo
        $caseModel = new CaseModel($conexion);

        // Insertar caso
        $caso_id = $caseModel->insertCase($input);
        if ($caso_id) {
            // Insertar clientes y relaciones en la tabla intermedia
            foreach ($input['usuarios'] as $usuario) {
                $cliente_id = $caseModel->verifyClient($usuario['cedula']);
                if (!$cliente_id) {
                    $cliente_id = $caseModel->insertClient($usuario);
                }
                if ($cliente_id) {
                    $caseModel->insertCaseClientRelation($caso_id, $cliente_id);
                }
            }
            echo json_encode(["message" => "Registro exitoso"]);
        } else {
            echo json_encode(["error" => "Error al registrar el caso"]);
        }
    } else {
        echo json_encode(["error" => "Datos no válidos"]);
    }
} else {
    echo json_encode(["error" => "Método no permitido"]);
}
?>
