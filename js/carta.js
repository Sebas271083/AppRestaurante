
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

btnGuardarPlato.addEventListener('click', agregarPlato)
btnCerrar.addEventListener('click', cerrar)

let editando;


if(usuarioActualizado) {
    btnAgregarPlato.classList.remove('disabled')
} 

localStorage.setItem("platosStorage", JSON.stringify(platos))

// const habilitarOrden = document.querySelector('.orden')

// const usuario = true;

// if( usuario === false ) {
//     habilitarOrden.classList.add('disabled')
// }

// const categorias = {
//     1:'Comida',
//     2:'Bebidas',
//     3:'Postres'
// }

// let platos =[{
//     "id": 1,
//     "imagen":"https://www.lavanguardia.com/files/og_thumbnail/files/fp/uploads/2021/03/30/6063031b90a87.r_d.1083-871-0.jpeg",
//     "nombre": "Pizza Chica",
//     "precio": 30,
//     "categoria": 1,
//     "cantidad": 3
//   },
//   {
//     "id": 2,
//     "imagen":"https://www.lavanguardia.com/files/og_thumbnail/files/fp/uploads/2021/03/30/6063031b90a87.r_d.1083-871-0.jpeg",
//     "nombre": "Pizza Mediana",
//     "precio": 50,
//     "categoria": 1,
//     "cantidad": 1
//   }]

//   console.log(platos)
  
  const nuevosplatos = platos.filter(plato => plato.id !== 2)
  console.log(platos)

const {id, imagen, nombre, precio, categoria, cantidad} = platos

console.log(nombreNuevoPlato.value)


console.log(usuarioActualizado)


// localStorage.setItem("platosStorage", JSON.stringify(platos))
let guardado = localStorage.getItem("platosStorage")

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

        limpiarHTML()
        mostrarPlatos()
        mensajeError('Editado correctamente')

        editando = false
        
        return
    }
    
    if(imagenNuevoPlato.value === '' || nombreNuevoPlato.value === '' || precioNuevoPlato.value === '' || categorioNuevoPlato.value === '') {
       return mensajeError('Todos los campos son obligatorios', 'error')
    }
    console.log('desde boton')
    platos.push({id:Math.round(Math.random()*100) , imagen:imagenNuevoPlato.value, nombre:nombreNuevoPlato.value, precio:parseInt(precioNuevoPlato.value), categoria:categorioNuevoPlato.value});
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
    
    mostrarPlatos(platos)

}
if(platos)
platos = JSON.parse(localStorage.getItem("platosStorage"))


function mostrarPlatos() {
    console.log(platos)

    platos.sort(((a, b) => a.categoria - b.categoria))

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
    }, 5000);
}


console.log(usuarioActualizado)






 


