
const contenido = document.querySelector('#platos .contenido')

const modal = document.querySelector('#formulario')
const idNuevoPlato = document.querySelector('#id')
const nombreNuevoPlato = document.querySelector('#nombre');
const precioNuevoPlato = document.querySelector('#precio');
const imagenNuevoPlato = document.querySelector('#imagen');
const categorioNuevoPlato = document.querySelector('#categoria');
const btnAgregarPlato = document.querySelector('#agregar')

const btnGuardarPlato = document.querySelector('#guardar-plato')
const btnCerrar = document.querySelector('#cerrar')



console.log(platos)


let editando;


if(usuarioActualizado) {
    btnAgregarPlato.classList.remove('disabled')
} 

function obtenerDatos() {
    const url = 'http://localhost:4000/platos'
        fetch(url)
            .then(respuesta => respuesta.json())
            .then(platos => utilizarJson(platos))
}

function utilizarJson(platos) {


console.log(platos)

btnGuardarPlato.addEventListener('click', agregarPlato)
btnCerrar.addEventListener('click', cerrar)



const nuevosplatos = platos.filter(plato => plato.id !== 2)
console.log(platos)

const {id, imagen, nombre, precio, categoria, cantidad} = platos

console.log(nombreNuevoPlato.value)


console.log(usuarioActualizado)


// localStorage.setItem("platosStorage", JSON.stringify(platos))
// let guardado = localStorage.getItem("platosStorage")

function agregarPlato () {
    // console.log(platos[0].id)
    // console.log(idNuevoPlato.value)

    // console.log(platos)
    // console.log(editando)

    // console.log(`el nombre es: ${nombreNuevoPlato.value}`)
    // console.log(platos)

    if(editando) {
        // console.log(platos[0].id)

        // console.log(`Este es el valor de Nombrediv ${nombreDiv}`)
        let platoEditado = platos.find(plato => plato.nombre === nombreDiv)
        console.log(`plato editado es: ${platoEditado.nombre}`)
        
        console.log(`el value es: ${nombreNuevoPlato.value}`)
        platoEditado.nombre = nombreNuevoPlato.value
        platoEditado.imagen = imagenNuevoPlato.value
        platoEditado.precio = precioNuevoPlato.value
        platoEditado.categoria = categorioNuevoPlato.value

        console.log(`el plato editado es : ${platoEditado.nombre}`)
        console.log(platos)

        localStorage.setItem("platosStorage", JSON.stringify(platos))

        limpiarHTML()
        mostrarPlatos()
        mensajeError('Editado correctamente')

        console.log(editando)

        editando = false
        
        return
    }
    
    if(imagenNuevoPlato.value === '' || nombreNuevoPlato.value === '' || precioNuevoPlato.value === '' || categorioNuevoPlato.value === '') {
       return mensajeError('Todos los campos son obligatorios', 'error')
    }
    console.log('desde boton')
    platos.push({id:Math.round(Math.random()*100) , imagen:imagenNuevoPlato.value, nombre:nombreNuevoPlato.value, precio:parseInt(precioNuevoPlato.value),    categoria:categorioNuevoPlato.value});
    console.log(platos)
    const swa = ()=> {
        Swal.fire
        ({
          title: `Guardado Correctamente`,
          text: `El plato ${nombreNuevoPlato.value} se guardo correctamente`,
          icon: 'success',
          button: "Ok!",
          toast: true,
          timer: 1500,
        })
      }
      swa()

    document.querySelector('.form').reset()

  
    localStorage.setItem("platosStorage", JSON.stringify(platos))
    let guardado = localStorage.getItem("platosStorage")

    console.log(`guardado: ${guardado}`)


    // console.log(`platos Storge : ${platosStorage}`)
    // platosObj = JSON.parse(platosStorage)
    // platosActualizados = localStorage.getItem('platosObj')

    // console.log(`platosActualizados : ${platosObj}`)
    

    
    console.log(`Esto es platos: ${platos}`)
    console.log(platos)
    
    if (localStorage.getItem("platosStorage") !== null ) {
    platos = JSON.parse(localStorage.getItem("platosStorage"))
    
    mostrarPlatos(platos)


}

}




function mostrarPlatos() {
    console.log(platos)
    if (localStorage.getItem("platosStorage") !== null ) {
        platos = JSON.parse(localStorage.getItem("platosStorage"))
    }
    console.log(platos)
    if( platos !== null ) {
    platos.sort(((a, b) => a.categoria - b.categoria))
    }
    limpiarHTML()
    
    platos.forEach(plato => {
        
    const { id, imagen, nombre, precio, categoria } = plato

    const row = document.createElement('DIV');
    row.classList.add('row', 'py-3', 'border-top');

    const imagenNueva = document.createElement('img');
    imagenNueva.classList.add('col-md-1', 'imagen')
    imagenNueva.setAttribute("src", imagen)

    const nombreDiv = document.createElement('DIV');
    nombreDiv.classList.add('col-md-3')
    nombreDiv.textContent = nombre;
   
    const precioDiv = document.createElement('DIV');
    precioDiv.classList.add('col-md-1', 'fw-bold', 'text-center');
    precioDiv.textContent = `$ ${precio}`;

    const categoriaDiv = document.createElement('DIV');
    categoriaDiv.classList.add('col-md-3', 'text-center' , 'fw-bold');
    categoriaDiv.textContent = categorias[categoria];

    const btnEditar = document.createElement('button');
    btnEditar.classList.add('col-md-1','btn', 'btn-success', 'btn-sm', 'me-3','mt-2', 'disabled');
    btnEditar.innerHTML = 'Editar'
    btnEditar.setAttribute("data-bs-target", "#formulario")
    btnEditar.setAttribute("data-bs-toggle", "modal")
    btnEditar.onclick = () => editarPlato(plato);
    if(usuarioActualizado) {
        btnEditar.classList.remove('disabled')
    } 
    
    
    const btnEliminar = document.createElement('button');
    btnEliminar.classList.add('col-md-1', 'btn', 'btn-sm', 'btn-danger', 'mt-2', 'disabled');
    btnEliminar.onclick = () => eliminarPlato(plato.id);
    if(usuarioActualizado) {
        btnEliminar.classList.remove('disabled')
    }

    
    btnEliminar.innerHTML = 'Eliminar'

    row.appendChild(imagenNueva)
    row.appendChild(nombreDiv);
    row.appendChild(precioDiv);
    row.appendChild(categoriaDiv);
    row.appendChild(btnEditar)
    row.appendChild(btnEliminar)

    
    contenido.appendChild(row);


    console.log(`esto es plato.id ${plato.id}`)

});


}


mostrarPlatos()

function limpiarHTML(){
    while(contenido.firstChild) {
        contenido.removeChild(contenido.firstChild)
    }
}

//Objeto con el plato

const platoObjeto = {
    id:'',
    imagen:'',
    nombre:'',
    precio:'',
    categoria:''
}



function editarPlato(platos) {
    let { id, imagen, nombre, precio, categoria } = platos

    idNuevoPlato.value = id
    nombreNuevoPlato.value = nombre
    precioNuevoPlato.value = precio
    imagenNuevoPlato.value = imagen
    categorioNuevoPlato.value = categoria
    

    imagenNueva = imagen
    precioDiv = precio
    nombreDiv = nombre
    categoriaDiv = categoria

    console.log(platos.precio)

    precio = precioNuevoPlato.value

    console.log(platos.precio)

    if(nombre) {
        btnGuardarPlato.textContent= "Editar"
        editando = true
    } 


}

function cerrar() {
    document.querySelector('.form').reset()
    btnGuardarPlato.textContent= "Guardar Plato"
}


function mensajeError(mensaje, tipo) {
    //Crear el div
    const divMensaje = document.createElement('div');
    divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12');

    // Agregar clase en base al tipo de error

    if(tipo === 'error') {
        divMensaje.classList.add('alert-danger');
    } else {
        divMensaje.classList.add('alert-success');
    }

    // Mensaje de error
    divMensaje.textContent = mensaje;

    //Agregar al DOM

    document.querySelector('.modal-content').insertBefore(divMensaje, document.querySelector('.modal-footer'))

    // Quitar la alerta despues de 5 segundos

    setTimeout( () => {
        divMensaje.remove();
    }, 1000);
}


console.log(usuarioActualizado)


function eliminarPlato(id) {
    console.log(id)
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success m-3' ,
          cancelButton: 'btn btn-danger m-3'
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


}





obtenerDatos()