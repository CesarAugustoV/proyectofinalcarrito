// Definir la clase Producto
export class Orden {
    constructor(id, nombre, apellido, correo, ciudad, direccion, carrito, total, pagado = false) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.correo = correo;
        this.ciudad = ciudad;
        this.direccion = direccion;
        this.carrito = carrito;
        this.total = total;
        this.pagado = pagado;
    }
};