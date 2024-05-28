var backend="http://localhost:8080/api/v1";

var stateHacienda ={
   proveedor:{idProveedor:"",nombreProveedor: ""},
   cliente:{idCliente:"",nombreCliente: ""}
}

document.addEventListener("DOMContentLoaded",loaded);

async function loaded(event) {
    document.getElementById("registrarse").addEventListener("click", existPerson);
    document.getElementById("salirHacienda").addEventListener("click", returnMenu);
}
function existPerson() {
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
    if(document.getElementById('tipo').value === "cliente") {
        stateHacienda.cliente.idCliente = document.getElementById('id').value;
        stateHacienda.cliente.nombreCliente = document.getElementById('nom').value;
        const requestClient = new Request(backend + `/hacienda/cliente/${stateHacienda.cliente.idCliente}`, {
            method: 'GET',
            headers: {}
        });
        (async () => {
            const responseClient = await fetch(requestClient);
            if (!responseClient.ok) {
                errorMessage(responseClient.status);
                return;
            }
            const responseDataClient = await responseClient.json();
            if (responseDataClient === true) {
                alert("Error: Este cliente ya esta asociado a hacienda");
                return;
            }
            else{
                addClienteHacienda();
            }
        })();
    }
        if(document.getElementById('tipo').value === "proveedor"){
            stateHacienda.proveedor.idProveedor = document.getElementById('id').value;
            stateHacienda.proveedor.nombreProveedor = document.getElementById('nom').value;
            const requestProveedor = new Request(backend +`/hacienda/proveedor/${stateHacienda.proveedor.idProveedor}`, { method: 'GET', headers: {} });
            (async ()=> {
                const responseProveedor = await fetch(requestProveedor);
                if (!responseProveedor.ok) {
                    errorMessage(responseProveedor.status);
                    return;
                }
                const responseDataProveedor = await responseProveedor.json();
                if (responseDataProveedor === true) {
                    alert("Error: Este proveedor ya esta asociado a hacienda");
                    return;
                }
                else{
                    addProveedorHacienda();
                }
            })();
        }
}

function addProveedorHacienda(){
    const request = new Request(backend +`/hacienda/proveedor`, {method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(stateHacienda.proveedor)});
    (async ()=>{
        const response = await fetch(request);
        if (!response.ok) {errorMessage(response.status);return;}
        alert("Proveedor asociado correctamente");
        clean();
    })();
}

function addClienteHacienda(){
    const request = new Request(backend +`/hacienda/cliente`, {method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(stateHacienda.cliente)});
    (async ()=>{
        const response = await fetch(request);
        if (!response.ok) {errorMessage(response.status);return;}
        alert("Cliente asociado correctamente");
        clean();
    })();
}

function clean() {
    document.getElementById('id').value = "";
    document.getElementById('nom').value = "";
    document.getElementById('tipo').value = "No seleccionado";
}

function returnMenu(){
    document.location="/views/inicio/inicioLogin.html";
}
