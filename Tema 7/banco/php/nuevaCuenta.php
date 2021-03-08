<?php

header('Content-Type: application/json');


require ('funciones.php');
require_once ('db.php');

$iban = htmlspecialchars($_POST['iban']) ?? '';
$dni = htmlspecialchars($_POST['dni']) ?? '';
$saldo = htmlspecialchars($_POST['saldo']) ?? '';
$interesAnual = htmlspecialchars($_POST['interesAnual']) ?? '';


if (!empty($iban) && !empty($dni) && !empty($saldo) && !empty($interesAnual)) {

    $stm = $pdo->prepare('INSERT INTO cuenta VALUES (:iban, :dni, :saldo, :interesAnual)');

    $stm->execute(array(

        ':iban' => $iban,
        ':dni' => $dni,
        ':saldo' => $saldo,
        ':interesAnual' => $interesAnual

    ));

    if ($stm->rowCount() > 0) {
        echo devolverMensaje('Cuenta creada correctamente', 200);

    }else {
        echo devolverMensaje('Error al crear la cuenta', 500);
    }

}else {
    echo devolverMensaje('Campos vacíos', 500);
}