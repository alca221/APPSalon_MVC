<!-- para que aparesca el nombre del usuario.le damos estilos a barra_UI.scss -->
<div class="barra">
<p>Hola: <?php echo $nombre ?? ''; ?></p>
<!-- para cerras sesion -->
<a class="boton" href="/logout">Cerrar Sesión</a>
</div>

<!-- si es admin muestra estos botones, barra servicios -->
<?php if(isset($_SESSION['admin'])) { ?>
    <!-- css UI.scss, "barra-servicios" -->
    <div class="barra-servicios">
        <a class="boton" href="/admin">Ver Citas</a>
        <a class="boton" href="/servicios">Ver Servicios</a>
        <a class="boton" href="/servicios/crear">Nuevo Servicio</a>
    </div>
<?php } ?>