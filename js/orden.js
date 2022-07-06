const contenidoOrden = document.querySelector('#platos .contenidoOrden')
const resumen = document.querySelector('#resumen')
const mesa = document.querySelector('#mesa');
const hora = document.querySelector('#hora');
const contenido = document.querySelector('.contenido')
const btnCalculo = document.querySelector('.calcular')
const btnCerrarPago = document.querySelector('.cerrar-pago')
const contenedorModalPago = document.querySelector('.contenedor-modal-pago')

console.log(platos)

btnCalculo.addEventListener ('click', calcularTotal)

btnCerrarPago.addEventListener('click', limpiarHTMLPago)

let pedido = [];
let subtotal = []
platos = JSON.parse(localStorage.getItem("platosStorage"))
let total = 0
let pedidoActualizado = []
let cantidad = 0


const btnGuardarCliente = document.querySelector('#guardar-cliente');
btnGuardarCliente.addEventListener('click', guardarCliente)

function guardarCliente ( ) {


    console.log(mesa.value)

    //Revisar si hay campos vacios
    // const camposVacios = [ mesa, hora ].some( campo => campo === '' )
    // if(camposVacios) {}

    if(mesa.value === '' || hora.value === '') {

        
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

    const mesaResumen = document.createElement('p')
    mesaResumen.classList.add('col-md-3')
    mesaResumen.textContent = `Mesa N° ${mesa.value}`
    resumen.appendChild(mesaResumen)

    obtenerPlatos()
    }


    function obtenerPlatos() {
        platos.sort(((a, b) => a.categoria - b.categoria))

        
        platos.forEach(plato => {
            
        const { id, imagen, nombre, precio, categoria } = plato
        
        const cantidad = 0
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

        const btnCantidad = document.createElement('button');
        btnCantidad.classList.add('col-md-1','btn', 'btn-success', 'btn-sm', 'me-3','mt-2');
        btnCantidad.innerHTML = 'Agregar'
        // btnCantidad.onclick = agregarPedido()
        // inputCantidad.value = 0;
        // inputCantidad.type = 'number';
        // inputCantidad.min = 0;
        // btnCantidad.id = `producto-${plato.id}`;
        // inputCantidad.classList.add('col-md-2', 'text-center' , 'fw-bold');
        btnCantidad.onclick = () => editarPedido(plato)
    
        row.appendChild(imagenNueva)
        row.appendChild(nombreDiv);
        row.appendChild(precioDiv);
        row.appendChild(categoriaDiv);
        row.appendChild(btnCantidad);
    
        contenidoOrden.appendChild(row);
    
        console.log(contenidoOrden)
        console.log(`esto es plato.id ${plato.id}`)

        console.log(plato)

    });
}
function editarPedido (platos) {
    resumen.classList.remove('d-none')
    let { id, imagen, nombre, precio, categoria } = platos

    console.log(pedido.id)
    console.log(id)
    const iguales = pedido.id === id
    console.log(iguales)
    console.log(pedido.length)
    if(pedido.length === 0) {
        pedido.push({
            id,
            nombre,
            precio,
            cantidad: 1
        })
    } else {
    
    if( pedido.some( ped => ped.id === id )) {
        console.log(pedido.some( ped => ped.id === id ))
        pedido.forEach(ped => {
                if(ped.id === id ) {
                    ped.cantidad += 1
                console.log('entra aca ?? ')
                console.log(ped.cantidad)
                } 
        }) 
    }  else {
        pedido.push({
            id,
            nombre,
            precio,
            cantidad: 1
        })
    }
    console.log('entra aca  ')   
}
    // pedidoActualizado = [...pedido, pedido]
        
    
    // pedidoActualizado = [...pedidoActualizado, pedido]
    // cantidad = cantidad + 1
    console.log(pedido)
    // console.log(pedidoActualizado)
    console.log(cantidad)
    cuentaresumen()

}



function calcularTotal() {


        if (total === 0 ) {

        const total = Object.values(pedido).reduce((acc, {cantidad, precio} ) => acc + cantidad * precio, 0)
        
                
        console.log(total)
        const contenidoPago = document.querySelector('.contenido-pago')
        
        const row = document.createElement('DIV');
        row.classList.add('row', 'py-3', 'border-top')

        const precioDivTotal = document.createElement('DIV');
        precioDivTotal.classList.add('col-md-4', 'fw-bold', 'text-center', 'mt-3');
        precioDivTotal.textContent = `$ ${total}`;
 
        row.appendChild(precioDivTotal);
        contenidoPago.appendChild(row);
        } 
}


function eliminarPedido (platos) {
    resumen.classList.remove('d-none')
    let { id, imagen, nombre, precio, categoria } = platos

    console.log(pedido.id)
    console.log(id)
    const iguales = pedido.id === id
    console.log(iguales)
    console.log(pedido.length)
    if(pedido.length === 0) {
        pedido.push({
            id,
            nombre,
            precio,
            cantidad: 1
        })
    } else {
    
    if( pedido.some( ped => ped.id === id )) {
        console.log(pedido.some( ped => ped.id === id ))
        pedido.forEach(ped => {
                if(ped.id === id ) {
                    ped.cantidad -= 1
                console.log('entra aca ?? ')
                console.log(ped.cantidad)
                } 
        }) 
    }  else {
        pedido.push({
            id,
            nombre,
            precio,
            cantidad: 1
        })
    }
    console.log('entra aca  ')   
}
    // pedidoActualizado = [...pedido, pedido]
        
    
    // pedidoActualizado = [...pedidoActualizado, pedido]
    // cantidad = cantidad + 1
    console.log(pedido)
    // console.log(pedidoActualizado)
    console.log(cantidad)
    cuentaresumen()

}


function cuentaresumen () {

    limpiarHTML()
    const cabecera = document.createElement('DIV');
    cabecera.classList.add('rwo','py-3', 'border-top', 'd-flex');

    const theadNombre = document.createElement('div')
    theadNombre.classList.add('col-md-3', 'fw-bold', 'text-center')
    theadNombre.textContent = "Nombre"
    const theadPrecio = document.createElement('div')
    theadPrecio.classList.add('col-md-3', 'fw-bold', 'text-center')
    theadPrecio.textContent = "Precio"
    const theadCantidad = document.createElement('div')
    theadCantidad.classList.add('col-md-3', 'fw-bold', 'text-center')
    theadCantidad.textContent = "Cantidad"
    
    cabecera.appendChild(theadNombre);
    cabecera.appendChild(theadPrecio);
    cabecera.appendChild(theadCantidad);

    contenido.appendChild(cabecera)


    
    pedido.forEach(platoPedido => {
            
        const { nombre,  precio, cantidad, id } = platoPedido
        if(cantidad >0 ) {
        const row = document.createElement('DIV');
        row.classList.add('row', 'py-3', 'border-top');
    
        const nombreDiv = document.createElement('DIV');
        nombreDiv.classList.add('col-md-3', id)
        nombreDiv.textContent = nombre;
       
        const precioDiv = document.createElement('DIV');
        precioDiv.classList.add('col-md-3', 'fw-bold', 'text-center', id);
        precioDiv.textContent = `$ ${precio}`;
 
        const cantidadDiv = document.createElement('DIV');
        cantidadDiv.classList.add('col-md-3', 'fw-bold', 'text-center', id);
        cantidadDiv.textContent = cantidad;
 
        const btnDisminuir = document.createElement('button');
        btnDisminuir.classList.add('col-md-1','btn', 'btn-danger', 'btn-sm', 'me-3','mt-2', id);
        btnDisminuir.innerHTML = 'Eliminar'
        btnDisminuir.onclick = () => eliminarPedido(platoPedido)
        
        
        
        row.appendChild(nombreDiv);
        row.appendChild(precioDiv);
        row.appendChild(cantidadDiv);
        row.appendChild(btnDisminuir);

        contenido.appendChild(row);
        
        if(cantidad === 0) {
            console.log('entra')
            nombreDiv.remove()
            precioDiv.remove()
            cantidadDiv.remove()
            btnDisminuir.remove()
        }
    }
    
    });

}

function limpiarHTML(){
    while(contenido.firstChild) {
        contenido.removeChild(contenido.firstChild)
    }
}

function limpiarHTMLPago () {
    document.querySelector('.contenido-pago').remove()
    total = 0
    const contenidoDiv = document.createElement('DIV');
    contenidoDiv.classList.add("mb-3", "contenido-pago")
    contenedorModalPago.appendChild(contenidoDiv);

}