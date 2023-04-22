function sumar ( n1, n2){
    let resultado = n1 + n2;

    return resultado;
}

// let res = sumar(4, 6);
// console.log(res);


function suma (n1, n2){
    let resultado = n1 + n2;

    console.log(resultado);
}

// suma(1, 1);

function saludarPersona(){
    let nombre = document.getElementById('nombre');
    // console.log(nombre.value);


    let mensaje = "Bienvenido usuario : " + nombre.value;


    document.getElementById('mensaje').innerHTML = mensaje;

    // alert(mensaje);
}

function mostrarEdad(){
    let edad = document.getElementById('edad').value;

    let mensaje = `La edad es ${edad}`;

    document.getElementById('resultado_edad').innerHTML = mensaje;

}

function apretar(){
    let text = document.getElementById('apretar').value;
    document.getElementById('resultado_apretar').innerHTML = text;
}

let boton = document.getElementById('apretame');

boton.addEventListener(
    'click',
    function(){
        alert("me apretaste")
    }
);