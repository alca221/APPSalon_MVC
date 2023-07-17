<?php

//$db = mysqli_connect('localhost', 'root', 'admin', 'appsalon_mvc');
//estas variables estan declaradas en.env
$db = mysqli_connect( 
    $_ENV['DB_HOST'],
    $_ENV['DB_USER'],
    $_ENV['DB_PASS'],
    $_ENV['DB_BD']);

    //el idioma utilizado
$db->set_charset('utf8');

if (!$db) {
    echo "Error: No se pudo conectar a MySQL.";
    echo "errno de depuración: " . mysqli_connect_errno();
    echo "error de depuración: " . mysqli_connect_error();
    exit;
}
