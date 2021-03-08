<?php

header('Content-Type: application/json');


require ('funciones.php');
require_once ('db.php');

$iban = htmlspecialchars($_GET['iban']) ?? '';

if (!empty($iban)) {

    $stm = $pdo->prepare('SELECT * FROM movimiento WHERE iban = :iban');

    $stm->execute(array(

        ':iban' => $iban

    ));

    if ($stm->rowCount() > 0) {
        
        $movimientos = $stm->fetchAll(PDO::FETCH_ASSOC);

        echo devolverMensaje($movimientos, 200);

    }
    else
        echo devolverMensaje('No hay movimientos aún', 500);

}else {
    echo devolverMensaje('Campos vacíos', 500);
}
