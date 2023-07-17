//este es el primer paso que carga
let paso = 1;
// le indicamos cuanto se moveran los botones anterior y siguiente
const pasoInicial = 1;
const pasoFinal = 3;

// cramos el arreglo para crear las citas
const cita = {
    id: '',
    nombre: '',
    fecha: '',
    hora: '',
    servicios: []
}

 document.addEventListener('DOMContentLoaded', function() {
     iniciarApp();
});

 function iniciarApp() {

     mostrarSeccion(); // Muestra y oculta las secciones
     tabs(); // Cambia la sección cuando se presionen los tabs
     botonesPaginador(); // Agrega o quita los botones del paginador
     paginaSiguiente(); 
     paginaAnterior();

     consultarAPI(); // Consulta la API en el backend de PHP

    idCliente();
    nombreCliente(); // Añade el nombre del cliente al objeto de cita
    seleccionarFecha(); // Añade la fecha de la cita en el objeto
    seleccionarHora(); // Añade la hora de la cita en el objeto

    mostrarResumen(); // Muestra el resumen de la cita
 }

 function mostrarSeccion() {

//     // Ocultar la sección que tenga la clase de mostrar
     const seccionAnterior = document.querySelector('.mostrar');
   if(seccionAnterior) {
        seccionAnterior.classList.remove('mostrar');
    }

//     // Seleccionar la sección con el paso...
     const pasoSelector = `#paso-${paso}`;
     const seccion = document.querySelector(pasoSelector);
     seccion.classList.add('mostrar');

//     // Quita la clase de actual al tab anterior, el color blanco
    const tabAnterior = document.querySelector('.actual');
     if(tabAnterior) {
         tabAnterior.classList.remove('actual');
     }

//     // Resalta el tab actual
     const tab = document.querySelector(`[data-paso="${paso}"]`);
    tab.classList.add('actual');
 }

 function tabs() {

//     // Agrega y cambia la variable de paso según el tab seleccionado
     const botones = document.querySelectorAll('.tabs button');
     botones.forEach( boton => {
        // (e) es el evento que se va a registrar
        boton.addEventListener('click', function(e) {
              e.preventDefault();

            paso = parseInt( e.target.dataset.paso );
            mostrarSeccion();
            botonesPaginador(); 

         });
    });
 }

//  nostramos o ocultamos el boton anterior o siguiente
 function botonesPaginador() {
     const paginaAnterior = document.querySelector('#anterior');
     const paginaSiguiente = document.querySelector('#siguiente');

    if(paso === 1) {
        paginaAnterior.classList.add('ocultar');
        paginaSiguiente.classList.remove('ocultar');
    } else if (paso === 3) {
        paginaAnterior.classList.remove('ocultar');
        paginaSiguiente.classList.add('ocultar');

         mostrarResumen();
    } else {
        paginaAnterior.classList.remove('ocultar');
        paginaSiguiente.classList.remove('ocultar');
    }

    mostrarSeccion();
 }

function paginaAnterior() {
    const paginaAnterior = document.querySelector('#anterior');
    paginaAnterior.addEventListener('click', function() {

        if(paso <= pasoInicial) return;
        paso--;
        // llamamos la funcion
        botonesPaginador();
    })
}
function paginaSiguiente() {
    const paginaSiguiente = document.querySelector('#siguiente');
    paginaSiguiente.addEventListener('click', function() {

        if(paso >= pasoFinal) return;
        paso++;
         // llamamos la funcion
        botonesPaginador();
    })
}

async function consultarAPI() {

    try {
        const url = '${location.origin}/api/servicios';
        // await va de la mano de async, sino va una, no funciona
        const resultado = await fetch(url);
        const servicios = await resultado.json();
        mostrarServicios(servicios);
    
    } catch (error) {
        console.log(error);
    }
}

function mostrarServicios(servicios) {
    servicios.forEach( servicio => {
        const { id, nombre, precio } = servicio;

        const nombreServicio = document.createElement('P');
        nombreServicio.classList.add('nombre-servicio');
        nombreServicio.textContent = nombre;

        const precioServicio = document.createElement('P');
        precioServicio.classList.add('precio-servicio');
        precioServicio.textContent = `$${precio}`;

        const servicioDiv = document.createElement('DIV');
        servicioDiv.classList.add('servicio');
        servicioDiv.dataset.idServicio = id;
        // funcion para seleccionar servicio
        servicioDiv.onclick = function() {
            seleccionarServicio(servicio);
        }

        servicioDiv.appendChild(nombreServicio);
        servicioDiv.appendChild(precioServicio);

        document.querySelector('#servicios').appendChild(servicioDiv);

    });
}

function seleccionarServicio(servicio) {
    // extraemos el objeta de cita, para agregar al arreglo
    const { id } = servicio;
    const { servicios } = cita;

    // Identificar el elemento al que se le da click,  deja resaltado el seleccionado
    const divServicio = document.querySelector(`[data-id-servicio="${id}"]`);

    //Comprobar si un servicio ya fue agregado 
    // some, itera sobre el arreglo y entrega un true o false
    if( servicios.some( agregado => agregado.id === id ) ) {
        // Eliminarlo, quita el objeto seleccionado
        cita.servicios = servicios.filter( agregado => agregado.id !== id );
        divServicio.classList.remove('seleccionado');
    } else {
        // Arreglo, para agregar los servicios
        cita.servicios = [...servicios, servicio];
        divServicio.classList.add('seleccionado');
    }
    // console.log(cita);
}

function idCliente() {
    cita.id = document.querySelector('#id').value;
}

function nombreCliente() {
    // seleccionamos el nombre para cita
    cita.nombre = document.querySelector('#nombre').value;
}

// seleccionamos la fecha para cita
function seleccionarFecha() {
    const inputFecha = document.querySelector('#fecha');
    inputFecha.addEventListener('input', function(e) {
//istanciamos la fecha que el usuario selecciono
        const dia = new Date(e.target.value).getUTCDay();
// le indicamos los dias que no se pueden seleccionar 0 es domingo y 6 es sabado
        if( [6, 0].includes(dia) ) {
            e.target.value = '';
            mostrarAlerta('Fines de semana no permitidos', 'error', '.formulario');
        } else {
            cita.fecha = e.target.value;
        }
        
    });
}

function seleccionarHora() {
    // #hora seleccionamos el id=hora desde el index cita
    const inputHora = document.querySelector('#hora');
    inputHora.addEventListener('input', function(e) {
        //console.log(e.target.value);
        const horaCita = e.target.value;
        //split(":")[0]; esto pone la separacion al string
        const hora = horaCita.split(":")[0];
        if(hora < 10 || hora > 18) {
            //no guarda la hora si no es valida
            e.target.value = '';
            mostrarAlerta('Hora No Válida', 'error', '.formulario');
        } else {
            cita.hora = e.target.value;

            // console.log(cita);
        }
    })
}

//alertas de errores y dias que no se trabaja de function seleccionarFecha() 
function mostrarAlerta(mensaje, tipo, elemento, desaparece = true) {

    // Previene que se generen más de 1 alerta y se muestra solo una alerta 
    const alertaPrevia = document.querySelector('.alerta');
    if(alertaPrevia) {
        //remueve alerta para generar otra
        alertaPrevia.remove();
    }

    // Scripting para crear la alerta
    const alerta = document.createElement('DIV');
    alerta.textContent = mensaje;
    alerta.classList.add('alerta');
    alerta.classList.add(tipo);

    const referencia = document.querySelector(elemento);
    referencia.appendChild(alerta);

    if(desaparece) {
        // Eliminar la alerta mostrada
        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }
  
}


 function mostrarResumen() {
    //llamamops desde index cita 
    const resumen = document.querySelector('.contenido-resumen');

//     // Limpiar el Contenido de Resumen
    while(resumen.firstChild) {
        resumen.removeChild(resumen.firstChild);
    }

    if(Object.values(cita).includes('') || cita.servicios.length === 0 ) {
        mostrarAlerta('Faltan datos de Servicios, Fecha u Hora', 'error', '.contenido-resumen', false);

         return;
     } 
    

//     // Formatear el div de resumen, extraemos estos datos
     const { nombre, fecha, hora, servicios } = cita;



//     // Heading para Servicios en Resumen
    const headingServicios = document.createElement('H3');
    headingServicios.textContent = 'Resumen de Servicios';
    resumen.appendChild(headingServicios);

//     // Iterando y mostrando los servicios seleccionados
    servicios.forEach(servicio => {
        const { id, precio, nombre } = servicio;
        const contenedorServicio = document.createElement('DIV');
        contenedorServicio.classList.add('contenedor-servicio');

        const textoServicio = document.createElement('P');
        textoServicio.textContent = nombre;

        const precioServicio = document.createElement('P');
        precioServicio.innerHTML = `<span>Precio:</span> $${precio}`;

        contenedorServicio.appendChild(textoServicio);
        contenedorServicio.appendChild(precioServicio);

        resumen.appendChild(contenedorServicio);
    });

//     // Heading para Cita en Resumen
    const headingCita = document.createElement('H3');
    headingCita.textContent = 'Resumen de Cita';
    resumen.appendChild(headingCita);

    const nombreCliente = document.createElement('P');
    nombreCliente.innerHTML = `<span>Nombre:</span> ${nombre}`;

//     // Formatear la fecha en español
    const fechaObj = new Date(fecha);
    const mes = fechaObj.getMonth();
    //se le agraga 2 para que no reste dias
    const dia = fechaObj.getDate() + 2;
    const year = fechaObj.getFullYear();

    //le damos formato a la fecha
    const fechaUTC = new Date( Date.UTC(year, mes, dia));
    
    const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}
    const fechaFormateada = fechaUTC.toLocaleDateString('es-CH', opciones);

    const fechaCita = document.createElement('P');
    fechaCita.innerHTML = `<span>Fecha:</span> ${fechaFormateada}`;

    const horaCita = document.createElement('P');
    horaCita.innerHTML = `<span>Hora:</span> ${hora} Horas`;

//     // Boton para Crear una cita
    const botonReservar = document.createElement('BUTTON');
    botonReservar.classList.add('boton');
    botonReservar.textContent = 'Reservar Cita';
    //enviamos a reservarita
    botonReservar.onclick = reservarCita;

//muestra en el html
    resumen.appendChild(nombreCliente);
    resumen.appendChild(fechaCita);
    resumen.appendChild(horaCita);

     resumen.appendChild(botonReservar);
 }

 // async se utiliza con await, para detener la ejecucion mientras se realiza la consulta
async function reservarCita() {
    
    const { nombre, fecha, hora, servicios, id } = cita;
    // map pone las coincidencias en la variable, busca solo sol solicitado y lo incluye en la variable
     const idServicios = servicios.map( servicio => servicio.id );
   //  console.log(idServicios);

//utilizamos feth, para enviar los datos para guardar en BD la cita, con la class cita
     const datos = new FormData();
    //agregamos datos a FormData()
    datos.append('fecha', fecha);
    datos.append('hora', hora );
    datos.append('usuarioId', id);
    datos.append('servicios', idServicios);

// este console nos sirve para ver lo datos de FormData()
 //console.log([...datos]);

 //creamos un try catch si es que hay un error a cargar cita
     try {
         // Petición hacia la api
         const url = '${location.origin}/api/citas'
        const respuesta = await fetch(url, {
            method: 'POST',
           // con este body, le entregamos los datos a fetch, para que los lea de FormData();
           body: datos
        });

         const resultado = await respuesta.json();
         console.log(resultado.resultado);
        // esta en alerta de sweetatert2, de OK
         if(resultado.resultado) {
            Swal.fire({
                icon: 'success',
                title: 'Cita Creada',
                text: 'Tu cita fue creada correctamente',
                button: 'OK'
             }) 
             //esto ayuda al precionar ok direccione o realice una accion
             .then( () => {
                setTimeout(() => {
                    window.location.reload();
                }, 2000); //3000 son 3seg para recargar pag
            })
        }
    } catch (error) {
         // esta en alerta de sweetatert2, de Error
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un error al guardar la cita'
        })
    }

    
//     // console.log([...datos]);

 }