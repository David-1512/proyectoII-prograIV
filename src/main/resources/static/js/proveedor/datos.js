
provDat={id:"", nombre:"",correo:"",telefono:"",estado:'',ubicacion:"",nomComercial:"",tipoId:""};


document.addEventListener("DOMContentLoaded",loaded);

async function loaded(event){
    try{ await menu();} catch(error){return;} //Cambiar a menu
    datos_proveedor();
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
                    <input type="button" class="btn btn-primary" id="boton_guardar" value="Seleccionar Actividad Comercial">                    
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
    document.getElementById("boton_cancelar").addEventListener("click",cancelar);
}

function guardar() {

}

function cancelar() {

}