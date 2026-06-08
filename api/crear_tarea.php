<?php
include "db.php";

$data = json_decode(file_get_contents("php://input"), true);

$nombre = $data["nombre"];
$descripcion = $data["descripcion"];
$lat = $data["latitud"];
$lng = $data["longitud"];
$id_usuario = 1;

$sql = "INSERT INTO tarea (nombre, descripcion, latitud, longitud, id_usuario)
        VALUES ('$nombre', '$descripcion', '$lat', '$lng', '$id_usuario')";

if ($conn->query($sql)) {
    echo json_encode(["status" => "ok"]);
} else {
    echo json_encode(["status" => "error", "msg" => $conn->error]);
}
?>
