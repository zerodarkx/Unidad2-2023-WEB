function buscarPokemon(){
    fetch('https://pokeapi.co/api/v2/pokemon/pikachu')
        .then(respuesta => respuesta.json())
        .then(data => {
            console.log(data)
            
            let nombre_pokemon = data.name;
            let habilidades = data.abilities;
            document.getElementById('main').innerHTML += nombre_pokemon + "<br>";

            for (let i = 0; i < habilidades.length; i++) {

                // console.log(habilidades[i]);
                console.log(habilidades[i].ability.name);
                let habilidad = habilidades[i].ability.name;
                document.getElementById('main').innerHTML += `habilidad : ${habilidad} <br>`;
                
            }




        })
        .catch(err => console.error(err))
}

buscarPokemon();

