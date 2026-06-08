<?php
include "db.php";

$data = json_decode(file_get_contents("php://input"), true);

$email = $data["email"];
$password = $data["password"];

$sql = "SELECT * FROM login WHERE email='$email' LIMIT 1";
$result = $conn->query($sql);

if ($result->num_rows == 0) {
    echo json_encode(["status" => "error", "msg" => "Usuario no encontrado"]);
    exit;
}

$user = $result->fetch_assoc();

if (!password_verify($password, $user["password"])) {
    echo json_encode(["status" => "error", "msg" => "Contraseña incorrecta"]);
    exit;
}

echo json_encode([
    "status" => "ok",
    "tipo" => $user["tipo"],
    "id" => $user["id_relacionado"]
]);
?>
