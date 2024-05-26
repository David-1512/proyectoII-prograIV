var api=backend+'/proveedores';

var state ={
    list: new Array(),
    item : {id:"", nombre:"",correo:"",telefono:"",estado:'',ubicacion:"",nomComercial:"",tipoId:""},
}

document.addEventListener("DOMContentLoaded",loaded);

async function loaded(event){
    try{ await menu();} catch(error){return;} //Cambiar a menu
    proveedores();
}

function proveedores(event){
    html = `<h1>Proveedores Registrados</h1>
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
                    <th scope="col"></th>
                </tr>
                </thead>
                <tbody id="list">
                
                </tbody>
            </table>
        </div>`;

    document.querySelector('#root').innerHTML = html;
    document.getElementById("search").addEventListener("click",search);
    document.getElementById("limpiar").addEventListener("click",limpiar);
    render_proveedoroverlay();
    render_itemview();
    fetchAndList();
}
function fetchAndList(){
    const request = new Request(api, {method: 'GET', headers: { }});
    (async ()=>{
        const response = await fetch(request);
        if (!response.ok) {errorMessage(response.status);return;}
        state.list = await response.json();
        render_list();
    })();
}

function render_list(){
    var listado=document.getElementById("list");
    listado.innerHTML="";
    state.list.forEach( item=>render_list_item(listado,item));
}

function render_list_item(listado,item){
    var tr =document.createElement("tr");
    tr.innerHTML=`<td>${item.id}</td>
					<td>${item.nombre}</td>
					<td>${getEstado(item.estado)}</td>					
					<td id='ver'><img src="/images/ver-mas.png" width="20" height="20"></td>`;
    tr.querySelector("#ver").addEventListener("click",()=>{ver(item.id);});
    listado.append(tr);
}

function ver(id){
    let request = new Request(backend+`/${id}`,
        {method: 'GET', headers: {}});
    (async ()=>{
        const response = await fetch(request);
        if (!response.ok) {errorMessage(response.status);return;}
        state.item = await response.json();
        toggle_proveedorview();
        render_item();
    })();
}

function render_itemview(){
    html = `
        <div class="proveedorview" id="proveedorview">  
            <div class="proveedor-header">
                <h4 id="nombre" class="text-center"></h4>
            </div>
            <div class="proveedor-content">
                <div class="left-section">
                    <p><b>Tipo de Identificación: </b><span id="tipoId"></span></p>
                    <p><b>Identificación: </b><span id="id"></span></p>
                    <p><b>Correo: </b><span id="correo"></span></p>
                    <p><b>Teléfono: </b><span id="telefono"></span></p>
                </div>
                <div class="right-section">
                    <p><b>Nombre Comercial: </b><span id="nomComercial"></span></p>
                    <p><b>Ubicación: </b><span id="ubicacion"></span></p>
                    <p><b>Estado: </b><span id="estado"></span></p>
                </div>
            </div>
            <div class="proveedor-footer">
                <input type="button" class="btn btn-primary" id="boton_estado" value="">
                <input type="button" class="btn btn-secondary" id="boton_volver" value="Volver">
            </div>
        </div>`;

    view=document.createElement('div');
    view.innerHTML=html;
    document.body.appendChild(view);
}

function render_item() {
    document.getElementById('tipoId').textContent = state.item.tipoId;
    document.getElementById('id').textContent = state.item.id;
    document.getElementById('nombre').textContent = state.item.nombre;
    document.getElementById('estado').textContent = getEstado(state.item.estado);
    if (state.item.estado === 'D') {
        document.getElementById('correo').textContent = 'Estado: ' + getEstado(state.item.estado);
        document.getElementById('telefono').textContent = 'Estado: ' + getEstado(state.item.estado);
        document.getElementById('ubicacion').textContent = 'Estado: ' + getEstado(state.item.estado);
        document.getElementById('nomComercial').textContent = 'Estado: ' + getEstado(state.item.estado);
    }else {
        document.getElementById('correo').textContent = state.item.correo;
        document.getElementById('telefono').textContent = state.item.telefono;
        document.getElementById('ubicacion').textContent = state.item.ubicacion;
        document.getElementById('nomComercial').textContent = state.item.nomComercial;
    }

    var botonEstado = document.getElementById('boton_estado');

    if (state.item.estado == 'A') {
        botonEstado.value = 'Inactivar';
        botonEstado.style.display = 'inline-block';
    } else if (state.item.estado == 'I') {
        botonEstado.value = 'Activar';
        botonEstado.style.display = 'inline-block';
    } else{
        botonEstado.style.display = 'none';
    }

    botonEstado.removeEventListener("click", invertir_estado);
    if (state.item.estado !== 'D' || state.item.estado !== 'E') {
        botonEstado.addEventListener("click", invertir_estado);
    }

    document.querySelector("#proveedorview #boton_volver").addEventListener("click", toggle_proveedorview);
}

function getEstado(estado){
    if (estado === 'A') return 'Activo';
    else if (estado === 'I') return 'Inactivo';
    else if (estado === 'E') return 'Espera';
    else return 'Datos';
}
function invertir_estado(){
    let request = new Request(backend+`/estado/${state.item.id}`,
        {method: 'GET', headers: { }});
    (async ()=>{
        const response = await fetch(request);
        if (!response.ok) {errorMessage(response.status);return;}
        state.item = await response.json();
        fetchAndList();
        render_item();
    })();
}
function render_proveedoroverlay(){
    html = `
        <div id="proveedoroverlay" class="proveedoroverlay"></div>
    `;
    overlay=document.createElement('div');
    overlay.innerHTML=html;
    document.body.appendChild(overlay);
    document.querySelector("#proveedoroverlay").addEventListener("click",toggle_proveedorview);
}
function toggle_proveedorview(){
    document.getElementById("proveedoroverlay").classList.toggle("active");
    document.getElementById("proveedorview").classList.toggle("active");
}

function search(){
    nombre = document.getElementById("prov").value;
    let request = new Request(backend+`/search/${nombre}`,
        {method: 'GET', headers: { }});
    (async ()=>{
        const response = await fetch(request);
        if (!response.ok) {errorMessage(response.status);return;}
        state.list = await response.json();
        render_list();
    })();
}

function limpiar(){
    document.getElementById("prov").value = "";
    fetchAndList();
}
