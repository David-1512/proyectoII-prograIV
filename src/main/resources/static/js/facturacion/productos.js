var stateProductos ={
    list: new Array(),
    item : {cod:"",descripcion:"",precio:0.0},
    id : "",
    producto:{cod:"",nombre:"",precio:0.0,impuesto:"",unidadMedida:""}
}

document.addEventListener("DOMContentLoaded",loaded);

async function loaded(event) {
    loadProveedorProductos();
    try{ await menu();} catch(error){return;}
    document.getElementById("salirProducto").addEventListener("click", returnMenu);
    fetchAndListProductos();
}
function loadProveedorProductos() {
    const storedState = localStorage.getItem('proveedor');
    if (storedState) {
        stateProductos.id = JSON.parse(storedState);
    }
}
function fetchAndListProductos() {
    const request = new Request(backend +`/productos/${stateProductos.id}`, { method: 'GET', headers: {} });
    (async ()=>{
        const response = await fetch(request);
        if (!response.ok) {
            errorMessage(response.status);
            return;
        }
        const responseData = await response.json();
        stateProductos.list = responseData.object;
        render_listProductos();
    })();
}

function render_listProductos(){
    var listado=document.getElementById("listProductos");
    listado.innerHTML="";
    stateProductos.list.forEach( item=>render_list_itemProductos(listado,item));
}

function render_list_itemProductos(listado,item){
    var tr =document.createElement("tr");
    tr.innerHTML=`<td>${item.cod}</td>
					<td>${item.descripcion}</td>
					<td>${item.unidadMedida.id}</td>
					<td>${item.productoCabys.impuestoProducto}</td>
					<td>${item.precio}</td>
					<td>
					<input id="agregarProducto" class="btn btn-primary" type="button" value="Agregar">
                    </td>`;
    tr.querySelector("#agregarProducto").addEventListener("click",()=>{addProducto(item.cod);});
    listado.append(tr);
}

function addProducto(cod) {
    const request = new Request(backend + `/producto/${cod}`, {method: 'GET', headers: {}});
    (async () => {
        const response = await fetch(request);
        if (!response.ok) {
            errorMessage(response.status);
            return;
        }
        const responseData = await response.json();
        if (responseData.object) {
            const producto = responseData.object;
            stateProductos.producto.cod = producto.cod;
            stateProductos.producto.nombre = producto.descripcion;
            stateProductos.producto.precio = producto.precio;
            stateProductos.producto.unidadMedida = producto.unidadMedida.id;
            stateProductos.producto.impuesto = producto.productoCabys.impuestoProducto;
            localStorage.setItem('producto', JSON.stringify(stateProductos.producto));
            returnMenu();
        } else {
            errorMessage("Respuesta inválida del servidor");
        }
    })();
}

function returnMenu(){
    document.location="/views/facturacion/viewFacturacion.html";
}