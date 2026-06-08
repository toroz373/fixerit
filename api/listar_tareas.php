<?php
include "db.php";

$sql = "SELECT 
          t.id_tarea,
          t.nombre,
          t.descripcion,
          t.estado,
          t.latitud,
          t.longitud,
          u.nombre AS usuario,
          i.nombre AS informatico
        FROM tarea t
        LEFT JOIN usuario u ON t.id_usuario = u.id_usuario
        LEFT JOIN informatico i ON t.id_informatico = i.id_informatico";

$result = $conn->query($sql);

$tareas = [];

while ($row = $result->fetch_assoc()) {
    $tareas[] = $row;
}

echo json_encode($tareas);
?>
