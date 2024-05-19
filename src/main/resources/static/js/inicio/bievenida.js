document.addEventListener("DOMContentLoaded",loaded);

async function loaded(event) {
    localStorage.clear();
    try{ await render_menu();} catch(error){return;}
}