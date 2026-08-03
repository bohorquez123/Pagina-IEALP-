// js/render-materias.js
async function cargarDocentes() {
  const respuesta = await fetch('../data/docentes.json')
  const datos = await respuesta.json()
  return datos
}
 
cargarDocentes().then((datos) => {
  console.log(datos) // Verifica en la consola que se vea el array completo
})
function obtenerGradosPorNivel(datos, nivel) {
  const grados = datos
    .filter((item) => item.nivel === nivel)
    .map((item) => item.grado)
  return [...new Set(grados)] // elimina duplicados
}
 
cargarDocentes().then((datos) => {
  const gradosPrimaria = obtenerGradosPorNivel(datos, 'primaria')
  const contenedor = document.querySelector('.dropdown-menu-primaria')
 
  gradosPrimaria.forEach((grado) => {
    const li = document.createElement('li')
    const a = document.createElement('a')
    a.href = `pages/materia.html?nivel=primaria&grado=${grado}`
    a.textContent = grado.charAt(0).toUpperCase() + grado.slice(1)
    li.appendChild(a)
    contenedor.appendChild(li)
  })
})
const parametros = new URLSearchParams(window.location.search)
const nivel = parametros.get('nivel')     // 'bachillerato'
const grado = parametros.get('grado')     // 'decimo'
const materia = parametros.get('materia') // 'fisica-teorica'

function buscarDocente(datos, nivel, grado, materia) {
  return datos.find(
    (item) => item.nivel === nivel && item.grado === grado && item.materia === materia
  )
}
 
cargarDocentes().then((datos) => {
  const docente = buscarDocente(datos, nivel, grado, materia)
  const contenedor = document.getElementById('materia-detalle')
 
  if (!docente) {
    contenedor.innerHTML = '<p>No se encontró información para esta materia.</p>'
    return
  }
 
  contenedor.innerHTML = `
    <h1>${docente.materia}</h1>
    <p class="grado-etiqueta">${docente.nivel} · ${docente.grado}</p>
    <div class="ficha-docente">
      <h2>${docente.docente}</h2>
      <p>${docente.info}</p>
    </div>
  `
})
function pintarBreadcrumbs(nivel, grado, materia) {
  const contenedor = document.getElementById('breadcrumbs')
  const capitalizar = (t) => t.charAt(0).toUpperCase() + t.slice(1)
 
  contenedor.innerHTML = `
    <a href="../index.html">Inicio</a> >
    <span>${capitalizar(nivel)}</span> >
    <span>${capitalizar(grado)}</span> >
    <span>${capitalizar(materia.replace('-', ' '))}</span>
  `
}
async function cargarActividades() {
  const respuesta = await fetch('data/actividades.json')
  return respuesta.json()
}
 
function crearTarjeta(actividad) {
  const div = document.createElement('div')
  div.className = 'tarjeta-actividad'
  div.innerHTML = `
    <img src="assets/img/${actividad.imagen}" alt="${actividad.nombre}">
    <div class="contenido">
      <h3>${actividad.nombre}</h3>
      <p>${actividad.descripcion}</p>
    </div>
  `
  return div
}
 
cargarActividades().then((actividades) => {
  const galeria = document.getElementById('galeria-actividades')
  actividades.forEach((actividad) => {
    galeria.appendChild(crearTarjeta(actividad))
  })
})
if (materia === 'educacion-fisica') {
  const seccionJuegos = document.createElement('div')
  seccionJuegos.className = 'seccion-juegos'
  seccionJuegos.innerHTML = `
    <h2>Juegos Intramurales e Intercolegiados</h2>
    <div class="juegos-grid">
      <div class="juego-card">
        <h3>Juegos Intramurales</h3>
        <p>Competencias deportivas internas entre grados de la institución.</p>
      </div>
      <div class="juego-card">
        <h3>Juegos Intercolegiados</h3>
        <p>Competencias deportivas representando al colegio frente a otras instituciones.</p>
      </div>
    </div>
  `
  document.getElementById('materia-detalle').appendChild(seccionJuegos)
}
