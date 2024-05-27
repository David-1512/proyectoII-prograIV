var statefactura ={
    proveedor: {nombre:"",id:""},
    cliente:{nombre:"",id:""},
    producto:{cod:"",nombre:"",precio:0.0},
    lineasServicio: new Array(),
    lineaServicio: {cod:0,cantidad:0,subtotal:0.0,codProducto:"",nomProducto:"",precioProducto:0.0},
    total: 0.0
}

let lineasServicio = [];

var factura = {
  numFactura: "",
    consecutivo:"",
    fechEmision:"",
     total:0.0,
    idCliente:"",
    idProveedor: "",
    medioPago: ""
}

document.addEventListener("DOMContentLoaded",loaded);

async function loaded(event) {
    statefactura.proveedor.id = localStorage.getItem('idProveedor');
    statefactura.proveedor.nombre = localStorage.getItem('nomProveedor');
    loadState();
    try{ await menu();} catch(error){return;}
    document.getElementById("buscarProducto").addEventListener("click", searchProduct);
    document.querySelector("#buscarCliente").addEventListener('click', searchClient);
    document.getElementById("agregarProducto").addEventListener("click", addProduct);
    document.getElementById("guardarFactura").addEventListener("click", addBill);
    document.getElementById("verFacturas").addEventListener("click", seeBills);
    document.getElementById("limpiarFactura").addEventListener("click", clean);

}

function loadState() {
    document.getElementById("nombreProveedor").value = statefactura.proveedor.nombre;
    const cliente = localStorage.getItem('cliente');
    if (cliente && cliente !== "null" && cliente !== "") {
        statefactura.cliente = JSON.parse(cliente);
        document.getElementById("nombreCliente").value = statefactura.cliente.nombre;
    }

    const producto = localStorage.getItem('producto');
    if (producto && producto !== "null" && producto !== "") {
        statefactura.producto = JSON.parse(producto);
        document.getElementById("detalleProducto").value = statefactura.producto.nombre;
    }
    const lineas = localStorage.getItem('listLineasServicio');
    if (lineas && lineas !== "null" && lineas !== "") {
        statefactura.lineasServicio = JSON.parse(lineas);
        render_listLineasServicio();
    }
    if (statefactura.lineasServicio.length !== 0) {
        calculateTotal();
        document.getElementById("totalFactura").value = statefactura.total;
    }
}

function searchClient(){
    localStorage.setItem('proveedor', JSON.stringify(statefactura.proveedor.id));
    document.location = "/views/facturacion/viewClientes.html";
}

function searchProduct(){
    localStorage.setItem('proveedor', JSON.stringify(statefactura.proveedor.id));
    document.location = "/views/facturacion/viewProductos.html";
}

function addProduct(){
    var nuevaLineaServicio = {
        cod: statefactura.lineasServicio.length + 1,
        codProducto: statefactura.producto.cod,
        nomProducto: statefactura.producto.nombre,
        precioProducto: statefactura.producto.precio,
        cantidad: document.getElementById("cantidad").value,
        subtotal: calculateSubtotal(statefactura.producto.precio, document.getElementById("cantidad").value)
    };
    if(nuevaLineaServicio.nomProducto === ""){
        alert("Error: No se ha seleccionado un producto para Agregar");
        return;
    }
    const resultado = statefactura.lineasServicio.find(linea => linea.codProducto === nuevaLineaServicio.codProducto);
    if (resultado) {
        alert("Error: Ya ese producto se encuentra en la lista");
        return;
    }
    statefactura.lineasServicio.push(nuevaLineaServicio);
    localStorage.setItem('listLineasServicio', JSON.stringify(statefactura.lineasServicio));
    localStorage.removeItem('producto');
    document.location = "/views/facturacion/viewFacturacion.html";
}

function calculateSubtotal(pre,cant){
    return pre*cant;
}

function calculateTotal(){
    statefactura.total = 0.0;
    for(let linea of statefactura.lineasServicio){
        statefactura.total += linea.subtotal;
    }
    document.getElementById("totalFactura").value = statefactura.total;
}

function render_listLineasServicio(){
    var listado=document.getElementById("listLineasServicio");
    listado.innerHTML="";
    statefactura.lineasServicio.forEach( item=>render_list_itemLineasServicio(listado,item));
}

function render_list_itemLineasServicio(listado,item){
    var tr =document.createElement("tr");
    tr.innerHTML=`<td>${item.cod}</td>
                    <td>${item.codProducto}</td>
                    <td>${item.nomProducto}</td>
                    <td>${item.precioProducto}</td>
                    <td>${item.cantidad}</td>
                    <td>${item.subtotal}</td>
					<td>
					<input id="disCant" class="btn btn-primary" type="button" value="-">
                    </td>
                    <td>
					<input id="aumCant" class="btn btn-primary" type="button" value="+">
                    </td>
                     <td>
					<input id="eliminarLinea" class="btn btn-primary" type="button" value="Eliminar">
                    </td>`;
    tr.querySelector("#disCant").addEventListener("click", () => { decreaseQuantity(item);});
    tr.querySelector("#aumCant").addEventListener("click", () => { increaseQuantity(item);});
    tr.querySelector("#eliminarLinea").addEventListener("click", () => { deleteLinea(item);});
    listado.appendChild(tr);
}

function decreaseQuantity(item){
    item.cantidad = parseInt(item.cantidad, 10);
    if(item.cantidad !== 1){
        item.cantidad -= 1;
        item.subtotal = calculateSubtotal(item.precioProducto,item.cantidad);
        localStorage.setItem('listLineasServicio', JSON.stringify(statefactura.lineasServicio));
        render_listLineasServicio();
       calculateTotal();
    }
    else{
        alert("Error: La cantidad minima es 1");
    }
}

function increaseQuantity(item){
        item.cantidad = parseInt(item.cantidad, 10);
        item.cantidad += 1;
        item.subtotal = calculateSubtotal(item.precioProducto,item.cantidad);
    localStorage.setItem('listLineasServicio', JSON.stringify(statefactura.lineasServicio));
        render_listLineasServicio();
        calculateTotal();
}

function deleteLinea(item){
      let indice = statefactura.lineasServicio.indexOf(item);
    for(let linea of statefactura.lineasServicio){
        if(indice < statefactura.lineasServicio.indexOf(linea)){
            linea.cod -= 1;
        }
    }
    statefactura.lineasServicio.splice(indice,1);
    localStorage.setItem('listLineasServicio', JSON.stringify(statefactura.lineasServicio));
    calculateTotal();
    render_listLineasServicio();
}

function addBill(){
    prepareBill();
    if(statefactura.cliente.id === ""){
        alert("Error: No se ha seleccionado un cliente");
        return;
    }
    if(document.getElementById('metodosPago').value === "No seleccionado"){
        alert("Error: No se ha seleccionado un metodo de pago");
        return;
    }
    if(statefactura.lineasServicio.length === 0){
        alert("Error: No se ha añadido ningún producto a la factura");
        return;
    }
    let request = new Request(backend+'/factura', {method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(factura)});
    (async ()=>{
        const response = await fetch(request);
        if (!response.ok) {errorMessage(response.status);return;}
        addLinesService();
    })();
}

function prepareBill(){
    factura.total = statefactura.total;
    factura.idCliente = statefactura.cliente.id;
    factura.idProveedor = statefactura.proveedor.id;
    factura.medioPago = document.getElementById('metodosPago').value;
}

function addLinesService(){
    prepareLineService();
    const request = new Request(backend +`/lineasServicio`, {method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(lineasServicio)});
    (async ()=>{
        const response = await fetch(request);
        if (!response.ok) {errorMessage(response.status);return;}
        alert("Factura guardada exitosamente");
        clean();
    })();
}


function prepareLineService(){
    for(let linea of statefactura.lineasServicio){
        const nuevaLineaServicio = {
            id: "",
            idLinea: linea.cod,
            cantidad: linea.cantidad,
            impuesto: 0,
            subtotal: linea.subtotal,
            codProducto: linea.codProducto,
            numFactura: ""
        };
       lineasServicio.push(nuevaLineaServicio);
    }
}

function seeBills(){
    localStorage.setItem('proveedor', JSON.stringify(statefactura.proveedor.id));
    document.location = "/views/facturacion/viewFacturas.html";
}

function clean(){
    localStorage.removeItem('cliente');
    localStorage.removeItem('producto');
    localStorage.removeItem('listLineasServicio');
    document.location = "/views/facturacion/viewFacturacion.html";
}