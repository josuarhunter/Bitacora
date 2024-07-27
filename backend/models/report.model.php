<?php
class ReportModel {
    private $conexion;

    public function __construct($conexion) {
        $this->conexion = $conexion;
    }

    public function obtenerReportes($fecha_inicial, $fecha_final) {
        $query = "SELECT rs.*, 
                         c.*, 
                         ts.tipoSolicitud AS tipo_solicitud, 
                         ap.aplicacion AS aplicacion,
                         he.herramienta AS herramienta,  
                         es.estado_caso AS estado_caso,
                         gr.grupo_resolutor AS grupo_resolutor,  
                         us.nombres AS usuario
                  FROM registro_solicitud rs 
                  JOIN registro_solicitud_cliente rsc ON rs.id_registroSolicitud = rsc.id_registroSolicitud
                  JOIN cliente c ON c.id_cliente = rsc.id_cliente
                  LEFT JOIN tipo_solicitud ts ON rs.fo_tipo_solicitud = ts.id_tipoSolicitud
                  LEFT JOIN aplicacion ap ON rs.fo_aplicacion = ap.id_aplicacion
                  LEFT JOIN herramienta he ON rs.fo_herramienta = he.id_herramienta
                  LEFT JOIN estado_caso es ON rs.fo_estado_caso = es.id_estado_caso
                  LEFT JOIN grupo_resolutor gr ON rs.fo_grupo_resolutor = gr.id_grupo_resolutor
                  LEFT JOIN usuario us ON rs.fo_usuario = us.id_usuario
                  WHERE 1 = 1";

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
