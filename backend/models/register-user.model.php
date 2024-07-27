<?php
class UsuarioModel {
    private $conexion;

    public function __construct($conexion) {
        $this->conexion = $conexion;
    }

    public function incrementarNumerador() {
        $sql = "UPDATE NUMERADOR_USUARIO SET ULTIMO_NUMERO = ULTIMO_NUMERO + 1 WHERE TABLA = 'usuario'";
        return $this->conexion->query($sql);
    }

    public function obtenerNuevoID() {
        $sql = "SELECT ULTIMO_NUMERO FROM NUMERADOR_USUARIO WHERE TABLA = 'usuario'";
        $result = $this->conexion->query($sql);
        return $result->fetch_assoc()['ULTIMO_NUMERO'];
    }

    public function registrarUsuario($new_id, $nombres, $apellidos, $tipo_documento, $no_identificacion, $correo, $nombre_usuario, $contraseña, $tipo_usuario) {
        $sql = "INSERT INTO usuario (id_usuario, nombres, apellidos, tipo_documento, no_identificacion, correo, nombre_usuario, contraseña, fo_tipo_usuario) VALUES ('$new_id', '$nombres', '$apellidos', '$tipo_documento', '$no_identificacion', '$correo', '$nombre_usuario', '$contraseña', '$tipo_usuario')";
        return $this->conexion->query($sql);
    }
}
?>
