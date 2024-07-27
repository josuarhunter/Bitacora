<?php
require_once '../config/conexion.php';

class UserModel {
    private $conexion;

    public function __construct($conexion) {
        $this->conexion = $conexion;
    }

    public function updateUser($id_usuario, $fields_to_update, $params, $param_types) {
        $sql = "UPDATE usuario SET " . implode(', ', $fields_to_update) . " WHERE id_usuario = ?";
        $stmt = $this->conexion->prepare($sql);

        if (!$stmt) {
            return ["success" => false, "error" => "Error preparando sentencia: " . $this->conexion->error];
        }

        $stmt->bind_param($param_types, ...$params);

        try {
            if ($stmt->execute()) {
                $stmt->close();
                return ["success" => true];
            } else {
                $stmt->close();
                return ["success" => false, "error" => $stmt->error];
            }
        } catch (Exception $e) {
            $stmt->close();
            return ["success" => false, "error" => $e->getMessage()];
        }
    }
}
?>
