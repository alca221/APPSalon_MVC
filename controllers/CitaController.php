<?php

namespace Controllers;

use MVC\Router;

class CitaController {
    public static function index( Router $router ) {

         session_start();
         
//funcion creada includes funciones.php
          isAuth();

// entregamos el nombre e id a la vista de cita
        $router->render('cita/index', [
            'nombre' => $_SESSION['nombre'],
            'id' => $_SESSION['id']
        ]);
    }

}