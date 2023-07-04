import { claseCarrito } from "../../src/carrito/clases";

const nombreLabel = document.querySelector('#nombreLabel'),
    apellidoLabel = document.querySelector('#apellidoLabel'),
    direccionLabel = document.querySelector('#direccionLabel'),
    ciudadLabel = document.querySelector('#ciudadLabel'),
    correoLabel = document.querySelector('#correoLabel'),
    bodyCarrito = document.querySelector('#bodyCarrito'),
    totalHTML = document.querySelector('#total');


const cargarFactura = () => {

    const datos = localStorage.getItem('orden');
    const {
        id,
        nombre,
        apellido,
        correo,
        ciudad,
        direccion,
        carrito,
        total
    } = JSON.parse(datos);

    

    nombreLabel.textContent = nombre;
    apellidoLabel.textContent = apellido;
    direccionLabel.textContent = direccion;
    ciudadLabel.textContent = ciudad;
    correoLabel.textContent = correo;


    for (let producto of carrito){

        const tr = document.createElement("tr");

        const nombre = document.createElement("td");
        nombre.textContent = producto.nombre;
        tr.appendChild(nombre);

        const cantidad = document.createElement("td");
        cantidad.textContent = producto.cantidad;
        tr.appendChild(cantidad);

        const precio = document.createElement("td");
        precio.textContent = producto.precio;
        tr.appendChild(precio);

        bodyCarrito.appendChild(tr);
    
    };

    totalHTML.textContent = total;
};


cargarFactura();