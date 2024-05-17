var factura ={
    proveedor: {nombre:"Verrati Salazar",id:"86952"},
    productos: new Array(),
    cliente:{nombre:"",id:""},
    productoSelect:{detalle:"",cod:"",cant:0}
}

var state ={
    list: new Array(),
    item : {id:"", nombre:""},
}

document.addEventListener("DOMContentLoaded",loaded);

async function loaded(event) {
    try {
        await render_menu();
    } catch (error) {
        return;
    }

    document.getElementById("buscarProducto").addEventListener("click", searchProduct);
    document.getElementById("buscarCliente").addEventListener("click", searchClient);
    document.getElementById("agregarProducto").addEventListener("click", addProduct);
    document.getElementById("guardarFactura").addEventListener("click", addBill);
}


//Buscar cliente
function searchClient(){
    html = `
    <div class = "centered">
    <div class="btn-container">
        <form>
            <input id="salirCliente" class="btn btn-primary" type="button" value="Salir">
            <input type ="hidden" name = idProveedor>
        </form>
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
    //Agregar el listener del boton salir
    fetchAndList();
}

function fetchAndList() {
    const request = new Request(backend + `/clientes/${factura.proveedor.id}`, { method: 'GET', headers: {} });
    (async ()=>{
        const response = await fetch(request);
        if (!response.ok) {
            errorMessage(response.status);
            return;
        }
        const responseData = await response.json();
        if (responseData.object) {
            state.list = responseData.object;
            render_list();
        } else {
            errorMessage("Respuesta inválida del servidor");
        }
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
            factura.cliente.id = cliente.id;
            factura.cliente.nombre = cliente.nombre;
        } else {
            errorMessage("Respuesta inválida del servidor");
        }
    })();
    //Aqui añadir el cuadro del nombre del cliente
}

function searchProduct(){
}


function addProduct(){
}

function addBill(){

}

