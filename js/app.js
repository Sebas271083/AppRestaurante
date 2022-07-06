
const habilitarOrden = document.querySelector('.orden')
const emailSesion = document.querySelector('#email')
const passSesion = document.querySelector('#password')
const btnIniciarSesion = document.querySelector('#iniciar-sesion')
const btnCerrarSesion = document.querySelector('#cerrar-sesion')


let usuario = false;

let usuarioActualizado = localStorage.getItem('usuarioActualizado')
console.log(usuarioActualizado)



let cliente = {
  mesa: '',
  hora: '',
  pedido: [{nombre:"",
            precio:"",
            cantidad: parseInt(0)}]
}

const categorias = {
    1:'Comida',
    2:'Bebidas',
    3:'Postres'
}

let platos =[{
    "id": 1,
    "imagen":"https://www.lavanguardia.com/files/og_thumbnail/files/fp/uploads/2021/03/30/6063031b90a87.r_d.1083-871-0.jpeg",
    "nombre": "Pizza Chica",
    "precio": 30,
    "categoria": 1,
    "cantidad": 3
  },
  {
    "id": 2,
    "imagen":"https://www.lavanguardia.com/files/og_thumbnail/files/fp/uploads/2021/03/30/6063031b90a87.r_d.1083-871-0.jpeg",
    "nombre": "Pizza Mediana",
    "precio": 50,
    "categoria": 1,
    "cantidad": 1
  }]

  platos.forEach(plato => {
      console.log(plato)
  });


  function guardarCliente(){
    const mesa = document.querySelector('#mesa').value
    const hora = document.querySelector('#hora').value

    //Revisar si algun campo esta vacio
    if(mesa === '' || hora === '') {
      const alerta = document.createElement('div')
      alerta.classList.add('invalid-feedback', 'd-block', 'text-center');
      alerta.textContent = 'Todos los campos son obligatorios'
    }
  }

btnIniciarSesion.addEventListener('click', iniciar)
btnCerrarSesion.addEventListener('click', cerrar)

console.log(usuario)

const swa = ()=> {
  Swal.fire
  ({
    title: `Bienvenido! ${emailSesion.value}`,
    text: 'Has iniciado sesión correctamente',
    icon: 'success',
    button: "Ok!",
    // showClass: {
    //   popup: 'animate__animated animate__fadeInDown'
    // },
    showClass: {
      popup: 'animate__animated animate__flip'
    },
    
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp'
    },
    
    toast: true,
    timer: 3000,
  })
}

  function iniciar () {
    if(passSesion.value === '123') {
      usuario = true
      habilitarOrden.style.visibility = 'visible'
      // habilitarOrden.classList.remove('disabled')
      localStorage.setItem('usuarioActualizado', usuario)
      swa()
    }  
    document.querySelector('.form').reset()
  }


  console.log(usuario)

  function cerrar () {
    habilitarOrden.style.visibility = 'hidden'
    localStorage.setItem('usuarioActualizado', '')
  }
  
  if(usuarioActualizado === 'true') {
    habilitarOrden.style.visibility = 'visible'
  } 


  function eliminarPlato(id) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: '¿Estas seguro que deseas eliminar este plato?',
        text: "No lo podras revertir!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, Borrar Plato!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            'Plato Borrado de la Carta!',
            '',
            'success'
            )
            platos = platos.filter(plato => plato.id !== id)
            // console.log(`el plato a eliminar es _ ${platoEliminado[0].nombre}`)
            localStorage.setItem("platosStorage", JSON.stringify(platos))
        
            let guardado = localStorage.getItem("platosStorage")
        
            console.log(`guardado: ${guardado}`)
            
            limpiarHTML()
            mostrarPlatos()
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelado',
            'El plato no se ha borrado :)',
            'error'
          )
        }
      })
}