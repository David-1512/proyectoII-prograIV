


var clienteState = {
    list: new Array(),
    item: {
        id: "",
        nombre: "",
        correo: "",
        telefono: "",
        tipoId: ""
    }
};


document.addEventListener("DOMContentLoaded",loaded);

async function loaded(event){
    try{ await menu();} catch(error){return;} //Cambiar a menu
    clientes();
}

function clientes(){
    html = `
    <div class="container-box">
        <h2>Clientes</h2>    
        
        <div class="search-container">
            <form name="formulario" class="search-form">
                <input type="text" name="busq" id="busq" placeholder="Buscar Cliente" >
                <button type="button" class="search-button">Buscar</button>
            </form>
        </div>
    </div>

    <div class="juntos">

            <div class="izquierda">
            <div style="overflow-y: auto; max-height: 300px;">
                <table class="table table-hover">
                        <thead class="thead-light">
                        <tr class="fixed-header">
                            <th scope="col"> </th> <th scope="col">Identificacion</th> <th scope="col">Nombre</th> <th scope="col">Correo</th> <th scope="col">Teléfono</th> <th scope="col"> </th>
                        </tr>
                        </thead>
                        <tbody>
                        
                        </tbody>
                </table>
            </div>
            </div>

        <div class="derecha">
            <h4>Formulario</h4>
            <div class="containerEdit">
                <form th:action="@{/clientes/agregar}" method="post">
                    <div class="form-row">
                        <div class="form-group col-md-12">
                            <label for="identificacion">Identificacion:</label>
                            <input type="text" class="form-control" id="identificacion" name="identificacion"
                                   th:value="${cliente != null ? cliente.getId() : ''}"
                                   th:disabled="${cliente != null}" required>
                            <input type="hidden" name="identificacion" th:if="${cliente != null}" th:value="${cliente.getId()}">
                        </div>
                        <div class="form-group col-md-12">
                            <label for="nombre">Nombre:</label>
                            <input type="text" class="form-control" id="nombre" name="nombre"
                                   th:value="${cliente != null ? cliente.getNombre(): ''}" required>
                        </div>
                        <div class="form-group col-md-12">
                            <label for="correo">Correo:</label>
                            <input type="email" class="form-control" id="correo" name="correo"
                                   th:value="${cliente != null ? cliente.getCorreo(): ''}" required>
                        </div>
                        <div class="form-group col-md-12">
                            <label for="telefono">Telefono:</label>
                            <input type="number" class="form-control" id="telefono" name="telefono"
                                   th:value="${cliente != null ? cliente.getTelefono() : ''}" required min="18">
                        </div>
                    </div>
                    <br>
                    <input type="hidden" name="esCliente" th:value="${cliente != null}">
                    <input type="hidden" name="idProv" th:value="${proveedor.get().getId()}">
                    <p th:if="${error}" th:text="${error}" class="error-message"></p>
                    <button type="submit" class="btn btn-primary">Guardar</button>
                    <a th:href="@{/clientes(idProv=${session.proveedor.getId()})}">Limpiar</a>
                </form>
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











