let butonBuscar = document.getElementById('buscarPokemon');

butonBuscar.addEventListener('click', buscarPokemon);


function buscarPokemon() {
    let nombre_pokemon = document.getElementById('nombrePokemon').value;
    if (nombre_pokemon !== '') {
        console.log(nombre_pokemon);

        let url = `https://pokeapi.co/api/v2/pokemon/${nombre_pokemon}`; 
    
        let cuerpo = '';


        fetch(url)
            .then(respuesta => respuesta.json())
            .then(data => {
                console.log(data)

                let habilidades = '';

                for (let i = 0; i < data.abilities.length; i++) {
                    habilidades += `<li>${data.abilities[i].ability.name}</li>`;
                    
                }
                cuerpo += `
                <div class="col-md-3">
                    <div class="card">
                        <img src="${data.sprites.front_default}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${data.name}</h5>
                            <p class="card-text">Tamaño : ${data.height} </p>
                            <ul>
                                ${habilidades}
                            </ul>
                            <a href="#" class="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>
                </div>
                `;

                document.getElementById('cuerpoDetalle').innerHTML = cuerpo;

            })
            .catch(err => console.error("err"))
    } else {
        console.error('Favor ingresar un texto')
    }


}
