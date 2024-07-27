<?php
require_once '../config/conexion.php';

class CaseModel {
    private $conexion;

    public function __construct($conexion) {
        $this->conexion = $conexion;
    }

    public function getCases($no_identificacion, $tipo_identificacion, $fecha_inicial = null, $fecha_final = null) {
        $query =  "SELECT rs.*, 
                         c.*, 
                         ts.tipoSolicitud AS tipo_solicitud, 
                         ap.aplicacion AS aplicacion, 
                         es.estado_caso AS estado_caso, 
                         us.nombres AS usuario
                  FROM registro_solicitud rs 
                  JOIN registro_solicitud_cliente rsc ON rs.id_registroSolicitud = rsc.id_registroSolicitud
                  JOIN cliente c ON c.id_cliente = rsc.id_cliente
                  LEFT JOIN tipo_solicitud ts ON rs.fo_tipo_solicitud = ts.id_tipoSolicitud
                  LEFT JOIN aplicacion ap ON rs.fo_aplicacion = ap.id_aplicacion
                  LEFT JOIN estado_caso es ON rs.fo_estado_caso = es.id_estado_caso
                  LEFT JOIN usuario us ON rs.fo_usuario = us.id_usuario
                  WHERE ";

        if ($tipo_identificacion == '1') {
            $query .= "c.identidad_cliente = ?";
        } elseif ($tipo_identificacion == '2') {
            $query .= "c.cedula_cliente = ?";
        }

        if (!empty($fecha_inicial)) {
            $query .= " AND rs.fecha_registro >= ?";
        }

        if (!empty($fecha_final)) {
            $query .= " AND rs.fecha_registro <= ?";
        }

        $stmt = $this->conexion->prepare($query);

        if ($stmt === false) {
            die('Prepare failed: ' . htmlspecialchars($this->conexion->error));
        }

        $bindTypes = '';
        $bindParams = [];

        if ($tipo_identificacion == '1' || $tipo_identificacion == '2') {
            $bindTypes .= 's';
            $bindParams[] = $no_identificacion;
        }

        if (!empty($fecha_inicial)) {
            $bindTypes .= 's';
            $bindParams[] = $fecha_inicial;
        }

        if (!empty($fecha_final)) {
            $bindTypes .= 's';
            $bindParams[] = $fecha_final;
        }

        if (!empty($bindParams)) {
            $stmt->bind_param($bindTypes, ...$bindParams);
        }

        $stmt->execute();
        $result = $stmt->get_result();

        $cases = [];
        while ($row = $result->fetch_assoc()) {
            $cases[] = $row;
        }

        $stmt->close();
        return $cases;
    }
}
?>
