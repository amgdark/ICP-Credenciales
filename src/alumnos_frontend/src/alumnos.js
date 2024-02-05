import { alumnos_backend } from "../../declarations/alumnos_backend";

$("body").on("submit", "#formAlumnos", async function(e){
    e.preventDefault();
    const curp = this.curp.value.toString();
    const matricula = this.matricula.value.toString();
    const nombre = this.nombre.value.toString();
    const primerAp = this.primerAp.value.toString();
    const segundoAp = this.segundoAp.value.toString();
    const fechaNacimiento = this.fechaNacimiento.value.toString();
    const sexo = this.sexo.value.toString();
    const carrera = parseInt(this.carrera.value);
    const semestre = parseInt(this.semestre.value);
    // const image = ['2'];

    divMensajes('info', `Procesando...`);
    // const areaRegistro = await alumnos_backend.crearAlumno(nombre,primerAp,segundoAp,matricula,fechaNacimiento,curp,carrera,semestre,sexo,image);
    const areaRegistro = await alumnos_backend.crearAlumno(nombre,primerAp,segundoAp,matricula,fechaNacimiento,curp,carrera,semestre,sexo);
    divMensajes('success', `Se agregó con éxito el alumno <b>${nombre}</b>`);
    
    $("#btnMnueListaAlumnos" ).trigger( "click" );


});


window.semestres = [
    {"id":"1", "sem": "Primer"},
    {"id":"2", "sem": "Segundo"},
    {"id":"3", "sem": "Tercer"},
    {"id":"4", "sem": "Cuarto"},
    {"id":"5", "sem": "Quinto"},
    {"id":"6", "sem": "Sexto"},
    {"id":"7", "sem": "Séptimo"},
    {"id":"8", "sem": "Octavo"},
    {"id":"9", "sem": "Noveno"},
    {"id":"10", "sem": "Décimo"}
];

window.sexo = [
    {"id":"1", "sexo": "Hombre"},
    {"id":"2", "sexo": "Mujer"},
    {"id":"3", "sexo": "No definido"},
    {"id":"4", "sexo": "No identificado"},
]

$("#btnMenuAlumno").on('click', async function() {
    let div = document.getElementById('contenido');
    document.getElementById('mensajes').innerHTML = '';

    const carreras = await alumnos_backend.obtieneCarreras();

    let html = `
    <div class="card">
    <div class="card-header">
        Registrar alumno
    </div>
    <div class="card-body">
        <form class="form" id="formAlumnos">
        <div class="row">
            <div class="input-group">
                <div class="col p-2">
                    <label for="curp" class="form-label">CURP</label>
                    <input type="text" class="form-control" id="curp" placeholder="curp">
                </div>
                <div class="col p-2">
                    <label for="matricula" class="form-label">Matrícula</label>
                    <input type="text" class="form-control" id="matricula" placeholder="00000000">
                </div>
            </div>
            <div class="input-group">
                <div class="col p-2">
                    <label for="nombre" class="form-label">Nombre alumno</label>
                    <input type="text" class="form-control" id="nombre" placeholder="Juan">
                </div>
            </div>

            <div class="input-group">
                <div class="col p-2">
                    <label for="primerAp" class="form-label">Apellido paterno</label>
                    <input type="text" class="form-control" id="primerAp" placeholder="Pérez">
                </div>
            </div>

            <div class="input-group">
                <div class="col p-2">
                    <label for="segundoAp" class="form-label">Apellido materno</label>
                    <input type="text" class="form-control" id="segundoAp" placeholder="López">
                </div>
            </div>

            <div class="input-group">
                <div class="col p-2">
                    <label for="fechaNacimiento" class="form-label">Fecha de nacimiento</label>
                    <input type="date" class="form-control" id="fechaNacimiento" placeholder="dd/mm/yyyy">
                </div>
                <div class="col p-2">
                    <label for="sexo" class="form-label">Sexo</label>
                    <select class="form-control" name="sexo" id="sexo" required>
                        <option value="">--Selecciona el sexo-</option> `;
                        sexo.forEach((sexo, index) => { 
                            html += `<option value="${sexo.id}">${sexo.sexo}</option>`
                        }); 
                        html +=
                    `</select>
                </div>
            </div>
            <div class="input-group">
                <div class="col p-2">
                    <label for="carrera" class="form-label">Área</label>
                    <select class="form-control" name="carrera" id="carrera" required>
                        <option value="">--Selecciona la carrera--</option>`;
                    carreras.forEach((carrera, index) => { 
                        html += `<option value="${carrera[0]}">${carrera[1].nombre}</option>`
                    });
                    html +=
                    `</select>
                </div>
                <div class="col p-2">     
                    <label for="semestre" class="form-label">Semestre</label>
                    <select class="form-control" name="semestre" id="semestre" required>
                        <option value="">--Selecciona el semestre-</option> `;
                    semestres.forEach((sem, index) => { 
                        html += `<option value="${sem.id}">${sem.sem}</option>`
                    }); 
                    html +=
                    `</select>
                </div>
            </div>
            <div class="input-group">
                <div class="col p-2">
                    <label for="image" class="form-label">Imagen</label>
                    <input type="file" class="form-control" id="image" placeholder="dd/mm/yyyy"> 
                </div>
            </div>
        <div class="input-group">
            <div class="col p-2">
                <input type="submit" class="btn btn-success" value="Agregar"/>  
        </form>
    </div>
    </div>
    `;
    div.innerHTML = html;
});

$("body").on("click", ".btnEditarAlumno", async function(e){
    let id = $(this).data("id").toString();
    document.getElementById('mensajes').innerHTML = '';

    let div = document.getElementById('contenido');
    let alumno = await alumnos_backend.obtieneAlumno(id);

    const carreras = await alumnos_backend.obtieneCarreras();


    let html = `
    <div class="card">
    <div class="card-header">
        Actualizar alumno
    </div>
    <div class="card-body">
        <form class="form" id="formAlumnos">
        <div class="row">
            <div class="input-group">
                <div class="col p-2">
                    <label for="curp" class="form-label">CURP</label>
                    <input type="text" class="form-control" value="${alumno[0].curp}" id="curp" placeholder="curp">
                </div>
                <div class="col p-2">
                    <label for="matricula" class="form-label">Matrícula</label>
                    <input type="text" value="${alumno[0].matricula}" class="form-control" id="matricula" placeholder="00000000">
                </div>
            </div>
            <div class="input-group">
                <div class="col p-2">
                    <label for="nombre" class="form-label">Nombre alumno</label>
                    <input type="text" value="${alumno[0].nombre}" class="form-control" id="nombre" placeholder="Juan">
                </div>
            </div>

            <div class="input-group">
                <div class="col p-2">
                    <label for="primerAp" class="form-label">Apellido paterno</label>
                    <input type="text" value="${alumno[0].primerAp}" class="form-control" id="primerAp" placeholder="Pérez">
                </div>
            </div>

            <div class="input-group">
                <div class="col p-2">
                    <label for="segundoAp" class="form-label">Apellido materno</label>
                    <input type="text" value="${alumno[0].segundoAp}" class="form-control" id="segundoAp" placeholder="López">
                </div>
            </div>

            <div class="input-group">
                <div class="col p-2">
                    <label for="fechaNacimiento" class="form-label">Fecha de nacimiento</label>
                    <input type="date" value="${alumno[0].fechaNacimiento}" class="form-control" id="fechaNacimiento" placeholder="dd/mm/yyyy">
                </div>
                <div class="col p-2">
                    <label for="sexo" class="form-label">Sexo</label>
                    <select class="form-control" name="sexo" id="sexo" required>
                        <option value="">--Selecciona el sexo-</option>  `;
                        sexo.forEach((sexo, index) => { 
                            let activo = (alumno[0].sexo == sexo.id) ? 'selected':''
                            html += `<option ${activo} value="${sexo.id}">${sexo.sexo}</option>`
                        }); 
                        html +=
                    `</select>
                </div>
            </div>
            <div class="input-group">
                <div class="col p-2">
                    <label for="carrera" class="form-label">Área</label>
                    <select class="form-control" name="carrera" id="carrera" required>
                        <option value="">--Selecciona la carrera--</option>`;
                        carreras.forEach((carrera, index) => { 
                            html += `<option value="${carrera[0]}">${carrera[1].nombre}</option>`
                        });
                        html +=
                    `</select>
                </div>
                <div class="col p-2">     
                    <label for="semestre" class="form-label">Semestre</label>
                    <select class="form-control" name="semestre" id="semestre" required>
                        <option value="">--Selecciona el semestre-</option> `;
                        semestres.forEach((sem, index) => { 
                            let activo = (alumno[0].semestre == sem.id) ? 'selected':''
                            html += `<option ${activo} value="${sem.id}">${sem.sem}</option>`
                        }); 
                        html +=
                    `</select>
                </div>
            </div>
            <div class="input-group">
                <div class="col p-2">
                    <label for="image" class="form-label">Imagen</label>
                    <input type="file" class="form-control" id="image" placeholder="dd/mm/yyyy"> 
                </div>
            </div>
        <div class="input-group">
            <div class="col p-2">
                <input type="submit" class="btn btn-success" value="Agregar"/>  
        </form>
    </div>
    </div>
    `;
    div.innerHTML = html;
});

$("body").on("submit", "#formEditarAlumnos", async function(e){
    e.preventDefault();
    const nombre = this.nombre.value.toString();
    const idArea = parseInt(this.area.value);
    const id = this.id.value;

    divMensajes('info', `Procesando...`);

    const actualiza = await alumnos_backend.actualizaralumno(id, nombre, idArea);
    if (actualiza)
        divMensajes('success', `Se actualizó con éxito la alumno <b>${nombre}</b>`)
    else
        divMensajes('error', `Ocurrió un error al actualizar la alumno <b>${nombre}</b>`)


    $("#btnMnueListaalumnos" ).trigger( "click" );


});

$("body").on("click", ".btnEliminarModal", async function(e){
    let id = $(this).data("id").toString();
    let nombre = $(this).data("nombre").toString();
    
    $("#btnEliminarAlumno").data("id", id);
    $("#modalBody").html(`¿Deseas eliminar <b>${nombre}</b>`);
});

$("body").on("click", "#btnEliminarAlumno", async function(e){
    let id = $(this).data("id").toString();
    
    divMensajes('info', `Procesando...`);
    
    const elimina = await alumnos_backend.eliminarAlumno(id);
    $( ".modal-backdrop" ).remove();
    console.log(elimina);
    if (elimina)
        divMensajes('success', `Se eliminó con éxito el alumno`)
    else
        divMensajes('error', `Ocurrió un error al eliminar el alumno`)
    
    $("#btnMnueListaAlumnos" ).trigger( "click" );

});

$("#btnMnueListaAlumnos").on('click', async function() {
    let div = document.getElementById('contenido');

    const alumnos = await alumnos_backend.obtieneAlumnos();
    const carreras = await alumnos_backend.obtieneCarreras();
    

    let html= `
    <div class="card">
        <div class="card-header">
            Lista de alumnos
        </div>
        <div class="card-body">
        <table class="table">
            <thead>
            <tr>
                <th>ID alumno</th>
                <th>CURP</th>
                <th>Matriícula</th>
                <th>Nombre</th>
                <th>Apellido paterno</th>
                <th>Apellido materno</th>
                <th colspan= 2>Opciones</th>
            </tr>
            </thead>
            <tbody id="tbody">`;
    alumnos.forEach((alumno, index) => {
        html +=
        `<tr>
            <td>${alumno[0]}</td>
            <td>${alumno[1].curp}</td>
            <td>${alumno[1].matricula}</td>
            <td>${alumno[1].nombre}</td>
            <td>${alumno[1].primerAp}</td>
            <td>${alumno[1].segundoAp}</td>
            
            <td><button class="btn btn-primary btnEditarAlumno" data-id="${alumno[0]}"">Editar</button></td>
            <td>
                <button 
                    class="btn btn-danger btnEliminarModal" 
                    data-id="${alumno[0]}" 
                    data-nombre="${alumno[1].nombre}" 
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
            <button type="button" id="btnEliminarAlumno" class="btn btn-danger">Eliminar</button>
        </div>
        </div>
    </div>
    </div>
    `;
    div.innerHTML = html;
});


window.obtieneCarrera = function(id, carreras){
    let nombre = '';
    for (const carrera of carreras){
        if (carrera[0] == id){
            nombre = carrera[1].nombre;
            break;
        }
    }
    return nombre;
}

window.seleccionaSexo = function(sexo){
    let nombre = '';
    for (const carrera of carreras){
        if (carrera[0] == id){
            nombre = carrera[1].nombre;
            break;
        }
    }
    return nombre;
}