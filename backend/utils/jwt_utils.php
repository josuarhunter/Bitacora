<?php
require_once '../vendor/autoload.php';
use \Firebase\JWT\JWT;
use Firebase\JWT\Key;

/* funcion de decodificar token */
function getJWTData($token) {
  $secretKey = 'sopademacaco'; // Clave secreta
  try {
    $decoded = JWT::decode($token, new Key($secretKey, 'HS256'));
    return (array) $decoded;
  } catch (Exception $e) {
    return null;
  }
}
?>