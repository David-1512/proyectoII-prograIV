var api_login=backend+'/login';

var registro ={
    logged: false,
    proveedor : {id:"",nombre:"", password:"", tipoId:"",rol:"", estado:''}
}

document.addEventListener("DOMContentLoaded",loaded);

async function loaded(event) {
    localStorage.clear();
    try{ await menu();} catch(error){return;}
    if(loginstate.logged){
        if(loginstate.user.rol=="PRO"&& loginstate.user.estado=='D'){
            document.location="/views/proveedor/viewDatosProveedor.html";
        }else{
            document.location="/views/inicio/viewBienvenida.html";
        }

    }else{
        render_login();
    }
}

function render_login(){
    html = ` <div class="inicio-Sesion">
                <form class="login-form" name="formulario">  
                    <h4 class="text-center">Iniciar Sesion</h4>  
                    <br>            
                    <div class="form-group">
                        <label> 
                            <input placeholder="Identificacion" type="text" class="form-control" name="id" id="id" value="">
                        </label>
                    </div>
                    <div class="form-group">
                        <label> 
                            <input placeholder="Clave" type="password" class="form-control" name="password" id="password" value="">
                        </label>
                    </div>
            
                    <div class="form-group nav-link">
                        <input id="login" class="btn btn-primary" type="button" value="Iniciar Sesion">
                    </div>
            
                </form>
                <a id="registrarse" class="nav-link"> Registrarse</a>
                </div>`;

    document.querySelector('#root').innerHTML = html;
    document.getElementById("login").addEventListener("click",login);
    document.getElementById("registrarse").addEventListener("click",registrarse);
    render_registrooverlay();
    render_registroview();
}
function render_registrooverlay(){
    html = `
        <div id="registrooverlay" class="registrooverlay"></div>
    `;
    overlay=document.createElement('div');
    overlay.innerHTML=html;
    document.body.appendChild(overlay);
    document.querySelector("#registrooverlay").addEventListener("click",toggle_registroview);
}

function render_registroview(){

    html = `<div  id="registroview" class='registroview'>
                <form class="login-form" name="formulario">  
                    <h4 class="text-center">Registrarse</h4>  
                    <br>   
                    <div class="form-group">        
                        <label>Tipo de Identificacion</label>
                        <select id="tipo" name="tipo" class="form-group">
                            <option value="Persona Fisica">Persona Fisica</option>
                            <option value="Persona Juridica">Persona Juridica</option>
                        </select> 
                    </div>
                    <div class="form-group">
                        <label> 
                            <input placeholder="Identificacion" type="text" class="form-control" name="idR" id="idR" value="">
                        </label>
                    </div>
                    <div class="form-group">
                        <label> 
                            <input placeholder="Nombre" type="text" class="form-control" name="nombre" id="nombre" value="">
                        </label>
                    </div>
                    <div class="form-group">
                        <label> 
                            <input placeholder="Clave" type="password" class="form-control" name="passwordR" id="passwordR" value="">
                        </label>
                    </div>
                    <div class="form-group">
                        <label> 
                            <input placeholder="Confirme su clave" type="password" class="form-control" name="conf_clave" id="conf_clave" value="">
                        </label>
                    </div>
            
                    <div class="form-group nav-link">
                        <input id="registrarse" class="btn btn-primary" type="button" value="Registrarse">
                        <input id="cancelar" class="btn btn-primary" type="button" value="Cancelar">
                         <input id="hacienda" class="btn btn-primary" type="button" value="Hacienda">
                    </div>            
                </form>                
           </div>`;
    view=document.createElement('div');
    view.innerHTML=html;
    document.body.appendChild(view);
    document.querySelector("#registroview #registrarse").addEventListener("click",
        async () => {
            await validar_registro();
        });
    document.querySelector("#registroview #cancelar").addEventListener("click",toggle_registroview);
    document.querySelector("#registroview #hacienda").addEventListener("click", () => {
        document.location = "/views/inicio/viewHacienda.html";
    });
}

function toggle_registroview(){
    document.getElementById("registrooverlay").classList.toggle("active");
    document.getElementById("registroview").classList.toggle("active");
}

function login(){
    let user={id:document.getElementById("id").value,
        password:document.getElementById("password").value
    };
    let request = new Request(api_login, {method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(user)});
    (async ()=>{
        const response = await fetch(request);
        if (!response.ok) {errorMessage(response.status);return;}
        registro.proveedor = await response.json();
        if(registro.proveedor.rol=="PRO"&& registro.proveedor.estado=='D'){
            document.location="/views/proveedor/viewDatosProveedor.html";
        }else{
            document.location="/views/inicio/viewBienvenida.html";
        }
    })();
}

function registrarse(event) {
    event.preventDefault();
    toggle_registroview();
    document.querySelectorAll('#registroview input').forEach( (i)=> {i.classList.remove("invalid");});
    document.querySelector("#registroview #tipo").value = "";
    document.querySelector("#registroview #id").value = "";
    document.querySelector("#registroview #nombre").value = "";
    document.querySelector("#registroview #passwordR").value = "";
    document.querySelector("#registroview #conf_clave").value = "";
}

async function validar_registro(){
    if (!validarFormulario()) return;
    const requestProveedor = new Request(backend +`/hacienda/proveedor/${document.getElementById("idR").value}`, { method: 'GET', headers: {} });
    const responseProveedor = await fetch(requestProveedor);
    if (!responseProveedor.ok) {
        errorMessage(responseProveedor.status);
        return;
    }
    const responseDataProveedor = await responseProveedor.json();
    if (responseDataProveedor === false) {
        alert("Error: Este proveedor no se puede registrar ya que no se encuentra en hacienda");
        return;
    }
    else{
        let proveedor={id:document.getElementById("idR").value,
            nombre:document.getElementById("nombre").value,
            password:document.getElementById("conf_clave").value,
            tipoId:document.getElementById("tipo").value
        };
        let request = new Request(backend+'/registro', {method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(proveedor)});
        const response = await fetch(request);
        if (!response.ok) {errorMessage(response.status);return;}
        document.location="/views/inicio/inicioLogin.html";
    }
}


function validarFormulario(){
    let campos = ["tipo", "idR", "nombre", "passwordR", "conf_clave"];
    let todosCompletos = true;
    for (let i = 0; i < campos.length; i++) {
        let campo = document.getElementById(campos[i]);
        //let label = document.querySelector(`label[for=${campos[i]}]`);
        if (!campo.value) {
            campo.style.borderColor = "red";
            campo.style.borderWidth = "2px";
            //label.style.color = "red";
            //label.style.fontWeight = "bold";
            todosCompletos = false;
        } else {
            campo.style.borderColor = "";
            campo.style.borderWidth = "";

            //label.style.color = "";
            //label.style.fontWeight = "";
        }
    }
    let password = document.getElementById("passwordR");
    let conf_clave = document.getElementById("conf_clave");
    if (password.value !== conf_clave.value) {
        password.style.borderColor = "red";
        password.style.borderWidth = "2px";
        conf_clave.style.borderColor = "red";
        conf_clave.style.borderWidth = "2px";
        todosCompletos = false;
        alert("Las contraseña y la confirmación de la contraseña no coinciden.");
        return false;
    }
    if (!todosCompletos) {
        alert("Por favor complete todos los campos correctamente.");
        return false;
    }
    return true;
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
