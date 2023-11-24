<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Eingabedaten aus dem Formular erhalten
    $name = trim($_POST['name']);
    $email = trim($_POST['email']);
    $message = trim($_POST['message']);

    // Überprüfung der Eingabedaten (z.B. leere Felder, ungültige E-Mail-Adresse usw.)
    if ($name == '' || $email == '' || $message == '') {
        echo 'Bitte füllen Sie alle erforderlichen Felder aus.';
        exit();
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo 'Bitte geben Sie eine gültige E-Mail-Adresse ein.';
        exit();
    }

    // Nachricht erstellen
    $to = 'moritzzucker@gmx.de'; // Die E-Mail-Adresse des Empfängers
    $subject = 'Neue Nachricht von ' . $name;
    $body = "
        Name: $name
        E-Mail: $email
        Nachricht: $message
    ";

    // Nachricht senden
    $headers = 'From: ' . $email . "\r\n" .
               'Reply-To: ' . $email . "\r\n" .
               'X-Mailer: PHP/' . phpversion();

    if (mail($to, $subject, $body, $headers)) {
        echo 'Ihre Nachricht wurde erfolgreich gesendet.';
    } else {
        echo 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später noch einmal.';
    }
}
?>