export const notificaciones = (accion) => {

    const mensajes = [{
            productoAgregado: 'Producto añadido al carrito'
        },
        {
            cantidadActualizada: 'Cantidad actualizada.'
        },
        {
            productoEliminado: 'Producto Eliminado'
        },
        {
            filtro: 'Productos filtrados.'
        },
        {
            orden: 'Productos ordenados.'
        },
        {
            eliminarFiltro: 'Filtros eliminados.'
        }
    ];

    const mensaje = mensajes.find((element) => {
        return element.hasOwnProperty(accion);
    });

    Toastify({
        text: `${mensaje[accion]}`,
        duration: 2000,
        destination: "#", //URL
        newWindow: false,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
            padding: "1rem"
        },
        onClick: function () {} // Callback after click
    }).showToast();
};

export const btnBloqueo = (input) => {
    input.disabled = true;

    setTimeout(() => {
        input.disabled = false;
    }, 1500);
};