let arraySeries = [];


function abrirFichero() {

    var script = document.createElement('script');
    script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
    script.type = 'text/javascript';

    $(document).ready(function() {
        $.ajax({
            type: "GET",
            url: "series.json",
            dataType: "json",
            success: jsonParser
        });
    });

}

function jsonParser(json) {

    $('#load').fadeOut();

    let arraySeries = json;

    var tablaFinal = "<table><tr>";

    tablaFinal += "<td>Titulo</td>";
    tablaFinal += "<td>Cadena</td>";
    tablaFinal += "<td>Director</td>";
    tablaFinal += "<td>Año</td>";
    tablaFinal += "<td>Terminada</td></tr>";


    for (var celda of arraySeries) {

        let colorAnno = "";
        let terminada = "";

        if (celda.Año < 2000) colorAnno = "rojo";
        else if (celda.Año >= 2001 && celda.Año <= 2010) colorAnno = "amarillo";
        else if (celda.Año >= 2011) colorAnno = "verde";

        if (celda.Terminada == "Sí") terminada = "resources/true.png";
        else terminada = "resources/false.png";

        tablaFinal += "<td id='tituloTD'>" + celda.Titulo + "</td>";
        tablaFinal += "<td id='cadenaTD'>" + celda.Cadena + "</td>";
        tablaFinal += "<td id='directorTD'>" + celda.Director + "</td>";
        tablaFinal += "<td id='annoTD' class=" + colorAnno + "> " + celda.Año + "</td>";
        tablaFinal += "<td id='terminadaTD'> <img src=" + terminada + " width='20px'></td></tr>";
    }
    tablaFinal += "</table>";
    document.body.innerHTML = tablaFinal;

    console.log(arraySeries);

}

window.onload = abrirFichero;