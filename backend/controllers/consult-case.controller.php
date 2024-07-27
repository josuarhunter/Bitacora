<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");

require_once '../models/consult-case.model.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    if (isset($input['no_identificacion']) && isset($input['tipo_identificacion'])) {
        $no_identificacion = $input['no_identificacion'];
        $tipo_identificacion = $input['tipo_identificacion'];
        $fecha_inicial = $input['fecha_inicial'] ?? null;
        $fecha_final = $input['fecha_final'] ?? null;

        $caseModel = new CaseModel($conexion);
        $cases = $caseModel->getCases($no_identificacion, $tipo_identificacion, $fecha_inicial, $fecha_final);

        echo json_encode($cases);
        http_response_code(200);
    } else {
        echo json_encode(["error" => "Faltan parámetros requeridos"]);
        http_response_code(400);
    }
} else {
    echo json_encode(["error" => "Método no permitido"]);
    http_response_code(405);
}
?>
