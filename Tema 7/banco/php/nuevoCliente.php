<?php

header('Content-Type: application/json');


require ('funciones.php');
require_once ('db.php');

$dni = htmlspecialchars($_POST['dni']) ?? '';
$nombre = htmlspecialchars($_POST['nombre']) ?? '';
$apellidos = htmlspecialchars($_POST['apellidos']) ?? '';
$direccion = htmlspecialchars($_POST['direccion']) ?? '';
$localidad = htmlspecialchars($_POST['localidad']) ?? '';
$fNacimiento = htmlspecialchars($_POST['fNacimiento']) ?? '';


if (!empty($dni) && !empty($nombre) && !empty($apellidos) && !empty($direccion) && !empty($localidad) && !empty($fNacimiento)) {

    $stm = $pdo->prepare('INSERT INTO cliente VALUES (:dni, :nombre, :apellidos, :direccion, :localidad, :fNacimiento)');

    $stm->execute(array(

        ':dni' => $dni,
        ':nombre' => $nombre,
        ':apellidos' => $apellidos,
        ':direccion' => $direccion,
        ':localidad' => $localidad,
        ':fNacimiento' => $fNacimiento

    ));

    if ($stm->rowCount() > 0) {
        echo devolverMensaje('Cliente creado correctamente', 200);

    }else {
        echo devolverMensaje('Error al crear el cliente', 500);
    }

}else {
    echo devolverMensaje('Campos vacíos', 500);
}