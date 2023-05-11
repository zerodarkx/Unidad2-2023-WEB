let butonBuscar = document.getElementById('buscarPokemon');
butonBuscar.addEventListener('click', buscarPokemon);

let btn_siguiente = document.getElementById('btn_siguiente');
let btn_anterior = document.getElementById('btn_anterior');
let btn_todo = document.getElementById('btn_todo');
let cargando = document.getElementById('cargando');

let miModal = new bootstrap.Modal(document.getElementById('miModal'))

btn_siguiente.addEventListener('click', () => {
    listarPokemones(urlSiguiente)
})

btn_anterior.addEventListener('click', () => {
    listarPokemones(urlAnterior)
})

let urlInicio = `https://pokeapi.co/api/v2/pokemon/?limit=25&offset=1260`;
let urlSiguiente = '';
let urlAnterior = '';

btn_todo.addEventListener('click', () => {
    btn_siguiente.classList.remove('d-none');
    btn_todo.classList.add('d-none');
    listarPokemones(urlInicio)
})

let error_mensaje = document.getElementById('error_buscar');

function buscarPokemon() {
    let nombre_pokemon = document.getElementById('nombrePokemon').value;
    btn_todo.classList.remove('d-none');
    btn_siguiente.classList.add('d-none');
    btn_anterior.classList.add('d-none');

    if (nombre_pokemon !== '') {
        error_mensaje.classList.add('d-none');
        console.log(nombre_pokemon);

        let url = `https://pokeapi.co/api/v2/pokemon/${nombre_pokemon}`;

        let html = '';


        fetch(url)
            .then(respuesta => respuesta.json())
            .then(data => {
                console.log(data)

                let habilidades = '';

                for (let i = 0; i < data.abilities.length; i++) {
                    habilidades += `<li>${data.abilities[i].ability.name}</li>`;

                }
                html += `
                <div class="col-md-3">
                    <div class="card">
                        <img src="${data.sprites.front_default}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${data.name}</h5>
                            <p class="card-text">Tamaño : ${data.height} </p>
                            <ul>
                                ${habilidades}
                            </ul>
                            <button class="btn btn-primary" onclick="abrirModal('${url}')">Detalle</button>
                        </div>
                    </div>
                </div>
                `;

                document.getElementById('cuerpoDetalle').innerHTML = html;

            })
            .catch(err => {
                
                console.error("tuve un error")

                html += `
                    <div class="alert alert-danger mt-1" role="alert">
                        El nombre del Pokemon ingresado no es valido
                    </div>
                `;
                
                document.getElementById('cuerpoDetalle').innerHTML = html;
            })
    } else {
        error_mensaje.classList.remove('d-none');
        console.error('Favor ingresar un texto');
    }


}

async function listarPokemones(url) {
    cargando.classList.remove('d-none');
    document.getElementById('cuerpoDetalle').innerHTML = ''
    await fetch(url)
        .then(resultado => resultado.json())
        .then(async (data) => {
            if (data.next !== null) {
                urlSiguiente = data.next;
                btn_siguiente.classList.remove('d-none')
            } else {
                btn_siguiente.classList.add('d-none')
            }

            if (data.previous !== null) {
                urlAnterior = data.previous;
                btn_anterior.classList.remove('d-none')
            } else {
                btn_anterior.classList.add('d-none');
            }


            let cuerpo = '';

            for (let i = 0; i < data.results.length; i++) {
                let detalle = await obtenerDetallePokemon(data.results[i].url);
                // console.log(detalle)
                cuerpo += `
                <div class="col-md-3 mt-3">
                    <div class="card">
                        <div class="card-body">
                            <img src="${detalle.sprites.front_default}" class="card-img-top" alt="...">
                            <h5 class="card-title">${data.results[i].name}</h5>
                            
                            
                            <button class="btn btn-primary" onclick="abrirModal('${data.results[i].url}')">Detalle</button>
                        </div>
                    </div>
                </div>
                `;
            }

            document.getElementById('cuerpoDetalle').innerHTML = cuerpo;

        })

    cargando.classList.add('d-none')


}

async function obtenerDetallePokemon(url) {

    return await fetch(url)
        .then(resultado => resultado.json())
        .then(data => {
            // console.log(data)
            return data;
        })
}

async function abrirModal(url) {

    let detalle = await obtenerDetallePokemon(url);
    console.log(detalle)
    let habilidades = '';
    for (let i = 0; i < detalle.abilities.length; i++) {
        habilidades += `<li>${detalle.abilities[i].ability.name}</li>`;
    }

    let movimientos = '';
    for (let i = 0; i < detalle.moves.length; i++) {
        movimientos += `<li>${detalle.moves[i].move.name}</li>`;
    }

    let contenido = `
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">#${detalle.id} - ${detalle.name}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <div class="row justify-content-center">
                <div class="col-md-6">
                    <h3>Habilidades</h3>
                    <ul>
                        ${habilidades}
                    </ul>
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-md-6">
                    <h3>Movimientos</h3>
                    <ul>
                        ${movimientos}
                    </ul>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">CERRAR</button>
        </div>
    `;

    document.getElementById('cuerpoModal').innerHTML = contenido;

    miModal.show();
}

listarPokemones(urlInicio);

