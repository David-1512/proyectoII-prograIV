var state ={
    list: new Array(),
    item : {id:"", nombre:""},
    id : "",
    cliente:{id:"",nombre:""}
}

document.addEventListener("DOMContentLoaded",loaded);

async function loaded(event) {
    loadProveedor();
    try {
        await render_menu();
    } catch (error) {
        return;
    }
    document.getElementById("salirCliente").addEventListener("click", returnMenu);
    fetchAndList();
}
function loadProveedor() {
    const storedState = localStorage.getItem('proveedor');
    if (storedState) {
        state.id = JSON.parse(storedState);
    }
}
function fetchAndList() {
    const request = new Request(backend +`/clientes/${state.id}`, { method: 'GET', headers: {} });
    (async ()=>{
        const response = await fetch(request);
        if (!response.ok) {
            errorMessage(response.status);
            return;
        }
        const responseData = await response.json();
        state.list = responseData.object;
       render_list();
    })();
}

function render_list(){
    var listado=document.getElementById("listClientes");
    listado.innerHTML="";
    state.list.forEach( item=>render_list_item(listado,item));
}

function render_list_item(listado,item){
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
            state.cliente.nombre = cliente.nombre;
            state.cliente.id =cliente.id;
            localStorage.setItem('cliente', JSON.stringify(state.cliente));
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
