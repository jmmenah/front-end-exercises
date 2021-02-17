function cargarImagenes() {
    return new Promise(resolve => {
        fetch('https://api.giphy.com/v1/gifs/random?api_key=X8sxeq8LUkIFjPylMz2pqIaNm7zPptrR&tag=&rating=g')
            .then(function(response) {
                return response.text();
            })
            .then(function(data) {
                // console.log('data = ', data);
                resolve(JSON.parse(data));
            })
            .catch(function(err) {
                console.error(err);
            });
    })

}

async function iniciarPagina() {

    let imagenesArray = [];
    for (let index = 0; index < 4; index++) {
        let imagen = await cargarImagenes();
        console.log(imagen);
        imagenesArray.push(imagen.data.image_url);
    }

    // console.log(imagenesArray);

    imagenesArray.forEach(urlImagen => {
        document.body.innerHTML += "<img src='" + urlImagen + "' >"
    })
}

window.onload = iniciarPagina();

// CEoNJrc5V8yztj4fSHhMqBPwib6Hr8k6