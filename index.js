//Recibe argumentos, los procesa y delega las acciones a pelis.js.
const { busqueda } = require("./pelis");

function buscadorPelis(argv) {
  const filtro = {};
  argv.forEach((item, indice) => {
    if (item.startsWith("--")) {
      itemSinGuiones = item.slice(2);
      filtro[itemSinGuiones] = argv[indice + 1];
    }
  });
  return filtro;
}

function main() {
  const argumentos = process.argv.slice(2);
  const argumentosParseados = buscadorPelis(argumentos);
  const resultado = busqueda(argumentosParseados);
  console.table(resultado);
}
main();
