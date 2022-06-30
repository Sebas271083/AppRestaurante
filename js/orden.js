const contenidoOrden = document.querySelector('#platos .contenidoOrden')
console.log(platos)

// let cliente = {
//     mesa: '',
//     hora: '',
//     pedido: []
// };


// const categorias = {
//     1:'Comida',
//     2:'Bebidas',
//     3:'Postres'
// }


// localStorage.setItem("platosStorage", JSON.stringify(platos))
// let guardado = localStorage.getItem("platosStorage")

platos = JSON.parse(localStorage.getItem("platosStorage"))


const btnGuardarCliente = document.querySelector('#guardar-cliente');
btnGuardarCliente.addEventListener('click', guardarCliente)

function guardarCliente ( ) {
    const mesa = document.querySelector('#mesa').value;
    const hora = document.querySelector('#hora').value;

    //Revisar si hay campos vacios
    // const camposVacios = [ mesa, hora ].some( campo => campo === '' )
    // if(camposVacios) {}

    if(mesa === '' || hora === '') {

        
            const alerta = document.createElement('div'); 
            alerta.classList.add('invalid-feedback', 'd-block', 'text-center');
            alerta.textContent = 'Todos los campos son obligatorios'
            document.querySelector('.modal-body form').appendChild(alerta)

            //Eliminar Alerta
            setTimeout(() => {
                alerta.remove()
            }, 3000);
      
        return;
    }

    const modalFormulario = document.querySelector('#formulario');
    const modaBootstrap = bootstrap.Modal.getInstance(modalFormulario)
    modaBootstrap.hide()

    obtenerPlatos()
    }
    // // Asignar datos del formulario al cliente
    // cliente = {...cliente, mesa, hora}

    // //Ocultar Modal
    // const modalFormulario = document.querySelector('#formulario');
    // const modaBootstrap = bootstrap.Modal.getInstance(modalFormulario)
    // modaBootstrap.hide()

    function obtenerPlatos() {
        platos.sort(((a, b) => a.categoria - b.categoria))

        
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

        const inputCantidad = document.createElement('input');
        inputCantidad.value = 0;
        inputCantidad.type = 'number';
        inputCantidad.min = 0;
        inputCantidad.id = `producto-${plato.id}`;
        inputCantidad.classList.add('col-md-2', 'text-center' , 'fw-bold');
    
        // const btnEditar = document.createElement('button');
        // btnEditar.classList.add('col-md-1','btn', 'btn-success', 'btn-sm', 'me-3','mt-2');
        // btnEditar.innerHTML = 'Editar'
        // btnEditar.setAttribute("data-bs-target", "#formulario")
        // btnEditar.setAttribute("data-bs-toggle", "modal")
        // btnEditar.onclick = () => editarPlato(plato);
        
        
        // const btnEliminar = document.createElement('button');
        // btnEliminar.classList.add('col-md-1', 'btn', 'btn-sm', 'btn-danger', 'mt-2');
        // btnEliminar.onclick = () => eliminarPlato(plato.id);
    
    
        
        // btnEliminar.innerHTML = 'Eliminar'
    
        row.appendChild(imagenNueva)
        row.appendChild(nombreDiv);
        row.appendChild(precioDiv);
        row.appendChild(categoriaDiv);
        row.appendChild(inputCantidad);

        // row.appendChild(btnEditar)
        // row.appendChild(btnEliminar)
    
        
        contenidoOrden.appendChild(row);
    
        console.log(contenidoOrden)
        console.log(`esto es plato.id ${plato.id}`)
    });
}

console.log(platos)