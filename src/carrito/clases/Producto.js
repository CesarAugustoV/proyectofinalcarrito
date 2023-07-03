// Definir la clase Producto
export class Producto {
    constructor(id, nombre, precio, stock, categoria, marca, caracteristicas, cantidad = 0) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
        this.categoria = categoria;
        this.marca = marca;
        this.caracteristicas = caracteristicas;
        this.cantidad = cantidad;
    }
};