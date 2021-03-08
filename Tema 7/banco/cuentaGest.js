$(document).ready(function () {
  let cuentas;
  indexView();
  $("#datos").on("click", function () {
    iban = $(this).attr("data-id").html();
    showView(iban);
  });
});

// VISTAS
function indexView() {
  $.get("/banco/php/cuentas.php", function (data) {
    cuentas = data.message;
    let i = 0,
      html = "<ul>";
    while (i < cuentas.length) {
      html =
        html +
        `<li id="show">${cuentas[i].iban}</li>
      <button id="datos" onclick="showView('${cuentas[i].iban}');">Datos</button>
      <button id="ingresar" onclick="ingresoView('${cuentas[i].iban}');">Ingreso</button>
      <button id="reintegrar" onclick="reintegroView('${cuentas[i].iban}');">Reintegro</button>
      <button id="rojos" onclick="rojosView('${cuentas[i].iban}');">En Rojos</button>
      <button id="interesMes" onclick="ingresoMes('${cuentas[i].iban}','${cuentas[i].interesAnual}','${cuentas[i].saldo}');">Ingreso Interes</button>
      <button id="movimientos" onclick="movimientosView('${cuentas[i].iban}');">Movimientos</button>
      <button id="delete" onclick="eraseAccount('${cuentas[i].iban}');">Borrar cuenta</button>`;
      i = i + 1;
    }
    html =
      html +
      `</ul> <button id="new" onclick="newView()">Añadir cuenta</button>`;
    $("#main").append(html);
    $("#pantalla").html("");
  });
}

function showView(iban) {
  $.post("/banco/php/cuenta.php", { iban: iban }, function (data) {
    let cuenta = data.message;
    let dni = cuenta.dni;
    $.post("/banco/php/cliente.php", { dni: dni }, function (data) {
      let cliente = data.message;
      html = `
    La cuenta <b>${cuenta.iban}</b>,
    del titular <b>${cliente.nombre} ${cliente.apellidos}</b>,
    residente en <b>${cliente.direccion}, ${cliente.localidad}</b> 
    y con fecha de nacimiento de <b>${cliente.fNacimiento}</b> tiene
    un saldo de <b> ${cuenta.saldo}</b> y 
    un interés anual de <b> ${cuenta.interesAnual}</b> %.
    
    <p><button onclick="location.reload()" id="index"> Volver </button></p>`;
      $("#main").html(html);
    });
  });
}
function newView() {
  let pantalla = document.getElementById("pantalla");
  pantalla.innerHTML = `<h2>Nueva Cuenta</h2>
  <label for="numero">Numero de cuenta:</label>
  <input type="text" id="numero"><br><br>
  <label for="nombre">DNI:</label>
  <input type="text" id="dni"><br><br>
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
  <button type="submit" onclick="newAccount();" id="create">Crear Cuenta</button>
  <button type="submit" onclick="location.reload()" id="back">Volver</button>`;
}
function newAccount() {
  iban = $("#numero").val();
  dni = $("#dni").val();
  nombre = $("#nombre").val();
  apellidos = $("#apellidos").val();
  direccion = $("#direccion").val();
  localidad = $("#localidad").val();
  fNacimiento = $("#fNacimiento").val();
  saldo = $("#saldo").val();
  interesAnual = $("#interesAnual").val();
  $.post(
    "/banco/php/nuevoCliente.php",
    {
      iban: iban,
      dni: dni,
      nombre: nombre,
      apellidos: apellidos,
      direccion: direccion,
      localidad: localidad,
      fNacimiento: fNacimiento,
    },
    function (data) {
      if (data.status === 200) {
        alert("Cliente añadido correctamente");
      }
    }
  );
  $.post(
    "/banco/php/nuevaCuenta.php",
    { iban: iban, dni: dni, saldo: saldo, interesAnual: interesAnual },
    function (data) {
      if (data.status === 200) {
        alert("Cuenta añadida correctamente");
      }
    }
  );
  window.location.reload();
}

function eraseAccount(iban){
    $.post("/banco/php/borrarCuenta.php", { iban: iban }, function (data) {
      if (data.status === 200) {
        alert("Cuenta borrada correctamente");
        window.location.reload();
      }
    });
}

function ingresoView(iban) {
  html= `<h2>Ingreso</h2>
        <label for="ingreso">Cantidad:</label>
        <input type="text" id="ingreso"><br><br>
        <button type="submit" id="ingresarCant" onclick="ingreso('${iban}');">Ingresar Cantidad</button>
        <button type="submit" onclick="location.reload()" id="back">Volver</button>`;

        $("#main").html(html);
        $("#pantalla").html("");

}

function ingreso(iban){
  iban=iban;
  cantidad=$("#ingreso").val();
  tipo="ingreso";
  $.post("/banco/php/nuevoMovimiento.php", {iban: iban,
    tipo: tipo,
  cantidad: cantidad},function(data){
    if (data.status === 200) {
      $.post("/banco/php/actualizarSaldo.php", {iban: iban,
      cantidad: cantidad},function(data){
        if (data.status === 200) {
          console.log("Saldo actualizado");
        }
      });
      console.log("Ingreso correcto");
      //window.location.reload();
    }
  })
}

function reintegroView(iban) {
  html= `<h2>Reintegro</h2>
        <label for="reintegro">Cantidad:</label>
        <input type="text" id="reintegro"><br><br>
        <button type="submit" id="reintegrarCant" onclick="reintegro('${iban}');">Reintegrar Cantidad</button>
        <button type="submit" onclick="location.reload()" id="back">Volver</button>`;

        $("#main").html(html);
        $("#pantalla").html("");
}

function reintegro(iban){
  iban=iban;
  cantidad=-($("#reintegro").val());
  tipo="reintegro";
  $.post("/banco/php/nuevoMovimiento.php", {iban: iban,
    tipo: tipo,
  cantidad: cantidad},function(data){
    if (data.status === 200) {
      $.post("/banco/php/actualizarSaldo.php", {iban: iban,
      cantidad: cantidad},function(data){
        if (data.status === 200) {
          console.log("Saldo actualizado");
        }
      });
      console.log("Ingreso correcto");
      //window.location.reload();
    }
  })
}

function ingresoMes(iban, interesAnual, saldo){
  iban=iban;
  cantidad=(saldo*interesAnual)/12;
  tipo="intereses";
  $.post("/banco/php/nuevoMovimiento.php", {iban: iban,
    tipo: tipo,
  cantidad: cantidad},function(data){
    if (data.status === 200) {
      $.post("/banco/php/actualizarSaldo.php", {iban: iban,
      cantidad: cantidad},function(data){
        if (data.status === 200) {
          console.log("Saldo actualizado");
        }
      });
      console.log("Ingreso mes correcto");
      //window.location.reload();
    }
  })
}

function movimientosView(iban) {
  let i = 0;
    html = "<h2>Movimientos</h2><ol>";
    $.get("/banco/php/movimientos.php",{iban: iban},function(data){
      movimientos=data.message;
      while (i < movimientos.length) {
        html =
          html +
          `<li id="movimiento" data-my-id="${i}"> ${movimientos[i].tiempo}, ${movimientos[i].tipo}, ${movimientos[i].cantidad}</li>`;
        i = i + 1;
      }
      html= html + `</ol><button type="submit" onclick="location.reload()" id="back">Volver</button>`;
      $("#main").html(html);
      $("#pantalla").html("");
    });
}

function rojosView(iban) {
  $.post("/banco/php/cuenta.php", { iban: iban }, function (data) {
    let cuenta = data.message;
    if(cuenta.saldo<0){
      $("#pantalla").html("Esta en rojos");
      $("#pantalla").css("color","red");
    }else{
      $("#pantalla").html("No esta en rojos");
      $("#pantalla").css("color","black");
    }
  });
}