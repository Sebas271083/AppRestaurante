const nombre = document.querySelector("#nombreContacto") 
const email = document.querySelector("#emailContacto") 
const telefono = document.querySelector("#telefonoContacto")
const mensaje = document.querySelector("#mensajeContacto") 


const btnEnviar = document.querySelector('#enviar')


btnEnviar.addEventListener('click', enviarForm)


function enviarForm(e) {
    e.preventDefault()

    if(nombre.value === '' || email.value === '' || telefono.value === '' || mensaje.value === '') {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Todos los campos son obligatorios',
            footer: '<a href="">Porque tengo este problema?</a>'
          })
    } if (mensaje.value.length < 10) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El mensaje debe tener al menos 10 palabras',
            footer: '<a href="">Porque tengo este problema?</a>'
          })
    }
    else {
        console.log('desde el form')
        Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Tu consulta ha sido enviada',
        showConfirmButton: false,
        timer: 1500
        })
    }
  }
