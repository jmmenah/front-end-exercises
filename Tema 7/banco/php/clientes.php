<?php

header('Content-Type: application/json');


require ('funciones.php');
require_once ('db.php');

$stm = $pdo->prepare('SELECT * FROM cliente');
$stm->execute();

if ($stm->rowCount() > 0) {

    $clientes = $stm->fetchAll(PDO::FETCH_ASSOC);
    echo devolverMensaje($clientes, 200);
}else
    echo devolverMensaje('No hay clientes para mostrar', 500);

