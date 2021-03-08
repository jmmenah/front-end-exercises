<?php

header('Content-Type: application/json');


require ('funciones.php');
require_once ('db.php');

$stm = $pdo->prepare('SELECT * FROM cuenta');
$stm->execute();

if ($stm->rowCount() > 0) {

    $cuentas = $stm->fetchAll(PDO::FETCH_ASSOC);
    echo devolverMensaje($cuentas, 200);
}else
    echo devolverMensaje('No hay cuentas para mostrar', 500);

