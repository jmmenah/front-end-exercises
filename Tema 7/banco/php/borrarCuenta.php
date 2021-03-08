<?php

header('Content-Type: application/json');


require ('funciones.php');
require_once ('db.php');

$iban = htmlspecialchars($_POST['iban']) ?? '';


if (!empty($iban)) {

    $stm = $pdo->prepare('DELETE FROM cuenta WHERE iban = :iban');

    $stm->execute(array(

        ':iban' => $iban

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