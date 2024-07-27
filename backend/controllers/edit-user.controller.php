<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json');

// Manejar solicitud OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit();
}

require_once '../models/edit-user.model.php';

// Leer y decodificar datos de la solicitud
$data = json_decode(file_get_contents("php://input"), true);
file_put_contents('php://stderr', print_r($data, true));  // Para verificar los datos en los logs del servidor

// Validar datos recibidos
if (!isset($data['id_usuario'])) {
    response(false, "Datos incompletos: falta id_usuario");
    exit();
}

$id_usuario = $data['id_usuario'];

// Definir los campos permitidos y sus tipos
$fields = [
    'nombres' => 's',
    'apellidos' => 's',
    'tipo_documento' => 's',
    'no_identificacion' => 's',
    'correo' => 's',
    'fo_tipo_usuario' => 'i',
    'nombre_usuario' => 's',
    'estado' => 's',
    'contraseña' => 's'
];

$fields_to_update = [];
$params = [];
$param_types = '';

// Preparar los campos a actualizar
foreach ($fields as $field => $type) {
    if (isset($data[$field]) && $data[$field] !== '') {
        $fields_to_update[] = "$field = ?";
        $params[] = $data[$field];
        $param_types .= $type;
    }
}

if (count($fields_to_update) === 0) {
    response(false, "No se proporcionaron campos para actualizar");
    exit();
}

$params[] = $id_usuario;
$param_types .= 'i';

// Crear instancia del modelo y actualizar el usuario
$userModel = new UserModel($conexion);
$response = $userModel->updateUser($id_usuario, $fields_to_update, $params, $param_types);

echo json_encode($response);

// Función para manejar respuestas
function response($success, $error = null) {
    $response = ["success" => $success];
    if ($error) {
        $response["error"] = $error;
    }
    echo json_encode($response);
    exit();
}
?>
