<h1 class="nombre-pagina">Crear Cuenta</h1>
<p class="descripcion-pagina">Llene el formulario para crear su cuenta</p>

<?php 
    include_once __DIR__ . "/../templates/alertas.php";
?>

<form class="formulario" method="POST" action="/crear-cuenta">

<div class="campo">
    <label for="nombre">Nombre</label>
    <!-- value conserva el dato ingresado  -->
    <input type="text" id="nombre" placeholder="Ingresa tu Nombre" name="nombre" value="<?php echo s($usuario->nombre); ?>" >
</div>
<div class="campo">
    <label for="apellido">Apellido</label>
    <input type="text" id="apellido" placeholder="Ingresa tu Apellido" name="apellido" value="<?php echo s($usuario->apellido); ?>">
</div>
<div class="campo">
    <label for="telefono">Telefono</label>
    <input type="tel" id="telefono" placeholder="Ingresa tu Telefono" name="telefono" value="<?php echo s($usuario->telefono); ?>" >
</div>
<div class="campo">
    <label for="email">E-mail</label>
    <input type="email" id="email" placeholder="Ingresa tu E-mail" name="email" value="<?php echo s($usuario->email); ?>" >
</div>
<div class="campo">
    <label for="password">Password</label>
    <input type="password" id="password" placeholder="Ingresa tu Password" name="password" >
</div>

<input type="submit" class="boton" value="Crear Cuenta">
</form>

<div class="acciones">
    <a href="/">¿Ya tienes una cuenta? Inicia Sesión</a>
    <a href="/olvide">¿Olvidaste tu Password?</a>
</div>