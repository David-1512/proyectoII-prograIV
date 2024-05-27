var stateClientes ={
    list: new Array(),
    item : {id:"", nombre:""},
    cliente: {id:"",nombre:""},
    id : "",
}

document.addEventListener("DOMContentLoaded",loaded);

async function loaded(event) {
    loadProveedorClientes();
    try{ await menu();} catch(error){return;}
    document.getElementById("salirCliente").addEventListener("click", returnMenu);
    fetchAndListClientes();
}
function loadProveedorClientes() {
    const storedState = localStorage.getItem('proveedor');
    if (storedState) {
        stateClientes.id = JSON.parse(storedState);
    }
}
function fetchAndListClientes() {
    const request = new Request(backend +`/clientes/${stateClientes.id}`, { method: 'GET', headers: {} });
    (async ()=>{
        const response = await fetch(request);
        if (!response.ok) {
            errorMessage(response.status);
            return;
        }
        const responseData = await response.json();
        stateClientes.list = responseData.object;
       render_listClientes();
    })();
}

function render_listClientes(){
    var listado=document.getElementById("listClientes");
    listado.innerHTML="";
    stateClientes.list.forEach( item=>render_list_itemClientes(listado,item));
}

function render_list_itemClientes(listado,item){
    var tr =document.createElement("tr");
    tr.innerHTML=`<td>${item.id}</td>
					<td>${item.nombre}</td>
					<td>
					<input id="agregarCliente" class="btn btn-primary" type="button" value="Agregar">
                    </td>`;
    tr.querySelector("#agregarCliente").addEventListener("click",()=>{addCliente(item.id);});
    listado.append(tr);
}

function addCliente(id) {
    const request = new Request(backend + `/cliente/${id}`, {method: 'GET', headers: {}});
    (async () => {
        const response = await fetch(request);
        if (!response.ok) {
            errorMessage(response.status);
            return;
        }
        const responseData = await response.json();
        if (responseData.object) {
            const cliente = responseData.object;
            stateClientes.cliente.nombre = cliente.nombre;
            stateClientes.cliente.id =cliente.id;
            localStorage.setItem('cliente', JSON.stringify(stateClientes.cliente));
            returnMenu();
        } else {
            errorMessage("Respuesta inválida del servidor");
        }
    })();
}
function returnMenu(){
    document.location="/views/facturacion/viewFacturacion.html";
}

/*function render_clientesoverlay() {
    html = `
        <div id="clientesoverlay" class="clientesoverlay"></div>
    `;
    overlay=document.createElement('div');
    overlay.innerHTML=html;
    let elemento = document.querySelector('#contenido');
    document.querySelector('#contenedorPrincipal').replaceChild(overlay,elemento);
    //document.body.appendChild(overlay);
}

function render_clientesview(){
    html = `
    <div id = "clientesview" class = "centered">
    <div class="btn-container">
     <input id="salirCliente" class="btn btn-primary" type="button" value="Salir">
    </div>
    <div style="overflow-y: auto; max-height: 300px;">
        <table class='container'>
            <thead>
            <tr >
                <th >Id</th>
                <th >Nombre</th>
                <th >...</th>
            </tr>
            </thead>
            <tbody class='container' id='listClientes'>
            </tbody>
        </table>
    </div>
</div>
    `;
    view=document.createElement('div');
    view.innerHTML=html;
    document.body.appendChild(view);
    document.getElementById("salirCliente").addEventListener("click", returnMenu);
}*/
