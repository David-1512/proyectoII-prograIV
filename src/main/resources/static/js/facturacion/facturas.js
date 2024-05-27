var stateFacturas ={
    list: new Array(),
    id : "",
    cliente:{id:"", nombre:"",correo:"", telefono:"",tipoId:""},
    proveedor:{id:"",nombre:"",correo:"",telefono:"",ubicacion:"",nomComercial:"",tipoId: ""},
    producto:{idUniMedida: "", idProducto: "", precio: 0.0, nombre: ""},
    listLineas:new Array()
}

document.addEventListener("DOMContentLoaded",loaded);

async function loaded(event) {
    loadProveedorFacturacion();
    try{ await menu();} catch(error){return;}
    document.getElementById("salirFacturas").addEventListener("click", returnMenu);
    fetchAndListFacturas();
}
function loadProveedorFacturacion() {
    const storedState = localStorage.getItem('proveedor');
    if (storedState) {
        stateFacturas.id = JSON.parse(storedState);
    }
}
function fetchAndListFacturas() {
    const request = new Request(backend +`/facturas/${stateFacturas.id}`, { method: 'GET', headers: {} });
    (async ()=>{
        const response = await fetch(request);
        if (!response.ok) {
            errorMessage(response.status);
            return;
        }
        const responseData = await response.json();
        stateFacturas.list = responseData.object;
         render_listFacturas();
    })();
}

function render_listFacturas(){
    var listado=document.getElementById("listFacturas");
    listado.innerHTML="";
    stateFacturas.list.forEach(item=>
        (async ()=>{
           await render_list_itemFacturas(listado,item);
        })());
}
async function render_list_itemFacturas(listado,item){
    await searchClient(item);
    var tr =document.createElement("tr");
    tr.innerHTML=`   <td>${item.consecutivo}</td>
                    <td>${item.numFactura}</td>
                    <td>${item.idCliente}</td>
					<td>${stateFacturas.cliente.nombre}</td>
					<td>
					<input id="genXML" class="btn btn-primary" type="button" value="Generar XML">
                    </td>
                     <td>
					<input id="genPDF" class="btn btn-primary" type="button" value="Generar PDF">
                    </td>
                    <td>
					<input id="elimFactura" class="btn btn-primary" type="button" value="Eliminar">
                    </td>`;
    tr.querySelector("#genXML").addEventListener("click", async () => {
        await generateXML(item);
    });
    tr.querySelector("#genPDF").addEventListener("click", async () => {
        await generatePDF(item);
    });
    tr.querySelector("#elimFactura").addEventListener("click", () => { deleteServiceLine(item);});
    listado.append(tr);
}

async function generateXML(item){
       await searchClient(item);
       await searchSupplier(item);
       await searchListProductos(item);

        var doc = document.implementation.createDocument(null, null, null);

        var rootElement = doc.createElement("FacturaElectronica");
        doc.appendChild(rootElement);

        var numFactura = doc.createElement("Clave");
        numFactura.textContent = item.numFactura;
        rootElement.appendChild(numFactura);

        var fechaEmision = doc.createElement("FechaEmision");
        fechaEmision.textContent = item.fechEmision;
        rootElement.appendChild(fechaEmision);

        var proveedor = doc.createElement("Emisor");

        var nombreProveedor = doc.createElement("Nombre");
        nombreProveedor.textContent = stateFacturas.proveedor.nombre;
        proveedor.appendChild(nombreProveedor);

        var tipoIdProveedor = doc.createElement("TipoIdentificacion");
        tipoIdProveedor.textContent = stateFacturas.proveedor.tipoId;
        proveedor.appendChild(tipoIdProveedor);

        var idProveedor = doc.createElement("Identificacion");
        idProveedor.textContent = stateFacturas.proveedor.id;
        proveedor.appendChild(idProveedor);

        var telProveedor = doc.createElement("Telefono");
        telProveedor.textContent = stateFacturas.proveedor.telefono;
        proveedor.appendChild(telProveedor);

        var ubiProveedor = doc.createElement("Ubicacion");
        ubiProveedor.textContent = stateFacturas.proveedor.ubicacion;
        proveedor.appendChild(ubiProveedor);

        rootElement.appendChild(proveedor);

        var cliente = doc.createElement("Receptor");

        var nombreCliente = doc.createElement("Nombre");
        nombreCliente.textContent = stateFacturas.cliente.nombre;
        cliente.appendChild(nombreCliente);

        var tipoIdCliente = doc.createElement("TipoIdentificacion");
        tipoIdCliente.textContent = stateFacturas.cliente.tipoId;
        cliente.appendChild(tipoIdCliente);

        var idCliente = doc.createElement("Identificacion");
        idCliente.textContent = stateFacturas.cliente.id;
        cliente.appendChild(idCliente);

        var correoCliente = doc.createElement("CorreoElectronico");
        correoCliente.textContent = stateFacturas.cliente.correo;
        cliente.appendChild(correoCliente);

        var telCliente = doc.createElement("Telefono");
        telCliente.textContent = stateFacturas.cliente.telefono;
        cliente.appendChild(telCliente);

        rootElement.appendChild(cliente);

        var detalleServicio = doc.createElement("DetalleServicio");

    await Promise.all(stateFacturas.listLineas.map(async (linea) => {
        await searchProducto(linea.codProducto);

        var linServicio = doc.createElement("LineaDetalle");

        var idLinea = doc.createElement("NumeroLinea");
        idLinea.textContent = linea.idLinea;
        linServicio.appendChild(idLinea);

        var codProduc = doc.createElement("CodigoProducto");
        codProduc.textContent = linea.codProducto;
        linServicio.appendChild(codProduc);

        var nomProducto = doc.createElement("Detalle");
        nomProducto.textContent = stateFacturas.producto.nombre;
        linServicio.appendChild(nomProducto);

        var uniMedida = doc.createElement("UnidadMedida");
        uniMedida.textContent = stateFacturas.producto.idUniMedida;
        linServicio.appendChild(uniMedida);

        var precio = doc.createElement("PrecioUnitario");
        precio.textContent = stateFacturas.producto.precio;
        linServicio.appendChild(precio);

        var cantidad = doc.createElement("Cantidad");
        cantidad.textContent = linea.cantidad;
        linServicio.appendChild(cantidad);

        var montoLinea = doc.createElement("MontoTotalLinea");
        montoLinea.textContent = linea.subtotal;
        linServicio.appendChild(montoLinea);

        detalleServicio.appendChild(linServicio);
    }));

        rootElement.appendChild(detalleServicio);

        var medioPago = doc.createElement("MedioDePago");
        medioPago.textContent = item.medioPago;
        rootElement.appendChild(medioPago);

        var total = doc.createElement("MontoTotal");
        total.textContent = item.total;
        rootElement.appendChild(total);

        var xmlString = new XMLSerializer().serializeToString(doc);
        var xmlBlob = new Blob([xmlString], { type: "text/xml;charset=utf-8" });
        saveAs(xmlBlob, `${item.idCliente}_${item.numFactura}.xml`);
}

async function generatePDF(item){
    await searchClient(item);
    await searchSupplier(item);
    await searchListProductos(item);

    try {
        const pdfDoc = await PDFLib.PDFDocument.create();
        const page = pdfDoc.addPage([612, 792]);
        const fontSize = 12;
        const timesRomanFont = await pdfDoc.embedFont(PDFLib.StandardFonts.TimesRoman);
        const { rgb } = PDFLib;


        const titulo = "FACTURACION S.A";
        const fecha = "FECHA: " + item.fechEmision;
        const numFactura = "FACTURA: " + item.numFactura;

        const nomProveedor = "NOMBRE: " + stateFacturas.proveedor.nombre;
        const idProveedor = "IDENTIFICACION: " + stateFacturas.proveedor.id;
        const nomComProveedor = "NOMBRE COMERCIAL: " + stateFacturas.proveedor.nomComercial;
        const telProveedor = "TELEFONO: " + stateFacturas.proveedor.telefono;
        const correoProveedor = "CORREO: " + stateFacturas.proveedor.correo;
        const ubiProveedor = "UBICACION: " + stateFacturas.proveedor.ubicacion;

        const nomCliente = "NOMBRE: " + stateFacturas.cliente.nombre;
        const idCliente = "IDENTIFICACION: " + stateFacturas.cliente.id;
        const telCliente = "TELEFONO: " + stateFacturas.cliente.telefono;
        const correoCliente = "CORREO: " + stateFacturas.cliente.correo;

        const total = "TOTAL: " + item.total +" colones";

        let y = page.getHeight() - 50;

        page.drawText(titulo, { x: 240, y,size: fontSize, font: timesRomanFont });
        y -= 50;
        page.drawText(fecha, { x: 420, y,size: fontSize, font: timesRomanFont });
        y -= 20;
        page.drawText(numFactura, { x: 420, y,size: fontSize, font: timesRomanFont});

        y -= 50;
        page.drawText("PROVEEDOR:", { x: 50, y, size: fontSize, font: timesRomanFont });
        page.drawText("CLIENTE:", { x: 420, y, size: fontSize, font: timesRomanFont });
        y -= 20;
        page.drawText(nomProveedor, { x: 50, y, size: fontSize, font: timesRomanFont });
        page.drawText(nomCliente, { x: 420, y, size: fontSize, font: timesRomanFont });
        y -= 20;
        page.drawText(idProveedor, { x: 50, y, size: fontSize, font: timesRomanFont });
        page.drawText(idCliente, { x: 420, y, size: fontSize, font: timesRomanFont });
        y -= 20;
        page.drawText(nomComProveedor, { x: 50, y, size: fontSize, font: timesRomanFont });
        page.drawText(telCliente, { x: 420, y, size: fontSize, font: timesRomanFont });
        y -= 20;
        page.drawText(telProveedor, { x: 50, y, size: fontSize, font: timesRomanFont});
        page.drawText(correoCliente, { x: 420, y, size: fontSize, font: timesRomanFont});
        y -= 20;
        page.drawText(correoProveedor, { x: 50, y, size: fontSize, font: timesRomanFont });
        y -= 20;
        page.drawText(ubiProveedor, { x: 50, y, size: fontSize, font: timesRomanFont });

        y -= 80;
        page.drawText("PRODUCTOS", { x: 240, y, size: 12 });
        y -= 30;

        const tableHeaders = ['NUMLINEA', 'DETALLE', 'CODPRODUCTO', 'UNIMEDIDA', 'PRECIO', 'CANTIDAD', 'SUBTOTAL'];
        const tableWidth = page.getWidth() - 100;
        const cellWidth = tableWidth / tableHeaders.length;

        tableHeaders.forEach((header, i) => {
            page.drawText(header, { x: 50 + i * cellWidth, y, size: fontSize, font: timesRomanFont, color: rgb(0, 0, 0) });
        });
        y -= 20;

        const splitText = (text, maxWidth, fontSize, font) => {
            const lines = [];
            let currentLine = '';
            const words = text.split(' ');

            words.forEach(word => {
                const testLine = currentLine + word + ' ';
                const { width } = font.widthOfTextAtSize(testLine, fontSize);

                if (width < maxWidth) {
                    currentLine = testLine;
                } else {
                    lines.push(currentLine.trim());
                    currentLine = word + ' ';
                }
            });

            lines.push(currentLine.trim());
            return lines;
        };

        for (let lineaServicio of stateFacturas.listLineas) {
            await searchProducto(lineaServicio.codProducto);
            const row = [
                lineaServicio.idLinea,
                stateFacturas.producto.nombre,
                lineaServicio.codProducto,
                stateFacturas.producto.idUniMedida,
                stateFacturas.producto.precio.toString(),
                lineaServicio.cantidad.toString(),
                lineaServicio.subtotal.toString()
            ];
            row.forEach((cell, i) => {
                const cellX = 50 + i * cellWidth;
                const cellMaxWidth = cellWidth - 5;
                const lines = splitText(cell, cellMaxWidth, fontSize, timesRomanFont);

                lines.forEach(line => {
                    page.drawText(line, { x: cellX, y, size: fontSize, font: timesRomanFont, color: rgb(0, 0, 0) });
                    y -= fontSize + 2;
                });

                y += lines.length * (fontSize + 2);
            });
            y -= 20;
        }
        y -= 60;
        page.drawText(total, { x: 50, y, size: fontSize, font: timesRomanFont });

        const pdfBytes = await pdfDoc.save();
        var pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
        saveAs(pdfBlob,`${item.idCliente}_${item.numFactura}.pdf`);
    }catch (error) {
        console.error("Hubo un error:", error);
    }
}

async function searchProducto(cod){
    const request = new Request(backend + `/producto/${cod}`, {method: 'GET', headers: {}});
    const response = await fetch(request);
    if (!response.ok) {
        errorMessage(response.status);
        return;
    }
    const responseData = await response.json();
    if (responseData.object) {
        const producto = responseData.object;
        stateFacturas.producto.idProducto = producto.idProducto;
        stateFacturas.producto.nombre = producto.nombre;
        stateFacturas.producto.precio = producto.precio;
        stateFacturas.producto.idUniMedida = producto.idUnidadMedida;
    } else {
        errorMessage("Respuesta inválida del servidor");
    }
}
async function searchListProductos(item){
    const request = new Request(backend + `/lineasServicio/${item.numFactura}`, {method: 'GET', headers: {}});
    const response = await fetch(request);
    if (!response.ok) {
        errorMessage(response.status);
        return;
    }
    const responseData = await response.json();
    if (responseData.object) {
        const lineasFactura = responseData.object;
        stateFacturas.listLineas = lineasFactura;
    } else {
        errorMessage("Respuesta inválida del servidor");
    }
}

async function searchSupplier(item){
    const request = new Request(backend + `/proveedor/${item.idProveedor}`, {method: 'GET', headers: {}});
        const response = await fetch(request);
        if (!response.ok) {
            errorMessage(response.status);
            return;
        }
        const responseData = await response.json();
        if (responseData.object) {
            const proveedor = responseData.object;
            stateFacturas.proveedor.id = proveedor.id;
            stateFacturas.proveedor.nombre = proveedor.nombre;
            stateFacturas.proveedor.telefono = proveedor.telefono;
            stateFacturas.proveedor.tipoId = proveedor.tipoId;
            stateFacturas.proveedor.nomComercial = proveedor.nomComercial;
            stateFacturas.proveedor.correo = proveedor.correo;
            stateFacturas.proveedor.ubicacion = proveedor.ubicacion;
        } else {
            errorMessage("Respuesta inválida del servidor");
        }
}


async function searchClient(item){
    const request = new Request(backend + `/cliente/${item.idCliente}`, {method: 'GET', headers: {}});
        const response = await fetch(request);
        if (!response.ok) {
            errorMessage(response.status);
            return;
        }
        const responseData = await response.json();
        if (responseData.object) {
            const cliente = responseData.object;
            stateFacturas.cliente.nombre = cliente.nombre;
            stateFacturas.cliente.id = cliente.id;
            stateFacturas.cliente.tipoId = cliente.tipoId;
            stateFacturas.cliente.correo = cliente.correo;
            stateFacturas.cliente.telefono = cliente.telefono;
        } else {
            errorMessage("Respuesta inválida del servidor");
        }
}

function deleteServiceLine(item){
    let request = new Request(backend+`/lineasServicio/${item.numFactura}`,
        {method: 'DELETE', headers: {}});
    (async ()=>{
        const response = await fetch(request);
        if (!response.ok) {errorMessage(response.status);return;}
        deleteBill(item);
    })();
}

function deleteBill(item){
    let request = new Request(backend+`/factura/${item.numFactura}`,
        {method: 'DELETE', headers: {}});
    (async ()=>{
        const response = await fetch(request);
        if (!response.ok) {errorMessage(response.status);return;}
        fetchAndListFacturas();
    })();
}

function returnMenu(){
    document.location="/views/facturacion/viewFacturacion.html";
}