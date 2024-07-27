<?php
    $servidor = "localhost";
    $usuario = "root";
    $clave = "";
    $bd = "bitacora";

    $conexion = mysqli_connect($servidor, $usuario, $clave, $bd) or die('No se encontro el servidor');
    mysqli_select_db($conexion, $bd) or die ('no se encontro la base de datos');
    mysqli_set_charset($conexion, "utf8");
    /* echo "se conecto correctamente"; */  
?>