//clases
import {
    Producto,
    claseInventario,
    claseCarrito,
    claseProductosManager,
    Orden,
    ordenes
} from './clases';

import {
    guardarLocal,
    notificaciones,
    btnBloqueo,
    añadirProductosPrincipales
} from './usesCases';


//libreria
import {
    v4 as uuidv4
} from 'uuid';

// Obtener elementos del DOM
const bodyInventario = document.querySelector('#bodyInventario'), // Cuerpo de la tabla de inventario
    productosContainer = document.querySelector('#productosContainer'), // Contenedor de productos en el HTML
    total = document.querySelector('#total'), // Elemento de total
    btnFiltrar = document.querySelector('#btnFiltrar'),
    ordenar = document.querySelector('#ordenar'),
    carritoCantidad = document.querySelector('#carritoCantidad'),
    btnEliminarFiltros = document.querySelector('#eliminarFiltros'),
    precioMinimo = document.querySelector('#precioMinimo'),
    precioMinimoValue = document.querySelector('#precioMinimoValue'),
    precioMaximo = document.querySelector('#precioMaximo'),
    precioMaximoValue = document.querySelector('#precioMaximoValue');

// referencia a componentes de bootstrap
//carrito
const myOffcanvas = document.getElementById('offcanvasRight');
const bsOffcanvas = new bootstrap.Offcanvas(myOffcanvas);
//filtros
const offcavasfiltros = document.getElementById('offcanvasExample');
const bsoffcavasfiltros = new bootstrap.Offcanvas(offcavasfiltros);


const modalFormulario = new bootstrap.Modal(document.getElementById('staticBackdrop'), {
    focus: false
});


//instanciamos formatter para dar formato al precio.
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

const agregarProductoInventario = (nom, pre, sto, cate, marca, caracteristicas, identificador) => {
    //parseamos
    const id = identificador ? identificador : uuidv4(),
        nombre = nom.toUpperCase(),
        precio = parseInt(pre),
        stock = parseInt(sto),
        categoria = cate.toUpperCase();

    //INSTANCIA PRODUCTO
    const producto = new Producto(id, nombre, precio, stock, categoria, marca, caracteristicas);
    claseInventario.agregarProducto(producto);
    agregarProductosInvetarioHtml(producto);
    guardarLocal('inventario');
};

const agregarProductosInvetarioHtml = (productoActualizado) => {
    //añadimos al html
    // Crear el elemento del producto
    const productoDiv = document.createElement('div');
    productoDiv.id = 'productoInventarioHtml';
    productoDiv.classList.add('producto', 'justify-content-center', 'col-lg-4', 'col-md-6');
    const caracteristicasHtml = productoActualizado.caracteristicas.map((caracteristica) => `<li>${caracteristica.nombre} : ${caracteristica.valor}</li>`)



    // Crear el contenido del producto
    const productoHTML = `
    <form class="row justify-content-center shadow py-5">
    <div class="col-6">
        <div id="carousel-${productoActualizado.nombre}" class="carousel carousel-dark slide" data-bs-ride="carousel">
        <div class="carousel-indicators">
            <button type="button" data-bs-target="#carousel-${productoActualizado.nombre}" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carousel-${productoActualizado.nombre}" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carousel-${productoActualizado.nombre}" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
            <div class="carousel-inner">
                <div class="carousel-item active" data-bs-interval="10000">
                    <div class="carousel-image-container">
                        <img src="../assets/img/${productoActualizado.nombre}.jpg" class="d-block w-100 img-fluid carousel-image" alt="...">
                    </div>
                </div>
                <div class="carousel-item" data-bs-interval="2000">
                    <div class="carousel-image-container">
                        <img src="../assets/img/${productoActualizado.nombre}2.jpg" class="d-block w-100 img-fluid carousel-image" alt="...">
                    </div>
                </div>
                <div class="carousel-item">
                    <div class="carousel-image-container">
                        <img src="../assets/img/${productoActualizado.nombre}3.jpg" class="d-block w-100 img-fluid carousel-image" alt="...">
                    </div>
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carousel-${productoActualizado.nombre}"
                data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carousel-${productoActualizado.nombre}"
                data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>    
    </div>
    <div class="col-6 row justify-content-center">
        <div class="col-12">
            <div class="col-12">
                <p class="lead">
                    ${productoActualizado.marca.toUpperCase()}
                </p>
                <h4 class="card-title productoNombre">
                    ${productoActualizado.nombre}
                </h4>
                <input name="id" class="card-title idProductoInventario visually-hidden"
                    value="${productoActualizado.id}" readonly></input>
                <p>
                    stock:
                    <span class="card-text productoStock">${productoActualizado.stock}</span>
                </p>
            </div>
        </div>
        <div class="col-12">
            <p>Precio: <h4>${formatter.format(productoActualizado.precio)}</h4>
            </p>
            <p>Precio Socio: <span
                    class="card-text productoPrecio">${formatter.format(productoActualizado.precio-(productoActualizado.precio*0.2))}</span>
            </p>
            <p>Cantidad: <input name="cantidad" type="number" min="1" max="10" class="productoCantidad text-center"
                    value="1"></input></p>
        </div>
    </div>
    <div class="col-12 my-3 descripcion">
        <div class="accordion" id="accordionExample">
            <div class="accordion-item">
                <h2 class="accordion-header" id="headingOne">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#${productoActualizado.nombre}" aria-expanded="false"
                        aria-controls="${productoActualizado.nombre}">
                        Descripcion
                    </button>
                </h2>
                <div id="${productoActualizado.nombre}" class="accordion-collapse collapse"
                    aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                        <ol>
                            ${caracteristicasHtml.join('')}
                            <li class="card-text productoCategoria">${productoActualizado.categoria.toLowerCase()}
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-12 row justify-content-center align-items-center">
        <button name="comprar" class="col-6 btn mt-2 btn-dark btnComprar">
      Comprar</button>
    </div>
</form>
    `;

    // Agregar el contenido al elemento del producto
    productoDiv.innerHTML = productoHTML;

    const btnComprar = productoDiv.querySelector('.btnComprar');

    btnComprar.addEventListener('click', event => {
        event.preventDefault();
        const formulario = event.target.closest('form');

        const cantidad = parseInt(formulario.querySelector('.productoCantidad').value);
        const stock = parseInt(formulario.querySelector('.productoStock').textContent);

        if (cantidad > stock) {
            alert(`No tenemos stock disponible`);
            return;
        }

        formulario.querySelector('.productoStock').textContent = stock - cantidad;

        agregarProductoCarrito(productoActualizado.id, cantidad);

        notificaciones('productoAgregado');

        btnBloqueo(btnComprar);


    });

    productosContainer.appendChild(productoDiv);
};



const actualizarStockProductos = (id) => {
    const producto = claseInventario.buscarProductoPorId(id);
    const elementos = document.querySelectorAll('.idProductoInventario');
    for (let i = 0; i < elementos.length; i++) {
        if (elementos[i].value == id) {
            const padre = elementos[i].parentNode.parentNode;
            const etiquetaStock = padre.querySelector('.productoStock');
            etiquetaStock.textContent = producto.stock;
            return;
        }
    }
};

const actualizarTotal = () => {

    const totalPrecio = claseCarrito.calcularTotal();
    total.textContent = formatter.format(totalPrecio);

    return totalPrecio;
};

const actualizarNumeroCarrito = () => {
    const productosEnCarrito = claseCarrito.consultarProductos();
    const numeroProductoCarrito = productosEnCarrito.reduce((ac, productosEnCarrito) => {
        return ac + productosEnCarrito.cantidad;
    }, 0);

    carritoCantidad.textContent = numeroProductoCarrito;
}

const eliminarProductoCarrito = (id, event, cantidad) => {

    const ultimo = claseCarrito.eliminarProducto(id);

    if (ultimo == 0) {
        document.querySelector('#btnPagar').remove();
    }

    claseInventario.productoEliminadoCarrito(id, cantidad);

    const tr = event.target.parentNode.parentNode;

    actualizarTotal();

    tr.remove();

    actualizarStockProductos(id);
    guardarLocal('carrito');
    actualizarNumeroCarrito();
};

const actualizarTotalParcial = (id, input) => {
    const {
        precio,
        cantidad
    } = claseCarrito.buscarProductoPorId(id);
    const totalParcial = input.parentNode.parentNode.querySelector('.totalParcial');
    totalParcial.textContent = formatter.format(precio * cantidad);
}


const actualizarCantidadCarrito = (id, operacion, input) => {
    if (operacion == 'resta') {
        input.value = claseCarrito.restarCantidad(id);
        actualizarTotalParcial(id, input);
        actualizarTotal();
        actualizarStockProductos(id);
        guardarLocal('carrito');
        actualizarNumeroCarrito();
    } else if (operacion == 'suma') {
        input.value = claseCarrito.sumarCantidad(id);
        actualizarTotalParcial(id, input);
        actualizarTotal();
        actualizarStockProductos(id);
        guardarLocal('carrito');
        actualizarNumeroCarrito();
    }
};



// Crear una tabla de registro de inserción en el inventario
const agregarProductoCarrito = (id, cantidad) => {

    const producto = claseInventario.buscarProductoPorId(id);
    const ExisteProductoEnCarrito = claseCarrito.agregarProducto(producto, cantidad);
    const totalCarrito = claseCarrito.calcularTotal();
    total.textContent = formatter.format(totalCarrito);

    actualizarNumeroCarrito();
    actualizarStockProductos(id);
    guardarLocal('carrito');

    if (ExisteProductoEnCarrito) {

        let productosCarritoHtml = document.querySelectorAll('.idProducto');

        for (let i = 0; i < productosCarritoHtml.length; i++) {
            if (productosCarritoHtml[i].textContent == producto.id) {
                const padre = productosCarritoHtml[i].parentNode;
                const etiquetaCantidad = padre.querySelector('.cantidadProducto');
                const etiquetaTotalParcial = padre.querySelector('.totalParcial');
                etiquetaCantidad.value = producto.cantidad;
                etiquetaTotalParcial.textContent = formatter.format(producto.cantidad * producto.precio);
            }
        };

    } else {

        const fila = document.createElement('tr');

        const numeroProducto = document.createElement('th');
        numeroProducto.textContent = producto.id;
        numeroProducto.className = 'idProducto d-none';
        fila.appendChild(numeroProducto);

        const imgProducto = document.createElement('img');
        imgProducto.className = 'imgTabla';
        imgProducto.src = `../assets/img/${producto.nombre}.jpg`;
        fila.appendChild(imgProducto);

        const nombreProducto = document.createElement('td');
        nombreProducto.textContent = producto.nombre;
        nombreProducto.className = 'nombreProducto text-center';
        fila.appendChild(nombreProducto);

        const precioProducto = document.createElement('td');
        precioProducto.textContent = formatter.format(producto.precio);
        precioProducto.className = 'precioProducto';
        fila.appendChild(precioProducto);


        const restarProducto = document.createElement('td');
        const restarBtn = document.createElement('button');
        restarBtn.textContent = '-';
        restarBtn.className = 'restarCantidad btn btn-warning  me-2';
        restarProducto.appendChild(restarBtn);
        fila.appendChild(restarProducto);

        const cantidadProducto = document.createElement('td');
        const inputCantidad = document.createElement('input');
        inputCantidad.type = 'number';
        inputCantidad.className = 'cantidadProducto text-center';
        inputCantidad.style.width = '2.6rem';
        inputCantidad.value = producto.cantidad;
        inputCantidad.readOnly = true; // Añadir propiedad readonly
        cantidadProducto.appendChild(inputCantidad);
        fila.appendChild(cantidadProducto);

        const sumarProducto = document.createElement('td');
        const sumarBtn = document.createElement('button');
        sumarBtn.textContent = '+';
        sumarBtn.className = 'sumarCantidad btn btn-success';
        sumarProducto.appendChild(sumarBtn);
        fila.appendChild(sumarProducto);


        const totalParcial = document.createElement('td');
        totalParcial.textContent = formatter.format(producto.cantidad * producto.precio);
        totalParcial.className = 'totalParcial text-center';
        fila.appendChild(totalParcial);

        const botonBorrar = document.createElement('td');
        botonBorrar.className = 'text-center'
        const btnBorrar = document.createElement('input');
        btnBorrar.className = 'btnBorrar btn btn-danger';
        btnBorrar.type = 'button';
        btnBorrar.value = 'X';
        botonBorrar.appendChild(btnBorrar);
        fila.appendChild(botonBorrar);

        //eventos
        btnBorrar.addEventListener('click', (event) => {
            eliminarProductoCarrito(producto.id, event, inputCantidad.value);
            notificaciones('productoEliminado');
        });

        restarBtn.addEventListener('click', (ev) => {
            if (inputCantidad.value == '1') {
                eliminarProductoCarrito(producto.id, ev, inputCantidad.value);
                return;
            }
            actualizarCantidadCarrito(producto.id, 'resta', inputCantidad);
            notificaciones('cantidadActualizada');
            btnBloqueo(restarBtn);

        });

        sumarBtn.addEventListener('click', (ev) => {
            if (producto.stock <= 0) {
                alert('Se ha agotado el stock');
                return;
            }
            actualizarCantidadCarrito(producto.id, 'suma', inputCantidad);
            notificaciones('cantidadActualizada');
            btnBloqueo(sumarBtn);
        });


        bodyInventario.appendChild(fila);

        //añadir el boton pagar
        if (claseCarrito.consultarProductos().length == 1) {
            const seccionComprar = document.querySelector('#seccionComprar');

            const td = document.createElement('td');

            const btnPagar = document.createElement('input');
            btnPagar.id = 'btnPagar';
            btnPagar.type = 'button';
            btnPagar.value = 'Pagar';
            btnPagar.classList = 'btn btn-success'

            td.appendChild(btnPagar);

            seccionComprar.appendChild(td);

            btnPagar.addEventListener('click', (ev) => {
                modalFormulario.show();
                bsOffcanvas.hide();
                crearOrden(ev.target);
            });

        };
    }
};

// evento para el precio rango input
precioMinimo.addEventListener('input', (ev) => {
    precioMinimoValue.textContent = ev.target.value;
});

precioMaximo.addEventListener('input', (ev) => {
    precioMaximoValue.textContent = ev.target.value;
});

// Evento para filtrar productos
btnFiltrar.addEventListener('click', (event) => {
    event.preventDefault();
    const categoria = document.querySelector('#filtrarCategoria').value;

    const precioMinimo = document.querySelector('#precioMinimo').value ? document.querySelector('#precioMinimo').value : '0';
    const precioMaximo = parseInt(precioMinimo) > parseInt(document.querySelector('#precioMaximo').value) ? null : document.querySelector('#precioMaximo').value;

    if ((categoria == 0 && !precioMinimo && !precioMaximo) || (categoria == 0 && precioMaximo <= 10) || (categoria && !precioMaximo)) {
        alert('Debes ingresar un valor válido');
        return;
    }

    console.log(precioMinimo, precioMaximo);

    const productosFiltrados = claseProductosManager.filtrar(categoria, precioMinimo, precioMaximo);

    mostrarProductosOrdenados(productosFiltrados);

    notificaciones('filtro');
    bsoffcavasfiltros.hide();

});

ordenar.addEventListener('input', (ev) => {
    //evalua si el evento trae 0, sale de la funcion, sino es 0 ordena los productos, retorna y ejecuta mostrar productos
    notificaciones('orden');
    return ev.target.value === '0' ? null : mostrarProductosOrdenados(claseProductosManager.ordenarProductos(ev.target.value));
});

btnEliminarFiltros.addEventListener('click', () => {
    notificaciones('eliminarFiltro');
    bsoffcavasfiltros.hide();
    eliminarFiltros();
});


const mostrarProductosOrdenados = (productosOrdenados) => {
    productosContainer.innerHTML = '';

    for (let producto of productosOrdenados) {
        agregarProductosInvetarioHtml(producto);
    }

};

const eliminarFiltros = () => {

    productosContainer.innerHTML = '';

    const productosInventario = claseInventario.consultarProductos();
    for (let producto of productosInventario) {
        agregarProductosInvetarioHtml(producto);
    }

    claseProductosManager.eliminarFiltros(productosInventario);
};



const cargarLocal = () => {

    const productosInventarioLocal = localStorage.getItem('productosInventario');

    if (productosInventarioLocal) {
        const datosObjeto = JSON.parse(productosInventarioLocal);

        for (const elemento of datosObjeto) {
            const {
                id,
                nombre,
                precio,
                categoria,
                stock,
                marca,
                caracteristicas
            } = elemento;
            agregarProductoInventario(nombre, precio, stock, categoria, marca, caracteristicas, id);
        }
    } else {
        añadirProductosPrincipales(agregarProductoInventario);
    };

    const productosCarritoLocal = localStorage.getItem('productosCarrito');
    if (productosCarritoLocal) {
        const datosObjeto = JSON.parse(productosCarritoLocal);
        for (const elemento of datosObjeto) {
            const {
                id,
                cantidad
            } = elemento;
            agregarProductoCarrito(id, cantidad);
        }
    };
};

cargarLocal();

//geolocalizacion
placeSearch({
    key: '8WtQWz8eDy1KRZ15W8y9IPsMNU69iNbZ',
    container: document.querySelector('#direccion')
});

const crearOrden = () => {

    const carrito = claseCarrito.consultarProductos();
    const total = claseCarrito.calcularTotal();

    const formulario = document.querySelector('#myForm');

    formulario.addEventListener('submit', (ev) => {

        const formData = new FormData(formulario);

        let nombre = formData.get('nombre');
        let apellido = formData.get('apellido');
        let correo = formData.get('correo');
        let ciudad = formData.get('ciudad');
        let direccion = formData.get('direccion');

        const orden = new Orden(uuidv4(), nombre, apellido, correo, ciudad, direccion, carrito, total, false);

        ordenes.agregarOrden(orden);

        guardarLocal('orden', orden);
        
        ev.preventDefault();

        for (const nodo of ev.target) {
            nodo.setAttribute("readonly", "");
        }

        // eliminar boton enviar
        ev.target.querySelector('#enviarDatos').classList.add('d-none');
        
        //mostrarbotones de paypal
        document.querySelector('#paypal-button-container').classList.remove("d-none");
        document.querySelector('#staticBackdropLabel').textContent = 'Metodo de pago';

    });

};

const pagado = (transaccion) => {
    const carritoHTML = document.querySelector('#bodyInventario');
    const btnPagar = document.querySelector('#btnPagar');
    const paypalButton = document.querySelector('#paypal-button-container');
    const myForm = document.querySelector('#myForm');
    const btnEnviar = document.querySelector('#enviarDatos');
    
    carritoHTML.innerHTML = '';
    btnPagar.remove();
    paypalButton.classList.add('d-none');
    btnEnviar.classList.remove('d-none');
    
    myForm.reset();
    
    const inputs = myForm.querySelectorAll('.form-control');
    
    for (const input of inputs) {
        input.removeAttribute("readonly");
    }


    const compra = claseCarrito.comprarRealizada();
    claseInventario.compraRealizada(compra)

    actualizarTotal();
    actualizarNumeroCarrito();
    guardarLocal('carrito');
    guardarLocal('inventario');

    const orden = JSON.parse(localStorage.getItem('orden'));
    orden.pagado = true;
    orden.idPago = transaccion;
    guardarLocal('orden', orden);
    window.location.href='/factura.html';

};




//PAYPAL
paypal
    .Buttons({
        // Sets up the transaction when a payment button is clicked
        createOrder: function () {
            return fetch("/my-server/create-paypal-order", {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    // use the "body" param to optionally pass additional order information
                    // like product skus and quantities
                    body: JSON.stringify({
                        cart: claseCarrito.consultarProductos()
                    }),
                })
                .then((response) => response.json())
                .then((order) => order.id);
        },
        // Finalize the transaction after payer approval
        onApprove: function (data) {
            return fetch("/my-server/capture-paypal-order", {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        orderID: data.orderID,
                    }),
                })
                .then((response) => response.json())
                .then((orderData) => {
                    const transaction = orderData.purchase_units[0].payments.captures[0];
                    
                    modalFormulario.hide();
                    
                    pagado(transaction.id);



                    // Successful capture! For dev/demo purposes:
                    console.log(
                        "Capture result",
                        orderData,
                        JSON.stringify(orderData, null, 2)
                    );
                    alert(
                        "Transaction " +
                        transaction.status +
                        ": " +
                        transaction.id +
                        "\n\nSee console for all available details"
                    );
                    // When ready to go live, remove the alert and show a success message within this page. For example:
                    // var element = document.getElementById('paypal-button-container');
                    // element.innerHTML = '<h3>Thank you for your payment!</h3>';
                    // Or go to another URL:  actions.redirect('thank_you.html');
                });
        },
    })
    .render("#paypal-button-container");