var api=backend+'/productos';

var state ={
    list: new Array(),
    item : {idProducto:"", nombreProducto:"",descripcion:"",precio:0 ,impuestoProducto: 0, id: ""},
}

document.addEventListener("DOMContentLoaded",loaded);
async function loaded(event){
    try{ await menu();} catch(error){return;} //Cambiar a menu
    productos();
}

function productos(event){
    html = `<h1>Mis Productos</h1>
        <div class="search-container">
            <form name="formulario" class="search-form">
                <input id="prod" type="text" name="prod" placeholder="Buscar Producto">
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
                    <th scope="col">Descripcion</th>
                    <th scope="col">Precio</th>
                    <th scope="col">impuesto</th>
                    <th scope="col">Unidad de Medida</th>
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
    fetchAndList();
}

//-------------------------------------BOTONES-------------------------------
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


//--------------------------------- Metodos Busqueda-----------------------------
function fetchAndList(){
    const request = new Request(api+`/${state.item.id}`, {method: 'GET', headers: { }});
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
    tr.innerHTML=`<td>${item.idProducto}</td>
                    <td>${item.nombreProducto}</td>
                    <td>${item.descripcion}</td>
                    <td>${item.precio}</td>
                    <td>${item.impuestoProducto*100}</td>
                    <td>${item.id}</td>
                    
                    
	// 				<td id='ver'><img src="/images/ver-mas.png" width="20" height="20"></td>`;
    // tr.querySelector("#ver").addEventListener("click",()=>{ver(item.id);});
    listado.append(tr);
}