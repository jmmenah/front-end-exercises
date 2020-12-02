//Contedor
let inicial = JSON.stringify([
    {numero: 1000000000000, 
        titular: {nombre:"Juan Manuel",apellidos:"Mena Hernández",direccion:"Calle Salsipuedes 10",localidad:"Torredelcampo",fNacimiento:"1996-07-27"}, 
        saldo: 1800.2, interesAnual: 2.5,movimientos:[]}
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
      <button id="transfe" data-my-id="${i}">Transferencia</button>
      <button id="interesMes" data-my-id="${i}">Ingreso Interes</button>
      <button id="movimientos" data-my-id="${i}">Movimientos</button>
      <button id="delete" data-my-id="${i}">Borrar cuenta</button>`;
      i = i + 1;
    };
    return html + `</ul> <button id="new">Añadir cuenta</button>
    <button id="busqueda">Buscar cuenta</button>`;
};

function showView (cuenta) {
    return `
    La cuenta <b>${cuenta.numero}</b>,
    del titular <b>${cuenta.titular.nombre} ${cuenta.titular.apellidos}</b>,
    residente en <b>${cuenta.titular.direccion}, ${cuenta.titular.localidad}</b> 
    y con fecha de nacimiento de <b>${cuenta.titular.fNacimiento}</b> tiene
    un saldo de <b> ${cuenta.saldo}</b> y 
    un interés anual de <b> ${cuenta.interesAnual}</b> %.
    
    <p><button id="index"> Volver </button></p>`
}
function newView () {
    let pantalla=document.getElementById("pantalla");
    pantalla.innerHTML="";
    return `    <h2>Nueva Cuenta</h2>
        <p>Tipo de cuenta:<p>
        <button type="submit" id="corriente">Cuenta Corriente</button>
        <button type="submit" id="plazofijo">Cuenta Plazo Fijo</button>
        <button type="submit" id="pensiones">Cuenta Plan Pensiones</button>
        <button type="submit" id="back">Volver</button>`
};
function newCorrienteView(){
    let pantalla=document.getElementById("pantalla");
    pantalla.innerHTML="";
    return `<label for="numero">Numero de cuenta:</label>
    <input type="text" id="numero"><br><br>
    <label for="nombre">Nombre:</label>
    <input type="text" id="nombre"><br><br>
    <label for="apellidos">Apellidos:</label>
    <input type="text" id="apellidos"><br><br>
    <label for="direccion">Direccion:</label>
    <input type="text" id="direccion"><br><br>
    <label for="localidad">Localidad:</label>
    <input type="text" id="localidad"><br><br>
    <label for="fNacimiento">Fecha de Nacimiento:</label>
    <input type="date" id="fNacimiento"><br><br>
    <label for="saldo">Saldo:</label>
    <input type="text" id="saldo"><br><br>
    <label for="interesAnual">Interés Anual:</label>
    <input type="text" id="interesAnual"><br><br>
    <button type="submit" id="createCorriente">Crear Cuenta</button>
    <button type="submit" id="back">Volver</button>`
}
function newPlazoView(){
    let pantalla=document.getElementById("pantalla");
    pantalla.innerHTML="";
    return `<label for="numero">Numero de cuenta:</label>
    <input type="text" id="numero"><br><br>
    <label for="nombre">Nombre:</label>
    <input type="text" id="nombre"><br><br>
    <label for="apellidos">Apellidos:</label>
    <input type="text" id="apellidos"><br><br>
    <label for="direccion">Direccion:</label>
    <input type="text" id="direccion"><br><br>
    <label for="localidad">Localidad:</label>
    <input type="text" id="localidad"><br><br>
    <label for="fNacimiento">Fecha de Nacimiento:</label>
    <input type="date" id="fNacimiento"><br><br>
    <label for="saldo">Saldo:</label>
    <input type="text" id="saldo"><br><br>
    <label for="interesAnual">Interés Anual:</label>
    <input type="text" id="interesAnual"><br><br>
    <label for="fVencimiento">Fecha de Vencimiento:</label>
    <input type="date" id="fVencimiento"><br><br>
    <button type="submit" id="createPlazo">Crear Cuenta</button>
    <button type="submit" id="back">Volver</button>`
}
function newPensionesView(){
    let pantalla=document.getElementById("pantalla");
    pantalla.innerHTML="";
    return `<label for="numero">Numero de cuenta:</label>
    <input type="text" id="numero"><br><br>
    <label for="nombre">Nombre:</label>
    <input type="text" id="nombre"><br><br>
    <label for="apellidos">Apellidos:</label>
    <input type="text" id="apellidos"><br><br>
    <label for="direccion">Direccion:</label>
    <input type="text" id="direccion"><br><br>
    <label for="localidad">Localidad:</label>
    <input type="text" id="localidad"><br><br>
    <label for="fNacimiento">Fecha de Nacimiento:</label>
    <input type="date" id="fNacimiento"><br><br>
    <label for="saldo">Saldo:</label>
    <input type="text" id="saldo"><br><br>
    <label for="interesAnual">Interés Anual:</label>
    <input type="text" id="interesAnual"><br><br>
    <label for="fVencimiento">Fecha de Vencimiento:</label>
    <input type="date" id="fVencimiento"><br><br>
    <label for="cotizacion">Cotización:</label>
    <input type="text" id="cotizacion"><br><br>
    <label for="nOrigen">Numero de cuenta origen:</label>
    <input type="text" id="nOrigen"><br><br>
    <button type="submit" id="createPensiones">Crear Cuenta</button>
    <button type="submit" id="back">Volver</button>`
}

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

function transferenciaView(i){
    return `<h2>Transferencia</h2>
        <label for="cantidad">Cantidad:</label>
        <input type="text" id="cantidad"><br><br>
        <label for="cuenta">Cuenta:</label>
        <input type="text" id="cuenta"><br><br>
        <button type="submit" id="transferirCant" data-my-id="${i}">Transferir Cantidad</button>
        <button type="submit" id="back">Volver</button>`
}

function movimientosView (cuenta) {
    let    i=0,   html = "<h2>Movimientos</h2><ol>";
    while(i < cuenta.movimientos.length) {
      html = html + `<li id="movimiento" data-my-id="${i}"> ${cuenta.movimientos[i].fecha}, ${cuenta.movimientos[i].tipo}, ${cuenta.movimientos[i].importe}, ${cuenta.movimientos[i].saldo}</li>`;
      i = i + 1;
    };
    return html + `</ol><button type="submit" id="back">Volver</button>`;
};

function busquedaView () {
    let pantalla=document.getElementById("pantalla");
    pantalla.innerHTML="";
    return `    <h2>Buscar Cuenta</h2>
        <p>Tipo de busqueda:<p>
        <input type="text" id="numero">
        <button type="submit" id="bNumero">Numero</button><br><br>
        <input type="text" id="nombre">
        <button type="submit" id="bNombre">Nombre</button><br><br>
        <button type="submit" id="back">Volver</button>`
};


// CONTROLADORES
function indexContr() { 
    let cuentas = JSON.parse(localStorage.getItem('cuentas'));
    document.getElementById("main").innerHTML = indexView(cuentas);
};
function showContr(i) { 
    let cuentas = JSON.parse(localStorage.getItem('cuentas'));
    document.getElementById("main").innerHTML = showView(cuentas[i]);
};
function movimientosViewContr(i) { 
    let cuentas = JSON.parse(localStorage.getItem('cuentas'));
    document.getElementById("main").innerHTML = movimientosView(cuentas[i]);
};
function newContr() { document.getElementById("main").innerHTML = newView();};
function newCorrienteContr() { document.getElementById("main").innerHTML = newCorrienteView();};
function newPlazoContr() { document.getElementById("main").innerHTML = newPlazoView();};
function newPensionesContr() { document.getElementById("main").innerHTML = newPensionesView();};
function ingresoViewContr(i) { document.getElementById("main").innerHTML = ingresoView(i);};
function transferenciaViewContr(i) { document.getElementById("main").innerHTML = transferenciaView(i);};
function reintegroViewContr(i) { document.getElementById("main").innerHTML = reintegroView(i);};
function deleteContr(i) {
    cuentas.splice(i,1);
    localStorage.setItem('cuentas', JSON.stringify(cuentas));
    indexContr();
    let pantalla=document.getElementById("pantalla");
        pantalla.innerHTML="Cuenta borrada";
        pantalla.style="color:black";
};
function createCorrienteContr() {
    numero=Number.parseInt(document.getElementById("numero").value);
    nombre=document.getElementById("nombre").value;
    apellidos=document.getElementById("apellidos").value;
    direccion=document.getElementById("direccion").value;
    localidad=document.getElementById("localidad").value;
    fNacimiento=document.getElementById("fNacimiento").value;
    saldo=Number.parseFloat(document.getElementById("saldo").value);
    interesAnual=Number.parseFloat(document.getElementById("interesAnual").value);

    cuenta = {numero: numero, titular: {nombre: nombre, apellidos: apellidos, direccion: direccion, localidad: localidad, fNacimiento:fNacimiento}, 
    saldo: saldo, interesAnual: interesAnual};
    cuentas.push(cuenta);
    localStorage.setItem('cuentas', JSON.stringify(cuentas));
    indexContr();
    let pantalla=document.getElementById("pantalla");
    pantalla.innerHTML="Cuenta creada";
    pantalla.style="color:black";
};
function createPlazoContr() {
    numero=Number.parseInt(document.getElementById("numero").value);
    nombre=document.getElementById("nombre").value;
    apellidos=document.getElementById("apellidos").value;
    direccion=document.getElementById("direccion").value;
    localidad=document.getElementById("localidad").value;
    fNacimiento=document.getElementById("fNacimiento").value;
    saldo=Number.parseFloat(document.getElementById("saldo").value);
    interesAnual=Number.parseFloat(document.getElementById("interesAnual").value);
    fVencimiento=document.getElementById("fVencimiento").value;

    cuenta = {numero: numero, titular: {nombre: nombre, apellidos: apellidos, direccion: direccion, localidad: localidad, fNacimiento:fNacimiento}, 
    saldo: saldo, interesAnual: interesAnual,vencimiento:vencimiento};
    cuentas.push(cuenta);
    localStorage.setItem('cuentas', JSON.stringify(cuentas));
    indexContr();
    let pantalla=document.getElementById("pantalla");
    pantalla.innerHTML="Cuenta creada";
    pantalla.style="color:black";
};
function createPensionesContr() {
    numero=Number.parseInt(document.getElementById("numero").value);
    nombre=document.getElementById("nombre").value;
    apellidos=document.getElementById("apellidos").value;
    direccion=document.getElementById("direccion").value;
    localidad=document.getElementById("localidad").value;
    fNacimiento=document.getElementById("fNacimiento").value;
    saldo=Number.parseFloat(document.getElementById("saldo").value);
    interesAnual=Number.parseFloat(document.getElementById("interesAnual").value);
    fVencimiento=document.getElementById("fVencimiento").value;
    cotizacion=Number.parseFloat(document.getElementById("cotizacion").value);
    nOrigen=Number.parseInt(document.getElementById("nOrigen").value);

    cuenta = {numero: numero, titular: {nombre: nombre, apellidos: apellidos, direccion: direccion, localidad: localidad, fNacimiento:fNacimiento}, 
    saldo: saldo, interesAnual: interesAnual,vencimiento:vencimiento, cotizacion:cotizacion, nOrigen:nOrigen};
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
    let cuenta=Object.assign(new CuentaCorriente,cuentas[i]);
    cuenta.reintegro(Number.parseFloat(document.getElementById('reintegro').value));
    cuenta=JSON.stringify(cuenta);
    cuentas[i]=JSON.parse([cuenta]);
    localStorage.setItem('cuentas', JSON.stringify(cuentas));
    indexContr();
    let pantalla=document.getElementById("pantalla");
    pantalla.innerHTML="Reintegro Realizado";
    pantalla.style="color:black";
}

function transferenciaContr(i){
    let cuentas = JSON.parse(localStorage.getItem('cuentas'));
    let cuenta=Object.assign(new CuentaCorriente,cuentas[i]);
    let numero=document.getElementById("cuenta").value;
    let j=0;
    while(cuentas[j].numero != numero){
        j++;
    }
    let cuentatrans=Object.assign(new CuentaCorriente,cuentas[j]);
    cuenta.transferirHasta(cuentatrans,Number.parseFloat(document.getElementById('cantidad').value));
    cuentatrans=JSON.stringify(cuentatrans);
    cuentas[j]=JSON.parse([cuentatrans]);
    cuenta=JSON.stringify(cuenta);
    cuentas[i]=JSON.parse([cuenta]);
    localStorage.setItem('cuentas', JSON.stringify(cuentas));
    indexContr();
    let pantalla=document.getElementById("pantalla");
    pantalla.innerHTML="Transferencia Realizada";
    pantalla.style="color:black";
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
function busquedaContr(){
    document.getElementById("main").innerHTML = busquedaView();
    let cuentas = JSON.parse(localStorage.getItem('cuentas'));
    document.addEventListener('click', ev => {
        if      (ev.target.matches('#bNumero')) {
            let i=0;
            let numero = document.getElementById("numero").value;
            while(cuentas[i].numero != numero){
                i++;
            }
            let nombre=cuentas[i].titular.nombre;
            indexContr();
            let pantalla=document.getElementById("pantalla");
            pantalla.innerHTML="La cuenta "+numero+" pertenece a "+nombre;
            pantalla.style="color:black";
        }
        else if (ev.target.matches('#bNombre')) {
            let i=0;
            let nombre = document.getElementById("nombre").value;
            while(cuentas[i].titular.nombre != nombre){
                i++;
            }
            let numero=cuentas[i].numero;
            indexContr();
            let pantalla=document.getElementById("pantalla");
            pantalla.innerHTML=nombre+" tiene la cuenta numero "+numero;
            pantalla.style="color:black";
        }
    }) 
}

// EVENTOS
document.addEventListener('DOMContentLoaded', ev => indexContr());
document.addEventListener('click', ev => {
    if      (ev.target.matches('#index')) indexContr();
    else if (ev.target.matches('#show'))  showContr(ev.target.dataset.myId);
    else if (ev.target.matches('#movimientos'))  movimientosViewContr(ev.target.dataset.myId);
    else if (ev.target.matches('#delete')) deleteContr(ev.target.dataset.myId);
    else if (ev.target.matches('#new'))    newContr();
    else if (ev.target.matches('#corriente'))    newCorrienteContr();
    else if (ev.target.matches('#plazofijo'))    newPlazoContr();
    else if (ev.target.matches('#pensiones'))    newPensionesContr();
    else if (ev.target.matches('#createCorriente')) createCorrienteContr();
    else if (ev.target.matches('#createPlazo')) createPlazoContr();
    else if (ev.target.matches('#createPensiones')) createPensionesContr();
    else if (ev.target.matches('#transfe'))    transferenciaViewContr(ev.target.dataset.myId);
    else if (ev.target.matches('#transferirCant'))  transferenciaContr(ev.target.dataset.myId);
    else if (ev.target.matches('#ingresar'))    ingresoViewContr(ev.target.dataset.myId);
    else if (ev.target.matches('#ingresarCant'))  ingresoContr(ev.target.dataset.myId);
    else if (ev.target.matches('#reintegrar'))    reintegroViewContr(ev.target.dataset.myId);
    else if (ev.target.matches('#reintegrarCant'))  reintegroContr(ev.target.dataset.myId);
    else if (ev.target.matches('#interesMes'))    interesMesContr(ev.target.dataset.myId);
    else if (ev.target.matches('#busqueda'))    busquedaContr();
    else if (ev.target.matches('#back'))    location.reload();
})