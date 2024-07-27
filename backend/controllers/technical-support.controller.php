<?php
// Permitir solicitudes desde cualquier origen
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require '../vendor/autoload.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

try {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $comentario = isset($_POST['comentario']) ? $_POST['comentario'] : '';
        $username = isset($_POST['username']) ? $_POST['username'] : '';
        $correo = isset($_POST['correo']) ? $_POST['correo'] : '';

        if (empty($comentario) || empty($username) || empty($correo)) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Todos los campos son obligatorios.']);
            exit();
        }

        // Configuración de PHPMailer
        $mail = new PHPMailer(true);

        try {
            // Configuración del servidor SMTP
            $mail->isSMTP();
            $mail->Host = 'smtp.resend.com'; // Reemplaza con tu servidor SMTP de Resend
            $mail->SMTPAuth = true;
            $mail->Username = 'resend'; // Reemplaza con tu usuario SMTP
            $mail->Password = 're_FKmxG8Ji_LRgTBkSo1yzP43UHPLsnTjZ1'; // Reemplaza con tu contraseña SMTP
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = 587; // O el puerto SMTP que uses

            // Configuración del remitente y destinatario
            $mail->setFrom('onboarding@resend.dev', 'Acme');
            $mail->addAddress('josuar4gil@gmail.com'); // Reemplaza con tu dirección de correo

            // Asunto y cuerpo del mensaje
            $mail->isHTML(true);
            $mail->Subject = 'Solicitud de soporte de: ' . $username;
            $mail->Body    = "<strong>Detalles de la solicitud de soporte: </strong><br>" . htmlspecialchars($comentario) . "<br><br>" . "Email de Contacto: " . htmlspecialchars($correo);

            // Manejo de subida de archivos
            foreach ($_FILES as $file) {
                if ($file['error'] === UPLOAD_ERR_OK) {
                    $mail->addAttachment($file['tmp_name'], $file['name']);
                }
            }

            $mail->send();
            echo json_encode(['status' => 'success', 'message' => 'Email sent successfully.']);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Email sending failed: ' . $mail->ErrorInfo]);
        }
    } else {
        http_response_code(405);
        echo json_encode(['status' => 'error', 'message' => 'Invalid request method.']);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Email sending failed: ' . $e->getMessage()]);
}
?>
