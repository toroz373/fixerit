<?php
include "conexion.php";

$nombre = $_POST['nombre'];
$email = $_POST['email'];

$sql = $conexion->prepare("INSERT INTO informaticos (nombre, email) VALUES (?, ?)");
$sql->bind_param("ss", $nombre, $email);

if ($sql->execute()) {
    echo json_encode(["status" => "ok"]);
} else {
    echo json_encode(["status" => "error"]);
}
