import {inventario} from './Inventario';

class ProductosManager {
    constructor() {
        this.productosFiltrados = [];
    }

    filtrar(categoria, precioMin, precioMax) {
        if (categoria && precioMin == '0' && precioMax == '0') {
            this.productosFiltrados = inventario.filtrarCategoria(categoria);
        } else if ((categoria == 0 || categoria == 'todos') && precioMin && precioMax) {
            this.productosFiltrados = inventario.filtrarPrecio(precioMin, precioMax);
        } else if (categoria && precioMin && precioMax) {
            this.productosFiltrados = inventario.filtrarCategoriaPrecio(categoria, precioMin, precioMax);
        }

        return this.productosFiltrados;
    }

    ordenarProductos(orden) {
        let productosOrdenados = [];
        
        if (orden === 'menor') {
            productosOrdenados = this.productosFiltrados.length > 0 ? [...this.productosFiltrados] : [...inventario.consultarProductos()];
            productosOrdenados.sort((a, b) => a.precio - b.precio);
        } else if (orden === 'mayor') {
            productosOrdenados = this.productosFiltrados.length > 0 ? [...this.productosFiltrados] : [...inventario.consultarProductos()];
            productosOrdenados.sort((a, b) => b.precio - a.precio);
        } else {
            productosOrdenados = this.productosFiltrados.length > 0 ? [...this.productosFiltrados] : [...inventario.consultarProductos()];
            productosOrdenados.sort((a, b) => {
                const nombreA = a.nombre.toUpperCase();
                const nombreB = b.nombre.toUpperCase();
                
                if (nombreA < nombreB) {
                    return -1;
                }
                if (nombreA > nombreB) {
                    return 1;
                }
                return 0;
            });
        }
        return productosOrdenados;
    };

    eliminarFiltros(productos){
        this.productosFiltrados = productos;
    }
};

// Uso de la clase ProductosManager
export const productosManager = new ProductosManager();