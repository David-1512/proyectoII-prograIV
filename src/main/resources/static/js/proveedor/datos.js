provDat={id:"", nombre:"",correo:"",telefono:"",estado:'',ubicacion:"",nomComercial:"",tipoId:""};
actCom={id:"",nombre:""};

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

}

function cargarDatos(){
    let request = new Request(backend+`/${loginstate.user.id}`,
        {method: 'GET', headers: {}});
    (async ()=>{
        const response = await fetch(request);
        if (!response.ok) {errorMessage(response.status);return;}
        provDat = await response.json();
        cancelar();
        render_datos();
    })();
}

function render_datos(){
    document.getElementById("nombre").textContent = `Información del proveedor: ${provDat.nombre}`;
    document.getElementById("tipoId").value = provDat.tipoId;
    document.getElementById("id").value = provDat.id;
    document.getElementById("correo").value = provDat.correo;
    document.getElementById("telefono").value = provDat.telefono;
    document.getElementById("nomComercial").value = provDat.nomComercial;
    document.getElementById("ubicacion").value = provDat.ubicacion;

    // Inhabilitar campos y botones según el estado
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

function guardar() {
    let campos = ["tipoId", "id", "correo", "telefono", "actComercial", "nomComercial", "ubicacion"];
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
        alert("Por favor, complete todos los campos antes de guardar.");
    } else {

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


