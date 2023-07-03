class Ordenes {
    constructor(){
        this.ordenes = [];
    }
    agregarOrden (orden){
        this.ordenes.push(orden);
    }
    consultarOrdenes(){
        return this.ordenes;
    }
}

export const ordenes = new Ordenes();