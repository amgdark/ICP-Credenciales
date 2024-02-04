import { alumnos_backend } from "../../declarations/alumnos_backend";

// async function registraArea(){
//   form = document.getElementById("form");
//   const nombre = form.nombre.value.toString();
//   const areaRegistro = await alumnos_backend.crearArea(nombre);
//   alert(`Se ha sido registrado existosamente!! `);

// }

// function obtieneAreas(){
//   // const areas = await alumnos_backend.obtieneAreas();
//   areas = {}
//   console.log(areas);
// }



  // $("body").on("click", "#btnAgregaArea", async function(e){
    // document.querySelector("#form").addEventListener("submit", async (e) => {
$("body").on("submit", "#form", async function(e){
  e.preventDefault();
  const nombre = this.nombre.value.toString();

  const areaRegistro = await alumnos_backend.crearArea(nombre);

  alert(`Se ha sido registrado existosamente!! `);


});


$("#btnMenuArea").on('click', function() {
  let div = document.getElementById('contenido');

    div.innerHTML = `
    <div class="card">
      <div class="card-header">
        Registrar área
      </div>
      <div class="card-body">
        <form class="form" id="form">
          <div class="mb-3">
            <label for="nombre" class="form-label">Nombre área</label>
            <input type="text" class="form-control" id="nombre" placeholder="Ingeniería Eléctrica">
          </div>
      
          <input type="submit" class="btn btn-success" id="btnAgregaArea" value="Agregar"/>  
        </form>
      </div>
    </div>
    `;
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
      <td><button class="btn btn-primary" id="area-${area[0]}">Editar</button></td>
      <td><button class="btn btn-danger" id="area-${area[0]}">Eliminar</button></td>
    </tr>`;
  });
  html +=      `
        </tbody>
      </table>
    </div>
    
  </div>
  `;
  div.innerHTML = html;
});

