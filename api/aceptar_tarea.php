<?php
include "db.php";

$data = json_decode(file_get_contents("php://input"), true);

$id_tarea = $data["id_tarea"];
$id_informatico = $data["id_informatico"];

$sql = "UPDATE tarea 
        SET id_informatico = $id_informatico,
            estado = 'en camino',
            fecha_asignacion = NOW()
        WHERE id_tarea = $id_tarea";

if ($conn->query($sql)) {
    echo json_encode(["status" => "ok"]);
} else {
    echo json_encode(["status" => "error"]);
}
?>
