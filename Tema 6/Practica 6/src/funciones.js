const numeros = [];

const app = document.getElementById('app');
const resultado = document.getElementById('mensaje');

let pintar = false;
let borrar = false;

function iniciarNumeros(cantidad = 16) {

    for (let index = 0; index < cantidad; index++) {

        numeros.push(index);
        
    }

}

function mezclar(a) {
    let j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function crearDiv() {

    let divs = [];

    numeros.forEach(element => {

        let div = document.createElement('div');
    
        let numero = document.createTextNode(element);
    
        div.setAttribute('id', element);
        div.setAttribute('class', 'elemento white');
    
        div.appendChild(numero);

        divs.push(div);

    });


    app.append(...divs);

}

function pintarFondo(div, color = 'red') {
    
    div.classList.remove('red');
    div.classList.remove('white');

    div.classList.add(color);


}

function limpiar() {

    let divs = document.querySelectorAll('.elemento');

    for (let index = 0; index < divs.length; index++) {
        const element = divs[index];
        pintarFondo(element, 'white');
    }

}

function rojo() {

    pintar = true;
    borrar = false;

}

function blanco() {

    pintar = false;
    borrar = true;

}

function pintarAjedrez() {

    limpiar();

    let divs = document.querySelectorAll('.elemento');
    
    let primeraFila = true;
    let segundaFila = false;

    let fila = 4;

    for (let i = 1; i <= divs.length; i++) {

        if (i > fila) {

            fila += 4;
            
            primeraFila = !primeraFila;
            segundaFila = !segundaFila;

        }
        
        if (primeraFila && (i % 4 == 1 || i % 4 == 3)) {

            pintarFondo(divs[i - 1]);

        }else if (segundaFila && (i % 4 == 2 || i % 4 == 0)) { 

            pintarFondo(divs[i - 1]);

        }
      
    }

}

function sumar(color) {

    let divs = [];
    let suma = 0;
    let mensaje = '';

    switch (color) {
        case 'red':
            divs = document.querySelectorAll('.red');
            mensaje = 'Las rojas son: ';
            break;
    
        default:
            divs = document.querySelectorAll('.white');
            mensaje = 'Las blancas son: ';
            break;
    }


    for (let index = 0; index < divs.length; index++) {
        const element = divs[index];

        suma += parseInt(element.textContent);
        
    }

    mostrarMensaje(mensaje + suma);

}

function mostrarMensaje(mensaje) {

    resultado.innerHTML = '';

    let div = document.createElement('div');

    let contenidoTexto = document.createTextNode(mensaje);

    div.appendChild(contenidoTexto);

    resultado.appendChild(div);

}

document.addEventListener('DOMContentLoaded', () => {
    
    iniciarNumeros();
    mezclar(numeros);
    crearDiv();

    document.addEventListener('click', (evt) => {
        
        if (evt.target.matches('#limpiar')) limpiar();
        else if (evt.target.matches('#rojo')) rojo();
        else if (evt.target.matches('#blanco')) blanco();
        else if (evt.target.matches('#ajedrez')) pintarAjedrez();
        else if (evt.target.matches('#sumarRojas')) sumar('red');
        else if (evt.target.matches('#sumarBlancas')) sumar('white');
        else if (evt.target.attributes.class != undefined
                && pintar
                && evt.target.attributes.class.textContent.includes('elemento')) pintarFondo(evt.target);
        else if (evt.target.attributes.class != undefined
                && borrar
                && evt.target.attributes.class.textContent.includes('elemento')) pintarFondo(evt.target, 'white');
    });

});