import { alumnos_backend } from "../../declarations/alumnos_backend";

$("body").on("submit", "#formCarreras", async function(e){
    e.preventDefault();
    const nombre = this.nombre.value.toString();
    const idArea = parseInt(this.area.value);

    divMensajes('info', `Procesando...`);
    const areaRegistro = await alumnos_backend.crearCarrera(nombre, idArea);
    divMensajes('success', `Se agregó con éxito la carrera <b>${nombre}</b>`);
    
    $("#btnMnueListaCarreras" ).trigger( "click" );


});


$("#btnMenuCarrera").on('click', async function() {
    let div = document.getElementById('contenido');
    document.getElementById('mensajes').innerHTML = '';

    const areas = await alumnos_backend.obtieneAreas();

    let html = `
    <div class="card">
    <div class="card-header">
        Registrar carrera
    </div>
    <div class="card-body">
        <form class="form" id="formCarreras">
        <div class="mb-3">
            <label for="nombre" class="form-label">Nombre carrera</label>
            <input type="text" class="form-control" id="nombre" placeholder="Ingeniería de Software">
            <label for="area" class="form-label">Área</label>
            <select class="form-control" name="area" id="area" required>
                <option value="">--Selecciona el área--</option>`;
            areas.forEach((area, index) => { 
                html +=
                `<option value="${area[0]}">${area[1].nombre}</option>`

            });
        html += `
           </select>
        </div>
    
        <input type="submit" class="btn btn-success" value="Agregar"/>  
        </form>
    </div>
    </div>
    `;
    div.innerHTML = html;
});

$("body").on("click", ".btnEditarCarrera", async function(e){
    let id = $(this).data("id").toString();
    document.getElementById('mensajes').innerHTML = '';

    let div = document.getElementById('contenido');
    let carrera = await alumnos_backend.obtieneCarrera(id);

    const areas = await alumnos_backend.obtieneAreas();


    let html = `
    <div class="card">
    <div class="card-header">
        Registrar carrera
    </div>
    <div class="card-body">
        <form class="form" id="formEditarCarreras">
        <div class="mb-3">
            <label for="nombre" class="form-label">Nombre carrera</label>
            <input type="text" class="form-control" value="${carrera[0].nombre}" id="nombre" placeholder="Ingeniería Eléctrica">
            <label for="area" class="form-label">Área</label>
            <select class="form-control" name="area" id="area" required>
                <option value="">--Selecciona el área--</option>`;
            areas.forEach((area, index) => { 
                let activo = (area[0] == carrera[0].idArea) ? 'selected':''
                
                html +=
                `<option ${activo} value="${area[0]}">${area[1].nombre}</option>`

            });
        html += `
           </select>
           <input type="hidden" name="id" value="${id}">

        </div>
    
        <input type="submit" class="btn btn-success" value="Agregar"/>  
        </form>
    </div>
    </div>
    `;
    div.innerHTML = html;
});

$("body").on("submit", "#formEditarCarreras", async function(e){
    e.preventDefault();
    const nombre = this.nombre.value.toString();
    const idArea = parseInt(this.area.value);
    const id = this.id.value;

    divMensajes('info', `Procesando...`);

    const actualiza = await alumnos_backend.actualizarCarrera(id, nombre, idArea);
    if (actualiza)
        divMensajes('success', `Se actualizó con éxito la carrera <b>${nombre}</b>`)
    else
        divMensajes('error', `Ocurrió un error al actualizar la carrera <b>${nombre}</b>`)


    $("#btnMnueListaCarreras" ).trigger( "click" );


});

$("body").on("click", ".btnEliminarModal", async function(e){
    let id = $(this).data("id").toString();
    let nombre = $(this).data("nombre").toString();
    
    $("#btnEliminarCarrera").data("id", id);
    $("#modalBody").html(`¿Deseas eliminar <b>${nombre}</b>`);
});

$("body").on("click", "#btnEliminarCarrera", async function(e){
    let id = $(this).data("id").toString();
    
    divMensajes('info', `Procesando...`);
    
    const elimina = await alumnos_backend.eliminarCarrera(id);
    $( ".modal-backdrop" ).remove();
    if (elimina)
        divMensajes('success', `Se eliminó con éxito la carrera`)
    else
        divMensajes('error', `Ocurrió un error al eliminar la carrera`)
    
    $("#btnMnueListaCarreras" ).trigger( "click" );

});

$("#btnMnueListaCarreras").on('click', async function() {
    let div = document.getElementById('contenido');

    const carreras = await alumnos_backend.obtieneCarreras();
    const areas = await alumnos_backend.obtieneAreas();
    

    let html= `
    <div class="card">
        <div class="card-header">
            Lista de carreras
        </div>
        <div class="card-body">
        <table class="table">
            <thead>
            <tr>
                <th>ID Carrera</th>
                <th>Nombre</th>
                <th>Área</th>
                <th colspan= 2>Opciones</th>
            </tr>
            </thead>
            <tbody id="tbody">`;
    carreras.forEach((carrera, index) => {
        html +=
        `<tr>
            <td>${carrera[0]}</td>
            <td>${carrera[1].nombre}</td>
            <td>${obtieneArea(carrera[1].idArea, areas)}</td>
            <td><button class="btn btn-primary btnEditarCarrera" data-id="${carrera[0]}"">Editar</button></td>
            <td>
                <button 
                    class="btn btn-danger btnEliminarModal" 
                    data-id="${carrera[0]}" 
                    data-nombre="${carrera[1].nombre}" 
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
            <button type="button" id="btnEliminarCarrera" class="btn btn-danger">Eliminar</button>
        </div>
        </div>
    </div>
    </div>
    `;
    div.innerHTML = html;
});


window.obtieneArea = function(id, areas){
    let nombre = '';
    for (const area of areas){
        if (area[0] == id){
            nombre = area[1].nombre;
            break;
        }
    }
    return nombre;
}