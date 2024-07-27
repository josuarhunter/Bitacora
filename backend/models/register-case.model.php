<?php
require_once '../config/conexion.php';

class CaseModel {
    private $conexion;

    public function __construct($conexion) {
        $this->conexion = $conexion;
    }

    // Insertar un nuevo caso en la base de datos
    public function insertCase($data) {
        $fecha_registro = date('Y-m-d H:i:s');
        $stmt_caso = $this->conexion->prepare("INSERT INTO registro_solicitud 
            (no_caso, fo_tipo_solicitud, cantidad_usuarios, fo_aplicacion, fo_herramienta, fo_estado_caso, fo_turno, 
            cantidad_aplicaciones, fo_lider, fo_grupo_resolutor, id_tarea, observaciones, fecha_registro, fo_usuario) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

        $stmt_caso->bind_param("ssiisssiissssi", $data['no_caso'], $data['tipo_solicitud'], $data['cantidad_usuarios'], 
            $data['aplicacion'], $data['herramienta'], $data['estado_caso'], $data['turno'], $data['cantidad_aplicaciones'], 
            $data['lider'], $data['grupo_resolutor'], $data['id_tarea'], $data['observaciones'], $fecha_registro, $data['id_usuario']);

        if ($stmt_caso->execute()) {
            $caso_id = $stmt_caso->insert_id;
            $stmt_caso->close();
            return $caso_id;
        } else {
            $stmt_caso->close();
            return false;
        }
    }

    // Insertar un nuevo cliente en la base de datos
    public function insertClient($usuario) {
        $stmt_cliente = $this->conexion->prepare("INSERT INTO cliente (cedula_cliente, identidad_cliente, nombres_cliente, apellidos_cliente) VALUES (?, ?, ?, ?)");
        $stmt_cliente->bind_param("isss", $usuario['cedula'], $usuario['identidad_cliente'], $usuario['nombres'], $usuario['apellidos']);

        if ($stmt_cliente->execute()) {
            $cliente_id = $stmt_cliente->insert_id;  // Asignar el ID del cliente insertado
            $stmt_cliente->close();
            return $cliente_id;  // Devolver el ID del cliente insertado
        } else {
            $stmt_cliente->close();
            return false;
        }
    }

    // Verificar si un cliente ya existe en la base de datos
    public function verifyClient($cedula) {
        $cliente_id = false;  // Inicializar $cliente_id como false por defecto

        $stmt_verificar_cliente = $this->conexion->prepare("SELECT id_cliente FROM cliente WHERE cedula_cliente = ?");
        $stmt_verificar_cliente->bind_param("i", $cedula);
        $stmt_verificar_cliente->execute();
        $stmt_verificar_cliente->store_result();

        if ($stmt_verificar_cliente->num_rows > 0) {
            $stmt_verificar_cliente->bind_result($cliente_id);
            $stmt_verificar_cliente->fetch();
        }

        $stmt_verificar_cliente->close();
        return $cliente_id;
    }

    // Insertar una relación entre un caso y un cliente en la tabla intermedia
    public function insertCaseClientRelation($caso_id, $cliente_id) {
        $stmt_relacion = $this->conexion->prepare("INSERT INTO registro_solicitud_cliente (id_registroSolicitud, id_cliente) VALUES (?, ?)");
        $stmt_relacion->bind_param("ii", $caso_id, $cliente_id);
        $stmt_relacion->execute();
        $stmt_relacion->close();
    }
}
?>
