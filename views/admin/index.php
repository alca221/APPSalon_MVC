<h1 class="nombre-pagina">Panel de Administración</h1>

<?php 
    include_once __DIR__ . '/../templates/barra.php';
?>

<h2>Buscar Citas</h2>
<div class="busqueda">
    <form class="formulario">
        <div class="campo">
            <label for="fecha">Fecha</label>
            <input 
                type="date"
                id="fecha"
                name="fecha"
                value="<?php echo $fecha; ?>"
            />
        </div>
    </form> 
</div>

 <?php
 //verifica si hay sitas, sino hay nos envia este mensaje
     if(count($citas) === 0) {
      echo "<h2>No Hay Citas en esta fecha</h2>";
     }
?> 

<div id="citas-admin">
    <ul class="citas">   
            <?php 
                $idCita = 0;
                //foreach, es para un arreglo
                foreach( $citas as $key => $cita ) {
   //comprueba si el id cliente es el mismo
                    if($idCita !== $cita->id) {
                        // este indica que cada vez inicia en 0 y va sumando
                        $total = 0;
            ?>
            <li>
                    <p>ID: <span><?php echo $cita->id; ?></span></p>
                    <p>Hora: <span><?php echo $cita->hora; ?></span></p>
                    <p>Cliente: <span><?php echo $cita->cliente; ?></span></p>
                    <p>Email: <span><?php echo $cita->email; ?></span></p>
                    <p>Telefono: <span><?php echo $cita->telefono; ?></span></p>

                    <h3>Servicios</h3>
            <?php 
                $idCita = $cita->id;
            } // Fin de IF 
            //va sumando los servicios
               $total += $cita->precio;
            ?>
                    <p class="servicio"><?php echo $cita->servicio . " " . $cita->precio; ?></p>
            
            <?php 
            //retorna el id que nos encontramos
                $actual = $cita->id;
                //es il indice en el arreglo de la BD
                $proximo = $citas[$key + 1]->id ?? 0;

                if(esUltimo($actual, $proximo)) { ?>
                    <p class="total">Total: <span>$ <?php echo $total; ?></span></p>

                    <!-- con este form, eliminamos las citas -->
                    <form action="/api/eliminar" method="POST">
                        <!-- este input se muestra en un campo oculto -->
                        <input type="hidden" name="id" value="<?php echo $cita->id; ?>">
                        <!-- boton eliminar cita -->
                        <input type="submit" class="boton-eliminar" value="Eliminar">
                    </form>


            <?php } 
          } // Fin de Foreach ?>
     </ul>
</div>

<?php
    $script = "<script src='build/js/buscador.js'></script>"
?>