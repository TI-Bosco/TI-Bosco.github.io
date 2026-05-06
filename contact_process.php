<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Destinatario (Tu correo del colegio)
    $to = "sic.cdbosco@gmail.com"; 
    
    // Saneamiento de datos
    $name = strip_tags(trim($_POST["name"]));
    $phone = strip_tags(trim($_POST["phone"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $subject_msg = strip_tags(trim($_POST["subject"]));
    $message = trim($_POST["message"]);

    $email_subject = "Contacto Web: $subject_msg";
    
    $email_body = "Has recibido un nuevo mensaje desde el sitio web.\n\n".
                  "Nombre: $name\n".
                  "Teléfono: $phone\n".
                  "Correo: $email\n".
                  "Asunto: $subject_msg\n\n".
                  "Mensaje:\n$message";

    // Reemplaza con un correo de tu dominio (ej. web@bosco.edu.mx) para evitar spam
    $headers = "From: No-Reply <documentosbosco@gmail.com>\r\n";
    $headers .= "Reply-To: $email";

    if (mail($to, $email_subject, $email_body, $headers)) {
        http_response_code(200);
    } else {
        http_response_code(500);
    }
} else {
    http_response_code(403);
}
?>