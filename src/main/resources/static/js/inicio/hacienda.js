var stateHacienda ={
   proveedor:{idProveedor:"",nombreProveedor: ""},
   cliente:{idCliente:"",nombreCliente: ""}
}

document.addEventListener("DOMContentLoaded",loaded);

async function loaded(event) {
    document.getElementById("registrarse").addEventListener("click", addPerson);
    document.getElementById("salirHacienda").addEventListener("click", returnMenu);
}
function addPerson() {
    if(document.getElementById('tipo').value === "No seleccionado"){
        alert("Error: No se ha seleccionado tipo de Registro del usuario");
        return;
    }
    if(document.getElementById('id').value === ""){
        alert("Error: Digite la identificacion del usuario");
        return;
    }
    if(document.getElementById('nom').value === ""){
        alert("Error: Digite el nombre del usuario");
        return;
    }
    if(document.getElementById('tipo').value === "cliente"){
        stateHacienda.cliente.idCliente = document.getElementById('id').value;
        stateHacienda.cliente.nombreCliente = document.getElementById('nom').value;
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
        alert("Error: No se ha seleccionado tipo de Registro");

    }
    if(document.getElementById('tipo').value === "proveedor"){
        stateHacienda.proveedor.idProveedor = document.getElementById('id').value;
        stateHacienda.proveedor.nombreProveedor = document.getElementById('nom').value;
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
        alert("Error: No se ha seleccionado tipo de Registro");

    }
}
function returnMenu(){
    document.location="/views/inicio/inicioLogin.html";
}
