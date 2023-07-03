
// Clase Carrito
class Carrito {
    constructor() {
        this.carrito = [];
    }


    buscarIndexProducto(id) {
        return this.carrito.findIndex(p => p.id === id);
    };

    buscarProductoPorId(id) {
        return this.carrito.find(producto => producto.id === id);
    }

    buscarProductoPorNombre(nom) {
        const nombre = nom.toUpperCase();
        return this.carrito.find(producto => producto.nombre === nombre);
    }

    consultarProductos() {
        return this.carrito;
    }

    agregarProducto(producto, cantidad) {
        const index = this.buscarIndexProducto(producto.id);
        if (index >= 0) {
            this.carrito[index].cantidad += cantidad;
            this.carrito[index].stock -= cantidad;
            return true;
        } else {
            producto.cantidad = cantidad;
            producto.stock -= cantidad;
            this.carrito.push(producto);
            return false;
        }

    }

    eliminarProducto(id) {
        const posicion = this.buscarIndexProducto(id);
        if (posicion >= 0) {
            this.carrito.splice(posicion, 1);
        }
        return this.consultarProductos().length;
    }

    sumarCantidad(id) {
        const index = this.buscarIndexProducto(id);
        if (this.carrito[index].stock <= 0) {
            return this.carrito[index].cantidad;
        }
        this.carrito[index].cantidad += 1;
        this.carrito[index].stock -= 1;
        return this.carrito[index].cantidad;
    }

    restarCantidad(id) {
        const index = this.buscarIndexProducto(id);
        if (this.carrito[index].cantidad <= 0) {
            return this.carrito[index].cantidad;
        }
        this.carrito[index].cantidad -= 1;
        this.carrito[index].stock += 1;
        return this.carrito[index].cantidad;
    }

    calcularTotal(){
        //precio total del carrito
    return this.carrito.reduce((ac, productoCarrito) => {
        return ac + (productoCarrito.precio * productoCarrito.cantidad);
    }, 0);

    }

    comprarRealizada(){
        const compra = this.carrito;
        this.carrito = [];
        return compra;
    }

}

// Instancia de Carrito
export const carrito = new Carrito();