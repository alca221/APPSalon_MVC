<?php 

namespace Controllers;

use MVC\Router;
use Model\AdminCita;


class AdminController {
    public static function index( Router $router ) {
         session_start();

         //protege que sea solo admin el que inglesa a esta pagina 
         isAdmin();

        // para que el admin pueda seleccionar por fecha ?? date, nos da la fecha del servidor si _GET no tiene nada
        $fecha = $_GET['fecha'] ?? date('Y-m-d');
        // explode('-', $fecha), nos envia la fecha en un arreglo
         $fechas = explode('-', $fecha);
//checkdate, nos valida que la fecha sea correcta
        if( !checkdate( $fechas[1], $fechas[2], $fechas[0]) ) {
            header('Location: /404');
        }

        // // Consultar la base de datos, estos datos estan solicitados desde AdminCita.php
        $consulta = "SELECT citas.id, citas.hora, CONCAT( usuarios.nombre, ' ', usuarios.apellido) as cliente, ";
        $consulta .= " usuarios.email, usuarios.telefono, servicios.nombre as servicio, servicios.precio  ";
        $consulta .= " FROM citas  ";
        $consulta .= " LEFT OUTER JOIN usuarios ";
        $consulta .= " ON citas.usuarioId=usuarios.id  ";
        $consulta .= " LEFT OUTER JOIN citaservicios ";
        $consulta .= " ON citaservicios.citaId=citas.id ";
        $consulta .= " LEFT OUTER JOIN servicios ";
        $consulta .= " ON servicios.id=citaservicios.servicioId ";
        $consulta .= " WHERE fecha =  '${fecha}' ";

     $citas = AdminCita::SQL($consulta);

         $router->render('admin/index', [
             'nombre' => $_SESSION['nombre'],
             'citas' => $citas,
            'fecha' => $fecha
         ]);
    }
}