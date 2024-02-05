import { alumnos_backend } from "../../declarations/alumnos_backend";

$("body").on("submit", "#formAreas", async function(e){
    e.preventDefault();
    const nombre = this.nombre.value.toString();

    divMensajes('info', `Procesando...`);
    const areaRegistro = await alumnos_backend.crearArea(nombre);
    divMensajes('success', `Se agregó con éxito el área <b>${nombre}</b>`);
    
    $("#btnMnueListaArea" ).trigger( "click" );


});


$("#btnMenuArea").on('click', function() {
    let div = document.getElementById('contenido');
    document.getElementById('mensajes').innerHTML = '';

    div.innerHTML = `
    <div class="card">
    <div class="card-header">
        Registrar área
    </div>
    <div class="card-body">
        <form class="form" id="formAreas">
        <div class="mb-3">
            <label for="nombre" class="form-label">Nombre área</label>
            <input type="text" class="form-control" id="nombre" placeholder="Ingeniería Eléctrica">
        </div>
    
        <input type="submit" class="btn btn-success" value="Agregar"/>  
        </form>
    </div>
    </div>
    `;
});

$("body").on("click", ".btnEditarArea", async function(e){
    let id = $(this).data("id").toString();
    document.getElementById('mensajes').innerHTML = '';

    let div = document.getElementById('contenido');
    let area = await alumnos_backend.obtieneArea(id);

    div.innerHTML = `
    <div class="card">
    <div class="card-header">
        Actualizar área
    </div>
    <div class="card-body">
        <form class="form" id="formEditarAreas">
        <div class="mb-3">
            <label for="nombre" class="form-label">Nombre área</label>
            <input type="text" value="${area[0].nombre}" class="form-control" id="nombre" placeholder="Ingeniería Eléctrica">
            <input type="hidden" name="id" value="${id}">
        </div>
    
        <input type="submit" class="btn btn-success" id="btnEditaArea" value="Guardar"/>  
        </form>
    </div>
    </div>
    `;
});

$("body").on("submit", "#formEditarAreas", async function(e){
    e.preventDefault();
    const nombre = this.nombre.value.toString();
    const id = this.id.value.toString();

    divMensajes('info', `Procesando...`);

    const actualiza = await alumnos_backend.actualizarArea(id, nombre);
    if (actualiza)
        divMensajes('success', `Se actualizó con éxito el área <b>${nombre}</b>`)
    else
        divMensajes('error', `Ocurrió un error al actualizar el área <b>${nombre}</b>`)


    $("#btnMnueListaArea" ).trigger( "click" );


});

$("body").on("click", ".btnEliminarModal", async function(e){
    let id = $(this).data("id").toString();
    let nombre = $(this).data("nombre").toString();
    
    $("#btnEliminarArea").data("id", id);
    $("#modalBody").html(`¿Deseas eliminar <b>${nombre}</b>`);
});

$("body").on("click", "#btnEliminarArea", async function(e){
    let id = $(this).data("id").toString();
    
    divMensajes('info', `Procesando...`);
    
    const elimina = await alumnos_backend.eliminarArea(id);
    $( ".modal-backdrop" ).remove();
    if (elimina)
        divMensajes('success', `Se eliminó con éxito el área`)
    else
        divMensajes('error', `Ocurrió un error al eliminar el área`)
    
    $("#btnMnueListaArea" ).trigger( "click" );

});

$("#btnMnueListaArea").on('click', async function() {
    let div = document.getElementById('contenido');

    const areas = await alumnos_backend.obtieneAreas();

    let html= `
    <div class="card">
        <div class="card-header">
        Lista de áreas
        </div>
        <div class="card-body">
        <table class="table">
            <thead>
            <tr>
                <th>ID área</th>
                <th>Nombre</th>
                <th colspan= 2>Opciones</th>
            </tr>
            </thead>
            <tbody id="tbody">`;
    areas.forEach((area, index) => {
        html +=
        `<tr>
            <td>${area[0]}</td>
            <td>${area[1].nombre}</td>
            <td><button class="btn btn-primary btnEditarArea" data-id="${area[0]}"">Editar</button></td>
            <td>
                <button 
                    class="btn btn-danger btnEliminarModal" 
                    data-id="${area[0]}" 
                    data-nombre="${area[1].nombre}" 
                    data-bs-toggle="modal" 
                    data-bs-target="#eliminarModal">
                    Eliminar
                </button>
            </td>
        </tr>`;
    });
    html +=      `
            </tbody>
        </table>
        </div>
        
    </div>


    <!-- Modal -->
    <div class="modal fade" id="eliminarModal" tabindex="-1" aria-labelledby="eliminarModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
            <h1 class="modal-title fs-5" id="eliminarModalLabel">Confirmación</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
        </div>
        <div class="modal-body" id="modalBody"></div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" id="btnEliminarArea" class="btn btn-danger">Eliminar</button>
        </div>
        </div>
    </div>
    </div>
    `;
    div.innerHTML = html;
});


window.divMensajes = function(tipo, mensaje){
    let divMensajes = document.getElementById('mensajes');
    divMensajes.innerHTML = `
        <div class="alert alert-${tipo} alert-dismissible" role="alert">
            ${mensaje}   
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
        </div>
    `;
}
