function validar() {

    let nombre = document.getElementById('nombre').value;
    let apellido = document.getElementById('apellido').value;
    let edad = document.getElementById('edad').value;

    let mensaje = '';

    if (nombre == '') {
        //alert("ingresa el nombre");
        mensaje += 'Ingrese nombre \n';
    }

    if (apellido == '') {
        // alert("ingresa el apellido");
        mensaje += 'Ingrese apellido \n';
    }

    if (edad == '') {
        // alert("ingresa el edad");
        mensaje += 'Ingrese edad \n';
    }

    if (mensaje.length > 0) {
        alert(mensaje)
    }


}


let boton = document.getElementById('validar');

boton.addEventListener(
    'click',
    function (event) {
        event.preventDefault();

        let nombre = document.getElementById('nombre').value;
        let apellido = document.getElementById('apellido').value;
        let edad = document.getElementById('edad').value;

        let errorNombre = document.getElementById('errorNombre');
        let errorApellido = document.getElementById('errorApellido');
        let errorEdad = document.getElementById('errorEdad');

        let mensaje = '';

        if (nombre == '') {
            //alert("ingresa el nombre");
            // mensaje += 'Ingrese nombre \n';
            errorNombre.innerHTML = 'Ingrese nombre';
        }else{
            errorNombre.innerHTML = '';
        }

        if (apellido == '') {
            // alert("ingresa el apellido");
            // mensaje += 'Ingrese apellido \n';
            errorApellido.innerHTML = 'Ingrese apellido'
        }else{
            errorApellido.innerHTML = ''
        }

        if (edad == '') {
            // alert("ingresa el edad");
            // mensaje += 'Ingrese edad \n';
            errorEdad.innerHTML = 'Ingrese edad'
        }else{
            errorEdad.innerHTML = ''
        }

        if (mensaje.length > 0) {
            // alert(mensaje)
        }
    }
)