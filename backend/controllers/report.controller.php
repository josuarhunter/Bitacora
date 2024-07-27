<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");

require_once '../config/conexion.php';
require '../models/report.model.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    $fecha_inicial = $input['fecha_inicial'] ?? null;
    $fecha_final = $input['fecha_final'] ?? null;

    $reportModel = new ReportModel($conexion);
    $cases = $reportModel->obtenerReportes($fecha_inicial, $fecha_final);

    echo json_encode($cases);

    $conexion->close();
} else {
    echo json_encode(["error" => "Método no permitido"]);
}
?>
