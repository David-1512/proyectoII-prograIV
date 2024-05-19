var factura ={
    proveedor: {nombre:"Verrati Salazar",id:"86952"},
    productos: new Array(),
    cliente:{nombre:"",id:""},
    producto:{cod:"",nombre:""}
}


document.addEventListener("DOMContentLoaded",loaded);

async function loaded(event) {
   loadState();
    try {
        await render_menu();
    } catch (error) {
        return;
    }

    document.getElementById("buscarProducto").addEventListener("click", searchProduct);
    document.querySelector("#buscarCliente").addEventListener('click', searchClient);
    document.getElementById("agregarProducto").addEventListener("click", addProduct);
    document.getElementById("guardarFactura").addEventListener("click", addBill);
}

function loadState() {
    document.getElementById("nombreProveedor").value = factura.proveedor.nombre;
    const cliente = localStorage.getItem('cliente');
    if (cliente && cliente !== "null" && cliente !== "") {
        factura.cliente = JSON.parse(cliente);
        document.getElementById("nombreCliente").value = factura.cliente.nombre;
    }

    const producto = localStorage.getItem('producto');
    if (producto && producto !== "null" && producto !== "") {
        factura.producto = JSON.parse(producto);
        document.getElementById("detalleProducto").value = factura.producto.nombre;
    }

}

function searchClient(){
    localStorage.setItem('proveedor', JSON.stringify(factura.proveedor.id));
    document.location = "/views/facturacion/viewClientes.html";
}

function searchProduct(){
    localStorage.setItem('proveedor', JSON.stringify(factura.proveedor.id));
    document.location = "/views/facturacion/viewProductos.html";
}

function addProduct(){
}

function addBill(){

}

