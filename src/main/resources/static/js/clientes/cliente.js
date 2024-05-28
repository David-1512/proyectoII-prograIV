

var clienteState = {
    list: new Array(),
    item: {
        id: "",
        nombre: "",
        correo: "",
        telefono: "",
        tipoId: ""
    }
};

document.addEventListener("DOMContentLoaded",loaded);

async function loaded(event){
    try{ await menu();} catch(error){return;} //Cambiar a menu
    clientes();
}

function clientes(){
    html = `
    <div class="container-box">
        <h2>Clientes</h2>    
        
        <div class="search-container">
            <form name="formulario" class="search-form">
                <input type="text" name="busq" id="busq" placeholder="Buscar Cliente" >
                <button id="search" type="button" class="search-button">Buscar</button>
                <button id="limpiar" type="button" class="search-button">Limpiar</button>
            </form>
        </div>
    </div>

    <div class="juntos">

            <div class="izquierda">
            <div style="overflow-y: auto; max-height: 300px;">
                <table class="table table-hover">
                        <thead class="thead-light">
                        <tr class="fixed-header">
                            <th scope="col"> </th> 
                            <th scope="col">Tipo de Identificacion</th> 
                            <th scope="col">Identificacion</th> 
                            <th scope="col">Nombre</th> 
                            <th scope="col">Correo</th> 
                            <th scope="col">Teléfono</th> 
                            <th scope="col"> </th>                         
                        </tr>
                        </thead>
                        <tbody>
                        
                        </tbody>
                </table>
            </div>
            </div>

        <div class="derecha">            
            <div class="containerEdit">
                <h4>Formulario</h4>
                <form name="formulario" class="search-form">
                    <div class="form-row">                        
                        <div class="form-group col-md-12">
                            <label for="tipoident">Tipo de Identificacion:</label>
                            <select id="tipoid" name="tipoid" class="form-group col-md-12"">
                                <option value="Persona Fisica">Persona Fisica</option>
                                <option value="Persona Juridica">Persona Juridica</option>
                            </select> 
                        </div>
                        <div class="form-group col-md-12">
                            <label for="identificacion">Identificacion:</label>
                            <input type="text" class="form-control" id="identificacion" name="identificacion">   
                        </div>
                        <div class="form-group col-md-12">
                            <label for="nombre">Nombre:</label>
                            <input type="text" class="form-control" id="nombre" name="nombre">
                        </div>
                        <div class="form-group col-md-12">
                            <label for="correo">Correo:</label>
                            <input type="email" class="form-control" id="correo" name="correo">
                        </div>
                        <div class="form-group col-md-12">
                            <label for="telefono">Telefono:</label>
                            <input type="number" class="form-control" id="telefono" name="telefono"">
                        </div>
                    </div>
                    <br>                                      
                    <button id="guardar" type="button" class="btn btn-primary">Guardar</button>
                    <button id="clear" type="button" class="btn btn-primary">Limpiar</button>                   
                </form>
            </div>
        </div>
    </div>`;

    document.querySelector('#root').innerHTML = html;
    document.getElementById("search").addEventListener("click",search);
    document.getElementById("limpiar").addEventListener("click",limpiar);
    document.getElementById("guardar").addEventListener("click",guardar);
    document.getElementById("clear").addEventListener("click",clear);

    fetchAndListClientesProv();

}

function search(event){
    event.preventDefault();
    let nombreBusqueda = document.getElementById("busq").value;
    if(nombreBusqueda==="") {fetchAndListClientesProv();return;}
    let request = new Request(backend+`/clientesSearch/${loginstate.user.id}`+`/`+`${nombreBusqueda}`,
        {method: 'GET', headers: { }});
    (async ()=>{
        const response = await fetch(request);
        if (!response.ok) {errorMessage(response.status);return;}
        clienteState.list = await response.json();
        render_listClientesProv();
    })();
}

function limpiar(event){
    event.preventDefault();
    document.getElementById("busq").value = "";
    fetchAndListClientesProv();
}

function clear(event){
    event.preventDefault();
    document.getElementById("identificacion").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("correo").value = "";
    document.getElementById("telefono").value = "";
    document.getElementById("tipoid").disabled = false;
    document.getElementById("identificacion").disabled = false;
}

function guardar(event){
    event.preventDefault();
    let clienteProveedorState = {
        id: document.getElementById("identificacion").value,
        nombre: document.getElementById("nombre").value,
        correo: document.getElementById("correo").value,
        telefono: document.getElementById("telefono").value,
        tipoId: document.getElementById("tipoid").value
    };
    let request = new Request(backend+`/registrarClienteProv/${loginstate.user.id}`,
        {method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(clienteProveedorState)});
    (async ()=>{
        const response = await fetch(request);
        if (!response.ok) {errorMessage(response.status);}
        fetchAndListClientesProv();
    })();
}


function fetchAndListClientesProv(){
    let request = new Request(backend+`/clientesProveedor/${loginstate.user.id}`,
        {method: 'GET', headers: { }});
    (async ()=>{
        const response = await fetch(request);
        if (!response.ok) {errorMessage(response.status);return;}
        clienteState.list = await response.json();
        render_listClientesProv();
    })();
}

function render_listClientesProv(){
    var listado=document.querySelector(".table tbody");
    listado.innerHTML="";
    clienteState.list.forEach( clienteState=>render_list_itemClientesProv(listado,clienteState));

}
function render_list_itemClientesProv(listado,clienteState){

    var tr =document.createElement("tr");
    tr.innerHTML=`
        <td id="eliminar"><img src="/images/denegar.png" width="20" height="20"></td>
        <td>${clienteState.tipoId}</td>
        <td>${clienteState.id}</td>
        <td>${clienteState.nombre}</td>
        <td>${clienteState.correo}</td>
        <td>${clienteState.telefono}</td>        
        <td id="editar"><img src="/images/editar.png" width="20" height="20"></td>`;
    tr.querySelector("#editar").addEventListener("click",()=>{editarClienteProv(clienteState.id);});
    tr.querySelector("#eliminar").addEventListener("click",()=>{eliminarClienteProv(clienteState.id);});
    listado.append(tr);
}

function editarClienteProv(id){
    let clienteProv = clienteState.list.find(c=>c.id==id);
    document.getElementById("tipoid").value = clienteProv.tipoId;
    document.getElementById("tipoid").disabled = true;
    document.getElementById("identificacion").value = clienteProv.id;
    document.getElementById("identificacion").disabled = true;
    document.getElementById("nombre").value = clienteProv.nombre;
    document.getElementById("correo").value = clienteProv.correo;
    document.getElementById("telefono").value = clienteProv.telefono;
    document.getElementById("tipoid").value = clienteProv.tipoId;

}

function eliminarClienteProv(id){
    let request = new Request(backend+`/eliminarClienteProv/${loginstate.user.id}`+`/`+`${id}`,
        {method: 'DELETE', headers: { 'Content-Type': 'application/json' }
        });
    (async ()=>{
        const response = await fetch(request);
        if (!response.ok){
            errorMessage(response.status);
        }
        fetchAndListClientesProv();
    })();
}




