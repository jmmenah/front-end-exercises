<?php

header('Content-Type: application/json');


require ('funciones.php');
require_once ('db.php');

$iban = htmlspecialchars($_POST['iban']) ?? '';
$cantidad = htmlspecialchars($_POST['cantidad']) ?? '';


if (!empty($iban) && !empty($cantidad) ) {

    $stm = $pdo->prepare('UPDATE cuenta SET saldo = (saldo + :cantidad) WHERE iban = :iban');

    $stm->execute(array(

        ':iban' => $iban,
        ':cantidad' => $cantidad

    ));

    if ($stm->rowCount() > 0) {
        
        $cuenta = $stm->fetch(PDO::FETCH_ASSOC);

        echo devolverMensaje($cuenta, 200);

    }
    else
        echo devolverMensaje('Cuenta no encontrada', 500);

}else {
    echo devolverMensaje('Campos vacíos', 500);
}