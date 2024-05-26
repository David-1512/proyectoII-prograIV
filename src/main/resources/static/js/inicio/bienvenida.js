
document.addEventListener("DOMContentLoaded",loaded);

async function loaded(event){
    try{ await menu();} catch(error){return;}//Cambiar a menu

    html = ` <div class="container-home">
        <div>
            <h1>Bienvenido(a) <span id = "nombre"></span></h1>
        </div> 
    </div>`;

    document.querySelector('#root').innerHTML = html;
    document.querySelector("#nombre").innerHTML = loginstate.user.nombre; //Agregar nombre de usuario
}