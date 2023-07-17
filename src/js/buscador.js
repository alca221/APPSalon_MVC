//este es para el panel de admin

document.addEventListener('DOMContentLoaded', function() {
    iniciarApp();
});

 function iniciarApp() {
     buscarPorFecha();
 }

 function buscarPorFecha() {
  //  console.log('desde buscar por fecha');
     const fechaInput = document.querySelector('#fecha');
    fechaInput.addEventListener('input', function(e) {
                const fechaSeleccionada = e.target.value;

              //  console.log(fechaSeleccionada);
//redireccionamos a la fecha seleccionada
        window.location = `?fecha=${fechaSeleccionada}`;
     });
}