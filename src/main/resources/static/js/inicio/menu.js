var backend="http://localhost:8080/api/v1";

async function render_menu() {
        html = `
            <nav class="navbar navbar-expand-lg navbar-light bg-light">

        <div class="container-fluid">
            <a class="navbar-brand" href="/">
                <img src="/images/log.png" alt="LogoEmpresa" height="40">
                <strong>Facturación S.A</strong>
            </a>
            <div>
                <div class="collapse navbar-collapse">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link" href = "/views/inicio/bienvenida.html">Inicio</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link">Clientes</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href = "/views/facturacion/viewFacturacion.html">Facturación</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link">Productos</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" >Logout</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
        `;
        document.querySelector('#menu').innerHTML = html;
        render_piePagina();
}

function render_piePagina() {
    html = `
    <div class="container">
        <p>Proyecto Programación IV &copy;  - 2023</p>
    </div>
        `;
    document.querySelector('#piePagina').innerHTML = html;
}

function errorMessage(status,place){
    switch(status){
        case 404: error= "Registro no encontrado"; break;
        case 409: error="Registro duplicado"; break;
        case 401: error="Usuario no autorizado"; break;
        case 403: error="Usuario no tiene derechos"; break;
    }
    window.alert(error);
}