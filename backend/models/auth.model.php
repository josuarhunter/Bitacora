<?php
require_once '../config/conexion.php';

class UsuarioModel {
    private $conexion;

    public function __construct($conexion) {
        $this->conexion = $conexion;
    }

    public function getUserByNombreUsuario($nombre_usuario) {
        $query = "SELECT u.*, t.tipo_usuario FROM usuario u INNER JOIN tipo_usuario t ON u.fo_tipo_usuario = t.id_tipo_usuario WHERE u.nombre_usuario = ? AND u.estado = 'habilitado'";
        $stmt = mysqli_prepare($this->conexion, $query);
        if ($stmt === false) {
            return false;
        }

        mysqli_stmt_bind_param($stmt, "s", $nombre_usuario);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);

        if ($result && mysqli_num_rows($result) > 0) {
            return mysqli_fetch_assoc($result);
        } else {
            return false;
        }
    }
}
?>
