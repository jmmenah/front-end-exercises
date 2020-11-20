
        // MODELO DE DATOS

        let mis_peliculas_iniciales = [
            {titulo: "Superlópez",   director: "Javier Ruiz Caldera", "miniatura": "files/superlopez.png"},
            {titulo: "Jurassic Park", director: "Steven Spielberg", "miniatura": "files/jurassicpark.png"},
            {titulo: "Interstellar",  director: "Christopher Nolan", "miniatura": "files/interstellar.png"}
        ];

        localStorage.mis_peliculas = localStorage.mis_peliculas || JSON.stringify(mis_peliculas_iniciales);

        // VISTAS
        const indexView = (peliculas) => {
            let i=0;
            let view = "";

            while(i < peliculas.length) {
              view += `
                <div class="movie">
                   <div class="movie-img">
                        <img data-my-id="${i}" src="${peliculas[i].miniatura}" onerror="this.src='files/placeholder.png'"/>
                   </div>
                   <div class="title">
                       ${peliculas[i].titulo || "<em>Sin título</em>"}
                   </div>
                   <div class="actions">
                        <!--Insertar aquí botones de "Show" y "Delete"-->
                        <button class="show" data-my-id="${i}">ver</button>
                        <button class="edit" data-my-id="${i}">editar</button>
                        <button class="delete" data-my-id="${i}">borrar</button>
                    </div>
                </div>\n`;
              i = i + 1;
            };

            view += `<div class="actions">
                        <button id="new">Añadir</button>
                        <button id="reset">Reset</button>
                    </div>`;

            return view;
        };

        const editView = (i, pelicula) => {
            return `<h2>Editar Película </h2>
                <div class="field">
                Título <br>
                <input  type="text" id="titulo" placeholder="Título" 
                        value="${pelicula.titulo}">
                </div>
                <div class="field">
                Director <br>
                <input  type="text" id="director" placeholder="Director" 
                        value="${pelicula.director}">
                </div>
                <div class="field">
                Miniatura <br>
                <input  type="text" id="miniatura" placeholder="URL de la miniatura" 
                        value="${pelicula.miniatura}">
                </div>
                <div class="actions">
                    <button class="update" data-my-id="${i}">
                        Actualizar
                    </button>
                    <button class="index">
                        Volver
                    </button>
                </div>
               `;
        }

        const showView = (pelicula) => {
            // Completar: genera HTML con información de la película
            return `
             <p>
            La pelicula <b> ${pelicula.titulo}</b>,
            ha sido dirigida por <b> ${pelicula.director}</b>.
                      
             </p>
             <div class="actions">
                <button class="index">Volver</button>
             </div>`;
        }

        const newView = () => {
            // Completar: genera formulario para crear nuevo quiz
            return `<h2>Crear Película</h2>
            <div class="field">
                Título <br>
                <input  type="text" id="titulo" placeholder="Título" 
                        >
                </div>
                <div class="field">
                Director <br>
                <input  type="text" id="director" placeholder="Director" 
                        >
                </div>
                <div class="field">
                Miniatura <br>
                <input  type="text" id="miniatura" placeholder="URL de la miniatura" 
                        >
                </div>
                <div class="actions">
                    <button id="create">Crear</button>
                    <button class="index">Volver</button>
                </div>`;
        }


        // CONTROLADORES 
        const indexContr = () => {
            let mis_peliculas = JSON.parse(localStorage.mis_peliculas);
            document.getElementById('main').innerHTML = indexView(mis_peliculas);
        };

        const showContr = (i) => {
            // Completar: controlador que muestra la vista showView(pelicula)
            let pelicula = JSON.parse(localStorage.mis_peliculas)[i];
            document.getElementById("main").innerHTML = showView(pelicula);
        };

        const newContr = () => {
            // Completar: controlador que muestra la vista newView()
            document.getElementById("main").innerHTML = newView();
        };

        const createContr = () => {
            // Completar: controlador que crea una película nueva en el modelo guardado en localStorage
            let titulo=document.getElementById("titulo").value;
            let director=document.getElementById("director").value;
            let miniatura=document.getElementById("miniatura").value;
            let pelicula = {titulo: titulo, director: director, miniatura: miniatura};
            let mis_peliculas = JSON.parse(localStorage.mis_peliculas);
            mis_peliculas.push(pelicula);
            localStorage.mis_peliculas = JSON.stringify(mis_peliculas);
            indexContr();
        };

        const editContr = (i) => {
            let pelicula = JSON.parse(localStorage.mis_peliculas)[i];
            document.getElementById('main').innerHTML = editView(i, pelicula);
        };

        const updateContr = (i) => {
            let mis_peliculas = JSON.parse(localStorage.mis_peliculas);
            mis_peliculas[i].titulo    = document.getElementById('titulo').value;
            mis_peliculas[i].director  = document.getElementById('director').value;
            mis_peliculas[i].miniatura = document.getElementById('miniatura').value;
            localStorage.mis_peliculas = JSON.stringify(mis_peliculas);
            indexContr();
        };

        const deleteContr = (i) => {
            // Completar:  controlador que actualiza el modelo borrando la película seleccionada
            // Genera diálogo de confirmación: botón Aceptar devuelve true, Cancel false
            let mis_peliculas = JSON.parse(localStorage.mis_peliculas);
            let opcion = confirm (`¿Está seguro de que desea borrarla?`);
            if(opcion === true){
            mis_peliculas.splice(i,1);
            localStorage.mis_peliculas = JSON.stringify(mis_peliculas);
            }
            indexContr();
        };

        const resetContr = () => {
            // Completar:  controlador que reinicia el modelo guardado en localStorage con las películas originales
            localStorage.clear();
            localStorage.mis_peliculas = localStorage.mis_peliculas || JSON.stringify(mis_peliculas_iniciales);
            indexContr();
        };

        // ROUTER de eventos
        const matchEvent = (ev, sel) => ev.target.matches(sel);
        const myId = (ev) => Number(ev.target.dataset.myId);

        document.addEventListener('click', ev => {
            if      (matchEvent(ev, '.index'))  indexContr  ();
            else if (matchEvent(ev, '.edit'))   editContr   (myId(ev));
            else if (matchEvent(ev, '.update')) updateContr (myId(ev));
            // Completar añadiendo los controladores que faltan
            else if (matchEvent(ev, '.show')) showContr (myId(ev));
            else if (matchEvent(ev, '#new')) newContr ();
            else if (matchEvent(ev, '#create')) createContr ();
            else if (matchEvent(ev, '.delete')) deleteContr (myId(ev));
            else if (matchEvent(ev, '#reset')) resetContr ();
        })
        
        
        // Inicialización        
        document.addEventListener('DOMContentLoaded', indexContr);