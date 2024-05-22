var factura ={
    proveedor: {nombre:"Verrati Salazar",id:"86952"},
    cliente:{nombre:"",id:""},
    producto:{cod:"",nombre:"",precio:0.0},
    lineasServicio: new Array(),
    lineaServicio: {cod:0,cantidad:0,subtotal:0.0,codProducto:"",nomProducto:"",precioProducto:0.0},
    total: 0.0
}

document.addEventListener("DOMContentLoaded",loaded);

async function loaded(event) {
   loadState();
    try {
        await render_menu();
    } catch (error) {
        return;
    }

    document.getElementById("buscarProducto").addEventListener("click", searchProduct);
    document.querySelector("#buscarCliente").addEventListener('click', searchClient);
    document.getElementById("agregarProducto").addEventListener("click", addProduct);
    document.getElementById("guardarFactura").addEventListener("click", addBill);
}

function loadState() {
    document.getElementById("nombreProveedor").value = factura.proveedor.nombre;
    const cliente = localStorage.getItem('cliente');
    if (cliente && cliente !== "null" && cliente !== "") {
        factura.cliente = JSON.parse(cliente);
        document.getElementById("nombreCliente").value = factura.cliente.nombre;
    }

    const producto = localStorage.getItem('producto');
    if (producto && producto !== "null" && producto !== "") {
        factura.producto = JSON.parse(producto);
        document.getElementById("detalleProducto").value = factura.producto.nombre;
    }
    const lineas = localStorage.getItem('listLineasServicio');
    if (lineas && lineas !== "null" && lineas !== "") {
        factura.lineasServicio = JSON.parse(lineas);
        render_listLineasServicio();
    }
    if (factura.lineasServicio.length === 0) {
        calculateTotal();
        document.getElementById("totalFactura").value = factura.total;
    }
}

function searchClient(){
    localStorage.setItem('proveedor', JSON.stringify(factura.proveedor.id));
    document.location = "/views/facturacion/viewClientes.html";
}

function searchProduct(){
    localStorage.setItem('proveedor', JSON.stringify(factura.proveedor.id));
    document.location = "/views/facturacion/viewProductos.html";
}

function addProduct(){
    var nuevaLineaServicio = {
        cod: factura.lineasServicio.length + 1,
        codProducto: factura.producto.cod,
        nomProducto: factura.producto.nombre,
        precioProducto: factura.producto.precio,
        cantidad: document.getElementById("cantidad").value,
        subtotal: calculateSubtotal(factura.producto.precio, document.getElementById("cantidad").value)
    };

    factura.lineasServicio.push(nuevaLineaServicio);
    localStorage.setItem('listLineasServicio', JSON.stringify(factura.lineasServicio));
    render_listLineasServicio();
    calculateTotal();
}

function calculateSubtotal(pre,cant){
    return pre*cant;
}

function calculateTotal(){
    factura.total = 0.0;
    for(let linea of factura.lineasServicio){
        factura.total += linea.subtotal;
    }
    document.getElementById("totalFactura").value = factura.total;
}

function render_listLineasServicio(){
    var listado=document.getElementById("listLineasServicio");
    listado.innerHTML="";
    factura.lineasServicio.forEach( item=>render_list_itemLineasServicio(listado,item));
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
        localStorage.setItem('listLineasServicio', JSON.stringify(factura.lineasServicio));
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
    localStorage.setItem('listLineasServicio', JSON.stringify(factura.lineasServicio));
        render_listLineasServicio();
        calculateTotal();
}

function deleteLinea(item){
      let indice = factura.lineasServicio.indexOf(item);
    for(let linea of factura.lineasServicio){
        if(indice < factura.lineasServicio.indexOf(linea)){
            linea.cod -= 1;
        }
    }
    factura.lineasServicio.splice(indice,1);
    localStorage.setItem('listLineasServicio', JSON.stringify(factura.lineasServicio));
    calculateTotal();
    render_listLineasServicio();
}

function addBill(){
    const request = new Request(backend +`/factura`, {method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(factura)});
    (async ()=>{
        const response = await fetch(request);
        if (!response.ok) {errorMessage(response.status);return;}
        alert("Factura guardada exitosamente");
    })();
}

