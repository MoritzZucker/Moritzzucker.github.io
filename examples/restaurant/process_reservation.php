<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $phone = $_POST["phone"];
    $email = $_POST["email"];
    $people = $_POST["people"];
    $date = $_POST["date"];
    $time = $_POST["time"];

    // E-Mail-Nachricht erstellen
    $to = "moritzuucker@gmx.de"; 
    $subject = "Tischreservierung - $name";
    $message = "Name: $name\n";
    $message .= "Handynummer: $phone\n";
    $message .= "E-Mail: $email\n";
    $message .= "Anzahl Personen: $people\n";
    $message .= "Datum: $date\n";
    $message .= "Uhrzeit: $time\n";

    // E-Mail senden
    mail($to, $subject, $message);

    // Hier kannst du optional eine Bestätigungsseite oder eine Weiterleitung hinzufügen
    header("Location: confirmation.html");
}
?>
