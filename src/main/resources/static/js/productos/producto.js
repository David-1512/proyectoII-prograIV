document.addEventListener("DOMContentLoaded",loaded);
async function loaded(event) {
    loadProveedorClientes();

    try {
        await render_menu();
    } catch (error) {
        return;
    }
}