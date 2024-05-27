
document.addEventListener("DOMContentLoaded",loaded);

async function loaded(event){
    try{ await menu();} catch(error){return;}//Cambiar a menu

    html = ` <div class="container-home">
        <div>
            <h1>Bienvenido(a) <span id = "nombre"></span></h1>            
            <div id="estado-mensaje" style="color: red; font-size: 1.2em;"></div>
        </div> 
    </div>`;

    document.querySelector('#root').innerHTML = html;
    document.querySelector("#nombre").innerHTML = loginstate.user.nombre; //Agregar nombre de usuario

    let estadoMensaje = "";
    if (loginstate.user.estado === 'E') {
        estadoMensaje = "Su solicitud se encuentra en espera de que sea aceptada por un administrador";
        document.querySelector("#estado-mensaje").innerHTML = estadoMensaje;
    } else if (loginstate.user.estado === 'I') {
        estadoMensaje = "Su usuario ha sido inactivado por un administrador";
        document.querySelector("#estado-mensaje").innerHTML = estadoMensaje;
    }

}