<h1 class="nombre-pagina">Olvidaste Tu Password</h1>
<p class="descripcion-pagina">Reestablece tu password ingresando tu E-mail a continuación</p>

<!-- llamamos alertas -->
<?php 
    include_once __DIR__ . "/../templates/alertas.php";
?>


<form class="formulario" method="POST" action="/olvide">

<div class="campo">
    <label for="email">E-mail</label>
    <input type="email" id="email" placeholder="Ingresa tu E-mail" name="email" >
</div>

<input type="submit" class="boton" value="Enviar Instrucciones">
</form>

<div class="acciones">
    <a href="/">¿Ya tienes una cuenta? Inicia Sesión</a>
    <a href="/crear-cuenta">¿Aún no tienes cuenta? Crear una</a>
</div>