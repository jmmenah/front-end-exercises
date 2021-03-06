//Contedor
let inicial = JSON.stringify([
    {numero: 1000000000000, titular: "Juan Manuel", saldo: 1800.2, interesAnual: 2.5}
]);
localStorage.setItem('cuentas', localStorage.getItem('cuentas') || inicial);
// MODELO
let cuentas = JSON.parse(localStorage.getItem('cuentas'));

// VISTAS
function indexView (cuentas) {
    let    i=0,   html = "<ul>";
    while(i < cuentas.length) {
      html = html + `<li id="show" data-my-id="${i}"> ${cuentas[i].numero}</li>
      <button id="ingresar" data-my-id="${i}">Ingreso</button>
      <button id="reintegrar" data-my-id="${i}">Reintegro</button>
      <button id="rojos" data-my-id="${i}">En Rojos</button>
      <button id="interesMes" data-my-id="${i}">Ingreso Interes</button>
      <button id="delete" data-my-id="${i}">Borrar cuenta</button>`;
      i = i + 1;
    };
    return html + `</ul> <button id="new">Añadir cuenta</button>`;
};

function showView (cuenta) {
    return `
    La cuenta <b> ${cuenta.numero}</b>,
    del titular <b> ${cuenta.titular}</b> tiene
    un saldo de <b> ${cuenta.saldo}</b> y 
    un interés anual de <b> ${cuenta.interesAnual}</b> %.
    
    <p><button id="index"> Volver </button></p>`
}
function newView () {
    let pantalla=document.getElementById("pantalla");
    pantalla.innerHTML="";
    return `    <h2>Nueva Cuenta</h2>
        <label for="numero">Numero de cuenta:</label>
        <input type="text" id="numero"><br><br>
        <label for="titular">Titular:</label>
        <input type="text" id="titular"><br><br>
        <label for="saldo">Saldo:</label>
        <input type="text" id="saldo"><br><br>
        <label for="interesAnual">Interés Anual:</label>
        <input type="text" id="interesAnual"><br><br>
        <button type="submit" id="create">Crear Cuenta</button>
        <button type="submit" id="back">Volver</button>`
};

function ingresoView(i){
    return `<h2>Ingreso</h2>
        <label for="ingreso">Cantidad:</label>
        <input type="text" id="ingreso"><br><br>
        <button type="submit" id="ingresarCant" data-my-id="${i}">Ingresar Cantidad</button>
        <button type="submit" id="back">Volver</button>`
}

function reintegroView(i){
    return `<h2>Reintegro</h2>
        <label for="reintegro">Cantidad:</label>
        <input type="text" id="reintegro"><br><br>
        <button type="submit" id="reintegrarCant" data-my-id="${i}">Reintegrar Cantidad</button>
        <button type="submit" id="back">Volver</button>`
}


// CONTROLADORES
function indexContr() { document.getElementById("main").innerHTML = indexView(cuentas);};
function showContr(i) { document.getElementById("main").innerHTML = showView(cuentas[i]);};
function newContr() { document.getElementById("main").innerHTML = newView();};
function ingresoViewContr(i) { document.getElementById("main").innerHTML = ingresoView(i);};
function reintegroViewContr(i) { document.getElementById("main").innerHTML = reintegroView(i);};
function deleteContr(i) {
    cuentas.splice(i,1);
    localStorage.setItem('cuentas', JSON.stringify(cuentas));
    indexContr();
    let pantalla=document.getElementById("pantalla");
        pantalla.innerHTML="Cuenta borrada";
        pantalla.style="color:black";
};
function createContr() {
    numero=Number.parseInt(document.getElementById("numero").value);
    titular=document.getElementById("titular").value;
    saldo=Number.parseFloat(document.getElementById("saldo").value);
    interesAnual=Number.parseFloat(document.getElementById("interesAnual").value);

    cuenta = {numero: numero, titular: titular, saldo: saldo, interesAnual: interesAnual};
    cuentas.push(cuenta);
    localStorage.setItem('cuentas', JSON.stringify(cuentas));
    indexContr();
    let pantalla=document.getElementById("pantalla");
    pantalla.innerHTML="Cuenta creada";
    pantalla.style="color:black";
};

function ingresoContr(i){
    let cuenta=Object.assign(new Cuenta,cuentas[i]);
    cuenta.ingreso(Number.parseFloat(document.getElementById('ingreso').value));
    cuenta=JSON.stringify(cuenta);
    cuentas[i]=JSON.parse([cuenta]);
    localStorage.setItem('cuentas', JSON.stringify(cuentas));
    indexContr();
    let pantalla=document.getElementById("pantalla");
    pantalla.innerHTML="Ingreso Realizado";
    pantalla.style="color:black";
}

function reintegroContr(i){
    let cuenta=Object.assign(new Cuenta,cuentas[i]);
    cuenta.reintegro(Number.parseFloat(document.getElementById('reintegro').value));
    cuenta=JSON.stringify(cuenta);
    cuentas[i]=JSON.parse([cuenta]);
    localStorage.setItem('cuentas', JSON.stringify(cuentas));
    indexContr();
    let pantalla=document.getElementById("pantalla");
    pantalla.innerHTML="Reintegro Realizado";
    pantalla.style="color:black";
}

function enRojosContr(i){
    let cuenta=Object.assign(new Cuenta,cuentas[i]);
    cuenta.enRojos();
    indexContr();
    let pantalla=document.getElementById("pantalla");
    if(cuenta.enRojos()){
        pantalla.innerHTML="Esta en rojos";
        pantalla.style="color:red";
    }else{
        pantalla.innerHTML="No está en rojos";
        pantalla.style="color:black";
    }
}

function interesMesContr(i){
    let cuenta=Object.assign(new Cuenta,cuentas[i]);
    cuenta.ingresoInteresMes();
    cuenta=JSON.stringify(cuenta);
    cuentas[i]=JSON.parse([cuenta]);
    localStorage.setItem('cuentas', JSON.stringify(cuentas));
    indexContr();
    let pantalla=document.getElementById("pantalla");
    pantalla.innerHTML="Intereses ingresados";
    pantalla.style="color:black";
}

// EVENTOS
document.addEventListener('DOMContentLoaded', ev => indexContr());
document.addEventListener('click', ev => {
    if      (ev.target.matches('#index')) indexContr();
    else if (ev.target.matches('#show'))  showContr(ev.target.dataset.myId);
    else if (ev.target.matches('#delete')) deleteContr(ev.target.dataset.myId);
    else if (ev.target.matches('#create')) createContr();
    else if (ev.target.matches('#new'))    newContr();
    else if (ev.target.matches('#ingresar'))    ingresoViewContr(ev.target.dataset.myId);
    else if (ev.target.matches('#ingresarCant'))  ingresoContr(ev.target.dataset.myId);
    else if (ev.target.matches('#reintegrar'))    reintegroViewContr(ev.target.dataset.myId);
    else if (ev.target.matches('#reintegrarCant'))  reintegroContr(ev.target.dataset.myId);
    else if (ev.target.matches('#rojos'))    enRojosContr(ev.target.dataset.myId);
    else if (ev.target.matches('#interesMes'))    interesMesContr(ev.target.dataset.myId);
    else if (ev.target.matches('#back'))    location.reload();
})