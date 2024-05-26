var apiSolicitudes = backend + '/solicitudes';

var solicitud = {
    list: new Array(),
    item: {id: "", nombre: "", correo: "", telefono: "", estado: '', ubicacion: "", nomComercial: "", tipoId: ""}
};

document.addEventListener("DOMContentLoaded", loaded);

async function loaded(event) {
    try {
        await menu();
    } catch (error) {
        return;
    }
    solicitudes();
}

function solicitudes() {
    html = `<h1>Solicitudes Nuevas de Proveedores</h1>
        <div class="search-container">
            <form name="formulario" class="search-form">
                <input id="prov" type="text" name="prov" placeholder="Buscar Proveedor">
                <button id="search" type="button" class="search-button">Buscar</button>
                <button id="limpiar" type="button" class="search-button">Limpiar</button>
            </form>
        </div>
        
        <div>
            <table class="table">
                <thead class="thead-light">
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Estado</th>                    
                    <th scope="col">Aceptar</th>
                    <th scope="col">Denegar</th>
                </tr>
                </thead>
                <tbody id="list">
                
                </tbody>
            </table>
        </div>`;

    document.querySelector('#root').innerHTML = html;
    document.getElementById("search").addEventListener("click", search);
    document.getElementById("limpiar").addEventListener("click",limpiar);
    fetchAndListSolicitudes();
}

async function fetchAndListSolicitudes() {
    try {
        const response = await fetch(apiSolicitudes);
        if (!response.ok) {
            errorMessage(response.status);
            return;
        }
        solicitud.list = await response.json();
        render_list_solicitudes();
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

function render_list_solicitudes() {
    const lista = document.getElementById("list");
    lista.innerHTML = "";
    solicitud.list.forEach(proveedor => render_list_item_solicitudes(lista, proveedor));
}

function render_list_item_solicitudes(lista, proveedor) {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${proveedor.id}</td>
                    <td>${proveedor.nombre}</td>
                    <td>${getEstado(proveedor.estado)}</td>                                 
                    <td id='aceptar'><img src="/images/aceptar.png" width="20" height="20"></td>
                    <td id='rechazar'><img src="/images/denegar.png" width="20" height="20"></td>`;
    lista.append(tr);
    tr.querySelector("#aceptar").addEventListener("click", () => aceptar(proveedor.id));
    tr.querySelector("#rechazar").addEventListener("click", () => rechazar(proveedor.id));
}

async function search() {
    const nombre = document.getElementById("prov").value;
    try {
        const response = await fetch(backend + `/searchSolicitudes/${nombre}`);
        if (!response.ok) {
            errorMessage(response.status);
            return;
        }
        solicitud.list = await response.json();
        render_list_solicitudes();
    } catch (error) {
        console.error('Search error:', error);
    }
}
function limpiar(){
    document.getElementById("prov").value = "";
    fetchAndListSolicitudes();
}

function getEstado(estado) {
    if (estado === 'A') return 'Activo';
    else if (estado === 'I') return 'Inactivo';
    else if (estado === 'E') return 'En espera';
    else return 'Desconocido';
}

function aceptar(id) {
    alert("aceptar");
let request = new Request(backend + `/aceptarSolicitud/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado: 'A' })
    });
    (async () => {
        const response = await fetch(request);
        if (!response.ok) {
            errorMessage(response.status);
            return;
        }
        fetchAndListSolicitudes();
    })();
}

function rechazar(id) {
    let request = new Request(backend + `/rechazarSolicitud/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado: 'I' })
    });
    (async () => {
        const response = await fetch(request);
        if (!response.ok) {
            errorMessage(response.status);
            return;
        }
        fetchAndListSolicitudes();
    })();
}


