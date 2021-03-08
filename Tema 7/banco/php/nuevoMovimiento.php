<?php

header('Content-Type: application/json');


require ('funciones.php');
require_once ('db.php');

$iban = htmlspecialchars($_POST['iban']) ?? '';
$tipo = htmlspecialchars($_POST['tipo']) ?? '';
$cantidad = htmlspecialchars($_POST['cantidad']) ?? '';


if (!empty($iban) && !empty($tipo) && !empty($cantidad)) {

    $stm = $pdo->prepare('INSERT INTO movimiento VALUES (NULL, :iban, :tipo, :cantidad)');

    $stm->execute(array(

        ':iban' => $iban,
        ':tipo' => $tipo,
        ':cantidad' => $cantidad

    ));

    if ($stm->rowCount() > 0) {
        echo devolverMensaje('Movimiento creado correctamente', 200);

    }else {
        echo devolverMensaje('Error al crear el movimiento', 500);
    }

}else {
    echo devolverMensaje('Campos vacíos', 500);
}