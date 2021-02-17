var READY_STATE_UNINITIALIZED = 0;
var READY_STATE_LOADING = 1;
var READY_STATE_LOADED = 2;
var READY_STATE_INTERACTIVE = 3;
var READY_STATE_COMPLETE = 4;
var peticion_http;
var localidadIntroducida = "";

document.addEventListener('click', ev => {
    if (ev.target.matches('#botonEnviar')) {
        localidad = document.getElementById('localidad').value;
        descargaArchivo()
    }
})


function inicializa_xhr() {
    if (window.XMLHttpRequest) {
        return new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        return new ActiveXObject("Microsoft.XMLHTTP");
    }
}

function comprobarLocalidades() {
    if (peticion_http.readyState == READY_STATE_COMPLETE) {
        if (peticion_http.status == 200) {

            let arrayLocalidades = Array.from(JSON.parse(peticion_http.responseText))

            let ciudadBuscado = arrayLocalidades.filter(cicudadFiltrada => cicudadFiltrada == localidad);

            let resultadoParrafo = document.getElementById('resultado');

            console.log(arrayLocalidades[0]);
            if (ciudadBuscado.length > 0) {
                resultadoParrafo.innerHTML = 'La localidad existe';
                resultadoParrafo.style.color = "green";
            } else {
                resultadoParrafo.innerHTML = 'La localidad no existe';
                resultadoParrafo.style.color = "red";
            }


        }
    }
}

function descargaArchivo() {
    cargaContenido("http://localhost/Ejercicio6(u7e2)/localidades.php", "GET", comprobarLocalidades);
}


function cargaContenido(url, metodo, funcion) {

    peticion_http = inicializa_xhr();
    if (peticion_http) {
        peticion_http.onreadystatechange = funcion;
        peticion_http.open(metodo, url, true);
        peticion_http.send(null);
    }
}


// window.onload =