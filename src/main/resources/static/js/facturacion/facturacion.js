var factura ={
    proveedor: {nombre:"Verrati Salazar",id:"86952"},
    productos: new Array(),
    cliente:{nombre:"",id:""},
    productoSelect:{detalle:"",cod:"",cant:0}
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
function saveState() {
    localStorage.setItem('factura', JSON.stringify(factura));
}

function loadState() {
    const cliente = localStorage.getItem('cliente');
    if (cliente && cliente !== "null" && cliente !== "") {
        factura.cliente = JSON.parse(cliente);
        document.getElementById("nombreCliente").value = factura.cliente.nombre;
    }
}

//Buscar cliente
function searchClient(){
   // saveState();
    localStorage.setItem('proveedor', JSON.stringify(factura.proveedor.id));
    document.location = "/views/facturacion/viewClientes.html";
}

function searchProduct(){
}


function addProduct(){
}

function addBill(){

}

