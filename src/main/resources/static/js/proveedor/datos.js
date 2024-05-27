
provDat={id:"", nombre:"",correo:"",telefono:"",estado:'',ubicacion:"",nomComercial:"",tipoId:"",idActComercial:"", rol:""};

var actividades={
    listActividades: new Array(),
    actCom : {idActComercial:"",nombre:""}
};

document.addEventListener("DOMContentLoaded",loaded);

async function loaded(event){
    try{ await menu();} catch(error){return;} //Cambiar a menu
    datos_proveedor();
    cargarDatos();
}

function datos_proveedor(event){
    html = `<div id="formview" class="formview">
        <div class="form-header">
            <h4 id="nombre" class="text-center">Informacion del proveedor</h4>
        </div>
        <div class="form-content">
            <div class="left-section">
                <div class="form-group">
                    <label for="tipoId">Tipo de Identificación:</label>
                    <input type="text" id="tipoId" name="tipoId">
                </div>
                <div class="form-group">
                    <label for="id">Identificación:</label>
                    <input type="text" id="id" name="id">
                </div>
                <div class="form-group">
                    <label for="correo">Correo:</label>
                    <input type="email" id="correo" name="correo">
                </div>
                <div class="form-group">
                    <label for="telefono">Teléfono:</label>
                    <input type="tel" id="telefono" name="telefono">
                </div>
            </div>
            <div class="right-section">
                <div class="form-group">       
                    <label for="actComercial">Actividad Comercial:</label>
                    <input type="text" id="actComercial" name="actComercial">         
                    <input type="button" class="btn btn-primary" id="boton_seleccionar" value="Seleccionar Actividad Comercial">                    
                </div>
                <div class="form-group">
                    <label for="nomComercial">Nombre Comercial:</label>
                    <input type="text" id="nomComercial" name="nomComercial">
                </div>
                <div class="form-group">
                    <label for="ubicacion">Ubicación:</label>
                    <textarea id="ubicacion" name="ubicacion"></textarea>
                </div>               
            </div>
        </div>
        <div class="form-footer">
            <input type="button" class="btn btn-primary" id="boton_guardar" value="Guardar">
            <input type="button" class="btn btn-secondary" id="boton_cancelar" value="Cancelar">            
        </div>
    </div>`;
    document.querySelector('#root').innerHTML = html;
    document.getElementById("boton_guardar").addEventListener("click",guardar);
    document.getElementById("boton_seleccionar").addEventListener("click",toggle_actividadview);
    render_actividadoverlay();
    render_actividadview();
}

function render_actividadview(){
    html = `<div class="actividadview" id="actividadview">
                <h2>Actividades Comerciales</h2>
                <div class="container-box">
                    <div class="search-container">
                        <form name="formulario" class="search-form">
                            <input type="text" name="prod" id="prod" placeholder="Buscar Producto" >                            
                            <button id="search" type="button" class="search-button">Buscar</button>
                            <button id="limpiar" type="button" class="search-button">Limpiar</button>
                        </form>
                    </div>
                </div>
                               
                <div class="col-md-6">
                    <div style="overflow-y: auto; max-height: 300px;width: 600px;">
                        <table class="table table-hover table-fixed">
                            <thead class="thead-light">
                            <tr class="fixed-header">
                                </th> <th scope="col"> Código </th> <th scope="col"> Nombre </th> <th scope="col">  </th> 
                            </tr>
                            </thead>
                            <tbody id="list">
                                
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="proveedor-footer">                    
                    <input type="button" class="btn btn-secondary" id="boton_volver" value="Volver">
                </div>
                `;

    view=document.createElement('div');
    view.innerHTML=html;
    document.body.appendChild(view);
    document.getElementById("search").addEventListener("click",buscar);
    document.getElementById("limpiar").addEventListener("click",limpiar);
    document.getElementById("boton_volver").addEventListener("click", toggle_actividadview);

}

function buscar(){
    nombre = document.getElementById("prod").value;
    let request = new Request(backend+`/actividades/${nombre}`,
        {method: 'GET', headers: {}});
    (async ()=>{
        const response = await fetch(request);
        if (!response.ok) {errorMessage(response.status);return;}
        actividades.listActividades = await response.json();
        render_actividades()
    })();
}

function limpiar(){
    document.getElementById("prod").value = "";
    actividades.listActividades = new Array();
    render_actividades();
}
function render_actividades() {
    var listado=document.getElementById("list");
    listado.innerHTML="";
    actividades.listActividades.forEach( actCom=>render_list_actividades(listado,actCom));
}
function render_list_actividades(listado,actCom){
    var tr =document.createElement("tr");
    tr.innerHTML=`<td>${actCom.idActComercial}</td>
                    <td>${actCom.nombre}</td>
                    <td id='seleccionar'><img src="/images/aceptar.png" width="20" height="20"></td>`;
    tr.querySelector("#seleccionar").addEventListener("click",()=>{seleccionar(actCom);});
    listado.append(tr);
}

function seleccionar(actividad){
    actividades.actCom = actividad;
    document.getElementById("actComercial").value = actividad.nombre;
    toggle_actividadview();
}

function render_actividadoverlay(){
    html = `
        <div id="actividadoverlay" class="actividadoverlay"></div>
    `;
    overlay=document.createElement('div');
    overlay.innerHTML=html;
    document.body.appendChild(overlay);
    document.querySelector("#actividadoverlay").addEventListener("click",toggle_actividadview);
}

function toggle_actividadview(){
    document.getElementById("actividadoverlay").classList.toggle("active");
    document.getElementById("actividadview").classList.toggle("active");
}

function cargarDatos(){
    let request = new Request(backend+`/${loginstate.user.id}`,
        {method: 'GET', headers: {}});
    (async ()=>{
        const response = await fetch(request);
        if (!response.ok) {errorMessage(response.status);return;}
        provDat = await response.json();
        cancelar();
        cargarDatosActividad();
    })();
}


function render_datos(){
    document.getElementById("nombre").textContent = `Información del proveedor: ${provDat.nombre}`;
    document.getElementById("tipoId").value = provDat.tipoId;
    document.getElementById("id").value = provDat.id;
    document.getElementById("correo").value = provDat.correo;
    document.getElementById("telefono").value = provDat.telefono;
    document.getElementById("nomComercial").value = provDat.nomComercial;
    document.getElementById("actComercial").value = actividades.actCom.nombre;
    document.getElementById("ubicacion").value = provDat.ubicacion;


    switch(provDat.estado) {
        case 'I':
        case 'E':
            document.getElementById("tipoId").disabled = true;
            document.getElementById("id").disabled = true;
            document.getElementById("correo").disabled = true;
            document.getElementById("telefono").disabled = true;
            document.getElementById("nomComercial").disabled = true;
            document.getElementById("actComercial").disabled = true;
            document.getElementById("ubicacion").disabled = true;
            document.getElementById("boton_guardar").style.display = "none";
            document.getElementById("boton_seleccionar").disabled = true;

            break;
        case 'D':
            document.getElementById("tipoId").disabled = true;
            document.getElementById("id").disabled = true;
            document.getElementById("actComercial").disabled = true;
            break;
        case 'A':
            document.getElementById("tipoId").disabled = true;
            document.getElementById("id").disabled = true;
            document.getElementById("nombre").disabled = true;
            document.getElementById("nomComercial").disabled = true;
            document.getElementById("actComercial").disabled = true;
            document.getElementById("boton_seleccionar").disabled = true;
            break;
    }
}
function cargarDatosActividad(){
    let request = new Request(backend+`/actividad/${provDat.idActComercial}`,
        {method: 'GET', headers: {}});
    (async ()=>{
        const response = await fetch(request);
        if (!response.ok) {}
        else{actividades.actCom = await response.json();}
        render_datos();
    })();
}
function guardar() {
    let campos = ["tipoId", "id", "correo", "telefono", "actComercial","nomComercial", "ubicacion"];
    let todosCompletos = true;
    for (let i = 0; i < campos.length; i++) {
        let campo = document.getElementById(campos[i]);
        let label = document.querySelector(`label[for=${campos[i]}]`);
        if (!campo.value || (campos[i] === "correo" && !validateEmail(campo.value))) {
            campo.style.borderColor = "red";
            campo.style.borderWidth = "2px";
            label.style.color = "red";
            label.style.fontWeight = "bold";
            todosCompletos = false;
        } else {
            campo.style.borderColor = "";
            campo.style.borderWidth = "";

            label.style.color = "";
            label.style.fontWeight = "";
        }
    }
    if (!todosCompletos) {
        alert("Por favor complete todos los campos correctamente.");
    } else {
        let proveedor  ={
                tipoId: document.getElementById("tipoId").value,
                id: document.getElementById("id").value,
                correo: document.getElementById("correo").value,
                telefono: document.getElementById("telefono").value,
                idActComercial: actividades.actCom.idActComercial,
                nomComercial: document.getElementById("nomComercial").value,
                ubicacion: document.getElementById("ubicacion").value
            };
        alert(loginstate.user.id);
        let request = new Request(backend+`/updateProveedor/${loginstate.user.id}`,
            {method: 'PUT', headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(proveedor)});
        alert("Error");
        (async ()=>{
            alert("Error");
            const response = await fetch(request);
            if (!response.ok) {alert("Error");alert(response.status);return;}
            alert("Datos guardados exitosamente.");
            document.location = "/views/inicio/viewBienvenida.html";
        })();
    }
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function cancelar() {
    switch(provDat.estado) {
        case 'D':
            document.getElementById("boton_cancelar").addEventListener("click",logout);
            break;
        default:
            document.getElementById("boton_cancelar").addEventListener('click', e => {
                document.location = "/views/inicio/viewBienvenida.html";
            });
            break;
    }
}








