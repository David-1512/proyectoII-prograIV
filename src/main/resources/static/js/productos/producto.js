
var productoProveedorState = {
    list: new Array(),
    item: {
        cod: 0,
        descripcion: "",
        precio: 0.0,
        idProveedor: "",

        unidadMedida: {
            id: "",
            descripcion: ""
        },
        productoCabys: {
            idProducto: "",
            nombreProducto: "",
            impuestoProducto: 0.0
        }
    }
};

var productoCabysState = {
    list: new Array(),
    item: {
        idProducto: "",
        nombreProducto: "",
        impuestoProducto: 0.0
    }
};

var unidadMedidaState = {
    list: new Array(),
    item: {
        id: "",
        descripcion: ""
    }
}

document.addEventListener("DOMContentLoaded",loaded);

async function loaded(event){
    try{ await menu();} catch(error){return;} //Cambiar a menu
    productos();
}

function productos(event){
    html = `
    <div class="container-box">
        <h2>Productos</h2>    
        
        <div class="search-container">
            <form name="formulario" class="search-form">
                <input type="text" name="prod" id="prod" placeholder="Buscar Producto" >
                <button id="search" type="button" class="search-button">Buscar</button>
                <button id="limpiar" type="button" class="search-button">Limpiar</button>
            </form>
        </div>
        

        <div class="juntos">
            <div class="col-md-6">
                <div style="overflow-y: auto; max-height: 300px;">
                    <table class="table table-hover table-fixed">
                        <thead class="thead-light">
                            <tr class="fixed-header">
                                <th scope="col"> </th>
                                <th scope="col"> Código </th>
                                <th scope="col"> Nombre </th> 
                                <th scope="col"> Descripcion </th> 
                                <th scope="col"> Unidad de Medida </th> 
                                <th scope="col"> Precio </th> 
                                <th scope="col"> Impuesto </th> 
                                <th scope="col"> </th>
                            </tr>
                        </thead>
                        <tbody>
                        
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="formulario">
                <h4 class="tit-form">Formulario</h4>
                <div class="containerEdit">
                    <form name="formulario" class="search-form">
                        <div class="form-row">                            
                            <div class="form-group col-md-12">
                                <label for="codigo">Código:</label>
                                <input type="text" class="form-control" id="codigo" name="codigo">                                
                            </div>
                            <div class="form-group col-md-12">
                                <label for="nombre">Nombre:</label>
                                <input type="text" class="form-control" id="nombre" name="nombre">
                            </div>
                            <div class="form-group col-md-12">
                                <button id="seleccionar" type="button" class="btn btn-primary form-control">Seleccionar Producto Cabys</button>
                            </div>
                            <div class="form-group col-md-12">
                                <label for="descripcion">Descripcion:</label>
                                <input type="text" class="form-control" id="descripcion" name="descripcion">
                            </div>
                            <div class="form-group col-md-12">
                                <label for="precio">Precio:</label>
                                <input type="number" class="form-control" id="precio" name="precio" min="0">
                            </div>
                            <div class="form-group col-md-12">
                                <input type="hidden" id="codigoReal" value = "0">
                                <label for="unidadMedidaSelect">Unidad de medida:</label>
                                <select class="form-control" id="unidadMedidaSelect" name="unidadMedida"></select>
                            </div>
                        </div>
                        <br>                       
                        <button id="guardar" type="button" class="btn btn-primary">Guardar</button>
                        <button id="clear" type="button" class="btn btn-primary">Limpiar</button>
                    </form>
                </div>
            </div>
        </div>
    </div>`;

    document.querySelector('#root').innerHTML = html;
    document.getElementById("search").addEventListener("click",search);
    document.getElementById("limpiar").addEventListener("click",limpiar);
    document.getElementById("guardar").addEventListener("click",guardar);
    document.getElementById("clear").addEventListener("click",clear);
    document.getElementById("seleccionar").addEventListener("click",toggle_productoview);

    document.getElementById("codigo").disabled = true;
    document.getElementById("nombre").disabled = true;

    render_productooverlay();
    render_productoview();

    fetchAndListProductosProv();

    fetchAndListUnidadMedida();
}

function fetchAndListUnidadMedida(){
    let request = new Request(backend+`/unidadesMedida`,
        {method: 'GET', headers: { }});
    (async ()=>{
        const response = await fetch(request);
        if (!response.ok) {errorMessage(response.status);return;}
        unidadMedidaState.list = await response.json();
        render_unidadMedida();
    })();
}

function render_unidadMedida(){
    var select = document.getElementById("unidadMedidaSelect");
    select.innerHTML="";
    unidadMedidaState.list.forEach( item=>render_list_unidadMedida(select,item));
}
function render_list_unidadMedida(select,item){
    var option = document.createElement("option");
    option.value=item.id;
    option.text=item.id;
    option.title=item.descripcion;
    select.appendChild(option);
}

function search(event){
    event.preventDefault();
    let nombreBusqueda = document.getElementById("prod").value;
    if(nombreBusqueda==="") {fetchAndListProductos();return;}
    let request = new Request(backend+`/productosSearch/${loginstate.user.id}`+`/`+`${nombreBusqueda}`,
        {method: 'GET', headers: { }});
    (async ()=>{
        const response = await fetch(request);
        if (!response.ok) {errorMessage(response.status);return;}
        productoProveedorState.list = await response.json();
        render_listProductosProv();
    })();
}

function limpiar(event){
    event.preventDefault();
    document.getElementById("prod").value = "";
    fetchAndListProductosProv();
}

function clear(event){
    event.preventDefault();
    document.getElementById("codigo").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("descripcion").value = "";
    document.getElementById("precio").value = "";
    document.getElementById("unidadMedida").value = "";
    document.getElementById("impuesto").value = "";
}

function guardar(event){
    if (!validarFormulario()) {return;}
    event.preventDefault();
    let productoProveedorState = {
        cod: document.getElementById("codigoReal").value,
        descripcion: document.getElementById("descripcion").value,
        precio: document.getElementById("precio").value,
        idProveedor: loginstate.user.id,
        unidadMedida: {
            id: document.getElementById("unidadMedidaSelect").value
        },
        productoCabys :{
            idProducto: document.getElementById("codigo").value
        }
    };
    let request = new Request(backend+`/registrarProductoProv`,
        {method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(productoProveedorState)});
    (async ()=>{
        const response = await fetch(request);
        if (!response.ok) {errorMessage(response.status);return;}
        fetchAndListProductosProv();
    })();
}




function fetchAndListProductosProv(){
    let request = new Request(backend+`/productosProveedor/${loginstate.user.id}`,
        {method: 'GET', headers: { }});
    (async ()=>{
        const response = await fetch(request);
        if (!response.ok) {errorMessage(response.status);return;}
        productoProveedorState.list = await response.json();
        render_listProductosProv();
    })();
}

function render_listProductosProv(){
    var listado=document.querySelector(".table tbody");
    listado.innerHTML="";
    productoProveedorState.list.forEach( productoProveedorState=>render_list_itemProductosProv(listado,productoProveedorState));
}



function render_list_itemProductosProv(listado,productoProveedorState){

    var tr =document.createElement("tr");
    tr.innerHTML=`
        <td id="eliminar"><img src="/images/denegar.png" width="20" height="20"></td>
        <td>${productoProveedorState.productoCabys.idProducto}</td>
        <td>${productoProveedorState.productoCabys.nombreProducto}</td>
        <td>${productoProveedorState.descripcion}</td>
        <td>${productoProveedorState.unidadMedida.id}</td>
        <td>${productoProveedorState.precio}</td>
        <td>${productoProveedorState.productoCabys.impuestoProducto*100 + "%"}</td>
        <td id="editar"><img src="/images/editar.png" width="20" height="20"></td>`;
    tr.querySelector("#editar").addEventListener("click",()=>{editarProductoProv(productoProveedorState.cod);});
    tr.querySelector("#eliminar").addEventListener("click",()=>{eliminarProductoProv(productoProveedorState.cod);});
    listado.append(tr);
}

function editarProductoProv(cod) {
// Buscar el producto a editar en la lista de productos
    let productoProveedor = productoProveedorState.list.find(item => item.cod === cod);

    if (productoProveedor) {
        productoProveedorState.item = productoProveedor;

        // Cargar los valores en el formulario
        document.getElementById("codigoReal").value = productoProveedorState.item.cod;
        document.getElementById("codigo").value = productoProveedorState.item.productoCabys.idProducto;
        document.getElementById("nombre").value = productoProveedorState.item.productoCabys.nombreProducto;
        document.getElementById("descripcion").value = productoProveedorState.item.descripcion;
        document.getElementById("precio").value = productoProveedorState.item.precio;
        document.getElementById("unidadMedidaSelect").value = productoProveedorState.item.unidadMedida.id;
    } else {
        console.error(`Producto con código ${cod} no encontrado`);
    }
}

function eliminarProductoProv(cod) {
    let request = new Request(backend + `/eliminarProductoProv/${cod}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    });
    (async () => {
        const response = await fetch(request);
        if (!response.ok) {
            errorMessage(response.status);
            return;
        }
        fetchAndListProductosProv();
    })();

}


//----------------------------------------------------------------
function render_productooverlay(){
    html = `
        <div id="productooverlay" class="productooverlay"></div>
    `;
    overlay=document.createElement('div');
    overlay.innerHTML=html;
    document.body.appendChild(overlay);
    document.querySelector("#productooverlay").addEventListener("click",toggle_productoview);
}

function toggle_productoview(){
    document.getElementById("productooverlay").classList.toggle("active");
    document.getElementById("productoview").classList.toggle("active");
}

function render_productoview(){
    html = `<div class="productoview" id="productoview">
                <h2>Productos Cabys</h2>
                <div class="container-box">
                    <div class="search-container">
                        <form name="formulario" class="search-form">
                            <input type="text" name="prodCabys" id="prodCabys" placeholder="Buscar Producto" >                            
                            <button id="searchCabys" type="button" class="search-button">Buscar</button>
                            <button id="limpiarCabys" type="button" class="search-button">Limpiar</button>
                        </form>
                    </div>
                </div>
                               
                <div class="col-md-6">
                    <div style="overflow-y: auto; max-height: 300px;width: 600px;">
                        <table class="table table-hover table-fixed">
                            <thead class="thead-light">
                            <tr class="fixed-header">
                                </th> <th scope="col"> Código </th> 
                                <th scope="col"> Nombre </th>
                                <th scope="col"> Impuesto </th>
                                 <th scope="col">  </th> 
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
    document.getElementById("searchCabys").addEventListener("click",buscarCabys);
    document.getElementById("limpiarCabys").addEventListener("click",limpiarCabys);
    document.getElementById("boton_volver").addEventListener("click", toggle_productoview);

}

function buscarCabys(){
    nombre = document.getElementById("prodCabys").value;
    if(nombre=="") {return;}
    let request = new Request(backend+`/productosCabys/${nombre}`,
        {method: 'GET', headers: {}});
    (async ()=>{
        const response = await fetch(request);
        if (!response.ok) {errorMessage(response.status);return;}
        productoCabysState.list = await response.json();
        render_productosCabys()
    })();
}

function limpiarCabys(){
    document.getElementById("prodCabys").value = "";
    productoCabysState.list = new Array();
    render_productosCabys();
}

function render_productosCabys() {
    var listado=document.getElementById("list");
    listado.innerHTML="";
    productoCabysState.list.forEach( item=>render_list_productosCabys(listado,item));
}

function render_list_productosCabys(listado,item){
    var tr =document.createElement("tr");
    tr.innerHTML=`<td>${item.idProducto}</td>
                    <td>${item.nombreProducto}</td>
                    <td>${item.impuestoProducto*100+"%"}</td>
                    <td id='seleccionar'><img src="/images/aceptar.png" width="20" height="20"></td>`;
    tr.querySelector("#seleccionar").addEventListener("click",()=>{seleccionar(item);});
    listado.append(tr);
}

function seleccionar(item){
    productoCabysState.item = item;
    document.getElementById("codigo").value =  productoCabysState.item.idProducto;
    document.getElementById("nombre").value =  productoCabysState.item.nombreProducto;
    toggle_productoview();
}

function validarFormulario(){
    let campos = ["codigo", "nombre", "descripcion", "precio", "unidadMedidaSelect"];
    let todosCompletos = true;
    for (let i = 0; i < campos.length; i++) {
        let campo = document.getElementById(campos[i]);
        let label = document.querySelector(`label[for=${campos[i]}]`);
        if (!campo.value || (campo.type === "number" && campo.value <= 0)) {
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
        return false;
    }
    return true;
}






