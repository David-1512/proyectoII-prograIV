var backend="http://localhost:8080/api/v1";

var loginstate ={
    logged: false,
    user : {id:"",nombre:"", rol:"", estado:''}
}

async function checkuser(){
    let request = new Request(backend+'/current-user', {method: 'GET'});
    const response = await fetch(request);
    if (response.ok) {
        loginstate.logged = true;
        loginstate.user = await response.json();
        localStorage.setItem('proveedor', JSON.stringify(loginstate.user));
    }
    else {
        loginstate.logged = false;
    }
}

async function menu(){
    await checkuser();
    if (!loginstate.logged
        && document.location.pathname != "/views/inicio/inicioLogin.html") {
        document.location = "/views/inicio/inicioLogin.html";
        throw new Error("Usuario no autorizado");
    }
    render_menu();
}

async function render_menu() {
    if (loginstate.logged && loginstate.user.rol == "ADM") {
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
                                <li id="inicio" class="nav-item">
                                    <a class="nav-link" href = "#">Inicio</a>
                                </li>
                                <li id="proveedores" class="nav-item">
                                    <a class="nav-link" href = "#">Proveedores</a>
                                </li>
                                <li id="solicitudes" class="nav-item">
                                    <a class="nav-link" href = "#">Solicitudes</a>
                                </li>
                                <li id="logout" class="nav-item">
                                    <a class="nav-link" href = "#">Logout</a>
                                </li>      
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        `;
        document.querySelector('#menu').innerHTML = html;
        document.querySelector("#menu #inicio").addEventListener('click', e => {
            document.location = "/views/inicio/viewBienvenida.html";
        });
        document.querySelector("#menu #proveedores").addEventListener('click', e => {
            document.location = "/views/administracion/viewProveedores.html";
        });
        document.querySelector("#menu #solicitudes").addEventListener('click', e => {
            document.location = "/views/administracion/viewSolicitudes.html";
        });
        document.querySelector("#menu #logout").addEventListener('click', logout);

        render_piePagina();

    } else if (loginstate.logged && loginstate.user.rol == "PRO" && loginstate.user.estado == 'A') {
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
                                <li id="inicio" class="nav-item">
                                    <a class="nav-link" href = "#">Inicio</a>
                                </li>
                                <li id="clientes" class="nav-item">
                                    <a class="nav-link" href = "#">Clientes</a>
                                </li>
                                <li id="facturacion" class="nav-item">
                                    <a class="nav-link" href = "#">Facturación</a>
                                </li>
                                <li id="productos" class="nav-item">
                                    <a class="nav-link" href = "#">Productos</a>
                                </li>
                                <li id="logout" class="nav-item">
                                    <a class="nav-link" href = "#">Logout</a>
                                </li>
                                <li  class="nav-item">
                                    <a class="nav-link" href = "#"></a>
                                </li>
                                <li id="usuario" class="nav-item nav-link"><img src="/images/usuario.png" alt="usuario" height="20" width="20">&nbsp &nbsp ${loginstate.user.nombre}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        `;
        document.querySelector('#menu').innerHTML = html;
        document.querySelector("#menu #inicio").addEventListener('click', e => {
            document.location = "/views/inicio/viewBienvenida.html";
        });
        document.querySelector("#menu #clientes").addEventListener('click', e => {
            //document.location = "/views/proveedores/viewClientes.html";
        });
        document.querySelector("#menu #facturacion").addEventListener('click', e => {
            document.location = "/views/facturacion/viewFacturacion.html";
        });
        document.querySelector("#menu #productos").addEventListener('click', e => {
           document.location = "/views/productos/viewProductos.html";
        });
        document.querySelector("#menu #logout").addEventListener('click', logout);
        document.getElementById("usuario").addEventListener('click', e => {
            document.location = "/views/proveedor/viewDatosProveedor.html";
        });
        render_piePagina();

    } else if(loginstate.logged && loginstate.user.rol == "PRO" && loginstate.user.estado != 'A'){
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
                                <li id="logout" class="nav-item">
                                    <a class="nav-link" href = "#">Logout</a>
                                </li>
                                <li  class="nav-item">
                                    <a class="nav-link" href = "#"></a>
                                </li>
                                <li id="usuario" class="nav-item nav-link"><img src="/images/usuario.png" alt="usuario" height="20" width="20">&nbsp &nbsp ${loginstate.user.nombre}</li>
                            </ul>
                        </div>
                    </div>                 
                </div>
            </nav>
        `;
        document.querySelector('#menu').innerHTML = html;
        document.querySelector("#menu #logout").addEventListener('click', logout);
        document.getElementById("usuario").addEventListener('click', e => {
            document.location = "/views/proveedor/viewDatosProveedor.html";
        });
        render_piePagina();
    } else {
        loginstate.logged = false;
        html = `
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <a class="navbar-brand" href="/">
                        <img src="/images/log.png" alt="LogoEmpresa" height="40">
                        <strong>Facturación S.A</strong>
                    </a>                    
                </div>
            </nav>
        `;
        document.querySelector('#menu').innerHTML = html;
        render_piePagina();
    }
}

function logout(event){
    event.preventDefault();
    let request = new Request(backend+'/logout', {method: 'POST'});
    (async ()=>{
        const response = await fetch(request);
        if (!response.ok) {errorMessage(response.status);return;}
        document.location="/views/inicio/inicioLogin.html";
    })();
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