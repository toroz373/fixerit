<?php
include "conexion.php";

$sql = $conexion->query("SELECT * FROM informaticos");
$data = [];

while ($row = $sql->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode($data);
