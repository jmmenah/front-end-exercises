        //Contedor
        let inicial = JSON.stringify([
            {nombre: "Electroviral", cantante: "Supersubmarina", año: "2011", tipo: "indie", localizacion: "5",prestado:"Si"},
        ]);
        localStorage.setItem('discos', localStorage.getItem('discos') || inicial);
        // MODELO
        let discos = JSON.parse(localStorage.getItem('discos'));

        // VISTAS
        function indexView (discos) {
            let    i=0,   html = "<ul>";
            while(i < discos.length) {
              html = html + `<li id="show" data-my-id="${i}"> ${discos[i].nombre}</li>
              <button id="delete" data-my-id="${i}">Borrar</button>
              <button id="prestado" data-my-id="${i}">Prestar</button>
              <button id="devolver" data-my-id="${i}">Devolver</button>`;
              i = i + 1;
            };
            return html + `</ul> <button id="new">Añadir disco</button>`;
        };

        function showView (disco) {
            return `
            El disco <b> ${disco.nombre}</b>,
            del tipo <b> ${disco.tipo}</b> estrenado
            en el año <b> ${disco.año}</b>, por
            el grupo o cantante <b> ${disco.cantante}</b> 
            está localizado en el estante <b> ${disco.localizacion}</b>
            y se encuentra prestado :<b> ${disco.prestado}</b>.
            
            <p><button id="index"> Volver </button></p>`
        }
        function newView () {
            let pantalla=document.getElementById("pantalla");
            pantalla.innerHTML="";
            return `    <h1>Introduce los datos de un disco :</h1>

            <label for="disco">Nombre del disco: </label>
            <input type="text" name="nombre" id="nombre" pattern="[A-Za-z]{20,200}">
            <br><br>
            <label for="autor">Grupo o cantante: </label>
            <input type="text" name="autor" id="autor" pattern="[A-Za-z]{20,200}">
            <br><br>
            <label for="año">Año de publicacion: </label>
            <input type="number" id="año" name="año" min="1900" max="2021">
            <br><br>
            <label for="tipo">Tipo de musica :</label><br>
            <input type="radio" id="rock" name="tipo" value="rock">
            <label for="rock">Rock</label><br>
            <input type="radio" id="pop" name="tipo" value="pop">
            <label for="pop">Pop</label><br>
            <input type="radio" id="punk" name="tipo" value="punk">
            <label for="punk">Punk</label><br>
            <input type="radio" id="indie" name="tipo" value="indie">
            <label for="indie">Indie</label>
            <br><br>
            <label for="local">Localizacion: </label>
            <input type="number" id="local" name="local" min="0" max="20">
            <br><br>
            <label for="prestamo">Prestado :</label>
            <input type="radio" id="si" name="prestamo" value="Si">
            <label for="si">Si</label>
            <input type="radio" id="no" name="prestamo" value="No">
            <label for="no">No</label>
            <br><br>
            <button type="submit" id="create">Guardar</button>
            <button type="submit" id="back">Volver</button>`
        };
        

        // CONTROLADORES
        function indexContr() { document.getElementById("main").innerHTML = indexView(discos);};
        function showContr(i) { document.getElementById("main").innerHTML = showView(discos[i]);};
        function newContr() { document.getElementById("main").innerHTML = newView();};
        function deleteContr(i) {
            discos.splice(i,1);
            localStorage.setItem('discos', JSON.stringify(discos));
            indexContr();
            let pantalla=document.getElementById("pantalla");
                pantalla.innerHTML="Disco Borrado";
                pantalla.style="color:black";
        };
        function createContr() {
            nombre=document.getElementById("nombre").value;
            año=document.getElementById("año").value;
            cantante=document.getElementById("autor").value;
            localizacion=document.getElementById("local").value;
            tipos=document.querySelectorAll('input[name="tipo"]');
            let selectedTipo;
            for (const tipo of tipos) {
                if (tipo.checked) {
                    selectedTipo = tipo.value;
                    break;
                }
            }
            prestados=document.querySelectorAll('input[name="prestamo"]');
            let selectedPrestado;
            for (const prestado of prestados) {
                if (prestado.checked) {
                    selectedPrestado = prestado.value;
                    break;
                }
            }
            
            if( campo20(cantante) || campo20(nombre) || añoComp(año) ||locComp(localizacion)){
                
            }else{
            disco = {nombre: nombre, cantante: cantante, año: año, tipo: selectedTipo, localizacion: localizacion,prestado: selectedPrestado};
            discos.push(disco);
            localStorage.setItem('discos', JSON.stringify(discos));
            indexContr();
            let pantalla=document.getElementById("pantalla");
            pantalla.innerHTML="Disco Creado";
            pantalla.style="color:black";
            }
        };
        function prestadoContr(i){
            if(discos[i].prestado=="Si"){
                let pantalla=document.getElementById("pantalla");
                pantalla.innerHTML="El disco está prestado";
                pantalla.style="color:red";
            }else if(discos[i].prestado=="No"){
                discos[i].prestado="Si";
                localStorage.setItem('discos', JSON.stringify(discos));
                let pantalla=document.getElementById("pantalla");
                pantalla.innerHTML="Disco Prestado";
                pantalla.style="color:black";
            }
        }
        function devolverContr(i){
            if(discos[i].prestado=="Si"){
                let pantalla=document.getElementById("pantalla");
                pantalla.innerHTML="Disco devuelto";
                discos[i].prestado="No";
                pantalla.style="color:black";
                localStorage.setItem('discos', JSON.stringify(discos));
            }else if(discos[i].prestado=="No"){
                let pantalla=document.getElementById("pantalla");
                pantalla.innerHTML="El disco no está prestado";
                pantalla.style="color:red";
            }
        }
        function campo20(campo){
            if(campo.length < 20){
                let pantalla=document.getElementById("pantalla");
                pantalla.innerHTML="El campo es menor de 20 caracteres";
                pantalla.style="color:red";
                return true;
            }
        }
        function añoComp(campo){
            if(campo.toString(10).length != 4){
                let pantalla=document.getElementById("pantalla");
                pantalla.innerHTML="El campo es menor de 20 caracteres";
                pantalla.style="color:red";
                return true;
            }
        }
        function locComp(campo){
            if(isNaN(parseFloat(campo))){
                let pantalla=document.getElementById("pantalla");
                pantalla.innerHTML="No es un numero";
                pantalla.style="color:red";
                return true;
            }
            if(parseFloat(campo)>20){
                let pantalla=document.getElementById("pantalla");
                pantalla.innerHTML="Numero mayor que 20";
                pantalla.style="color:red";
                return true;
            }
        }
    
        // EVENTOS
        document.addEventListener('DOMContentLoaded', ev => indexContr());
        document.addEventListener('click', ev => {
            if      (ev.target.matches('#index')) indexContr();
            else if (ev.target.matches('#show'))  showContr(ev.target.dataset.myId);
            else if (ev.target.matches('#delete')) deleteContr(ev.target.dataset.myId);
            else if (ev.target.matches('#create')) createContr();
            else if (ev.target.matches('#new'))    newContr();
            else if (ev.target.matches('#prestado')) prestadoContr(ev.target.dataset.myId);
            else if (ev.target.matches('#devolver')) devolverContr(ev.target.dataset.myId);
            else if (ev.target.matches('#back'))    location.reload();
        })