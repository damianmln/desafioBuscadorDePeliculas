//Tiene que leer el archivo JSON y exponer funciones para interactuar con los datos.
const fs = require("fs");
const { title } = require("process");
const archivo = fs.readFileSync(__dirname + "/pelis.json");
const peliculas = JSON.parse(archivo);

//Funcion sin parametros nos muestra todas las pelis
function todasLasPelis() {
  return peliculas;
}

//Funcion --sort devuelve las peliculas
// en orden alfabetico u otra propiedad

function ordenarPelis(propiedad) {
  const resultado = peliculas.sort((a, b) => {
    const valorA = a[propiedad];
    const valorB = b[propiedad];

    if (typeof valorA === "string") {
      return valorA.localeCompare(valorB);
    }

    return valorB - valorA;
  });
  return resultado;
}

// search: esta funcion busca las peliculas segun el texto que escribamos
function search(texto) {
  const resultado = peliculas.filter((element) =>
    element.title.toLowerCase().includes(texto.toLowerCase())
  );
  if (resultado.length > 0) {
    return resultado;
  } else {
    return "sin resultado";
  }
}

// tag: Si le pasás el argumento --tag debe devolver las películas que tienen ese tag.
//Si le pasás el argumento --tag terror debe devolver las películas que tienen ese tag.

function buscarPorTag(tag) {
  let resultado = peliculas.filter((pelicula) =>
    pelicula.tags.map((tag) => tag.toLowerCase()).includes(tag.toLowerCase())
  );
  if (resultado.length === 0) {
    return "sin resultado";
  } else {
    return resultado;
  }
}

exports.busqueda = (criterio) => {
  let peliculas = todasLasPelis();
  if (criterio.sort) {
    peliculas = ordenarPelis(criterio.sort, peliculas);
  }
  if (criterio.search) {
    peliculas = search(criterio.search, peliculas);
  }
  if (criterio.tag) {
    peliculas = buscarPorTag(criterio.tag, peliculas);
  }
  return peliculas;
};
