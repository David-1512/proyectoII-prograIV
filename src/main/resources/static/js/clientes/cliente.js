var productoProveedorState = {
    list: new Array(),
    item: {
        cod: 0,
        descripcion: "",
        precio: 0.0,
        idProveedor: "",

        unidadMedida: {
            id: "",
            descripcion: ""
        },
        productoCabys: {
            idProducto: "",
            nombreProducto: "",
            impuestoProducto: 0.0
        }
    }
};

var productoCabysState = {
    list: new Array(),
    item: {
        idProducto: "",
        nombreProducto: "",
        impuestoProducto: 0.0
    }
};

var unidadMedidaState = {
    list: new Array(),
    item: {
        id: "",
        descripcion: ""
    }
}

document.addEventListener("DOMContentLoaded",loaded);

async function loaded(event){
    try{ await menu();} catch(error){return;} //Cambiar a menu
    //clientes();
}