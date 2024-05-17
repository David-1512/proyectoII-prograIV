document.addEventListener("DOMContentLoaded",loaded);

async function loaded(event) {
    try{ await render_menu();} catch(error){return;}
}