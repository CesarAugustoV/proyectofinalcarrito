// Definir la clase Inventario
class Inventario {
    constructor() {
        this.productos = [];
    }

    agregarProducto = (producto) => {
        this.productos.push(producto);
    };

    filtrarPrecio(min, max) {
        const productosFiltrados = this.productos.filter((productos) => {
            return productos.precio >= min && productos.precio <= max;
        });
        return productosFiltrados;
    }

    filtrarCategoria(categoriaProducto) {
        const categoria = categoriaProducto.toUpperCase();
        if (categoria === 'TODOS') {
            return this.productos;
        }
        return this.productos.filter(cat => cat.categoria == categoria);
    }

    filtrarCategoriaPrecio(categoriaProducto, min, max) {
        const categoria = categoriaProducto.toUpperCase();
        const productos = this.productos.filter((producto) => {
            return producto.categoria == categoria && producto.precio >= min && producto.precio <= max;
        });
        return productos;
    }

    buscarIndexProducto(nombre) {
        return this.productos.findIndex(p => p.nombre === nombre);
    }

    buscarIndexProductoId(id) {
        return this.productos.findIndex(p => p.id === id);
    }

    actualizarStock(nombre, cantidad) {
        const index = this.buscarIndexProducto(nombre);
        this.productos[index].stock += cantidad;
        return this.productos[index];
    }

    consultarProductos() {
        return this.productos;
    }

    buscarProductoPorNombre(nom) {
        const nombre = nom.toUpperCase();
        return this.productos.find(producto => producto.nombre === nombre);
    }

    buscarProductoPorId(id) {
        return this.productos.find(producto => producto.id === id);
    }

    productoEliminadoCarrito(id, can) {
        const cantidad = parseInt(can);
        const index = this.buscarIndexProductoId(id);
        this.productos[index].stock += cantidad;
        this.productos[index].cantidad -= cantidad;
        return this.productos[index];
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

    compraRealizada(carrito){
        for(let productos of carrito){
            const index = this.buscarIndexProductoId(productos.id);
            this.productos[index].cantidad = 0;
        }
    }
}

// Crear una instancia de Inventario
export const inventario = new Inventario();