import {
    claseCarrito,
    claseInventario
} from '../clases'

//guardar en localstorage

export const guardarLocal = (bd, orden) => {
    //guardar carrito en localstorage
    if (bd == 'carrito') {
        const productosCarrito = claseCarrito.consultarProductos();
        const productosParseados = JSON.stringify(productosCarrito);
        localStorage.setItem('productosCarrito', productosParseados);
    }
    //guardarInventario en localstorage
    else if (bd == 'inventario') {
        const productosInventario = claseInventario.consultarProductos();
        const productosParseados = JSON.stringify(productosInventario);
        localStorage.setItem('productosInventario', productosParseados);

    } else if (bd == 'orden') {
        const productosParseados = JSON.stringify(orden);
        localStorage.setItem('orden', productosParseados)
    }

};