<?php

namespace Controllers;

use Model\Cita;
use Model\Servicio;
use Model\CitaServicio;
// interactua con app.js

class APIController {
    public static function index() {
        $servicios = Servicio::all();
    
        echo json_encode($servicios);
    }
    
public static function guardar() {
     
        // // Almacena la Cita y devuelve el ID
         $cita = new Cita($_POST);
         //utilizamos ActiveRecord?? y guardamos
         $resultado = $cita->guardar();

  // echo json_encode($resultado);
         $id = $resultado['id'];

        // // Almacena la Cita y el Servicio

        // // Almacena los Servicios con el ID de la Cita, explode, realiza la separacion y entrga el dato como un arreglo
         $idServicios = explode(",", $_POST['servicios']);
         foreach($idServicios as $idServicio) {
            //creamos el arreglo para guardar
            $args = [
                'citaId' => $id,
                'servicioId' => $idServicio
            ];
            $citaServicio = new CitaServicio($args);
            $citaServicio->guardar();
        }
        // //Retornamos una respuesta
        // $respuesta = [
        //     'resultado' => $resultado
        // ];
         echo json_encode(['resultado' => $resultado] );
    }

    public static function eliminar() {
      //eliminamos las citas, solo el admin puede eliminar
        if($_SERVER['REQUEST_METHOD'] === 'POST') {
            $id = $_POST['id'];
            $cita = Cita::find($id);
            $cita->eliminar();
            header('Location:' . $_SERVER['HTTP_REFERER']);
        }
    }
}