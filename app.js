const { argv } = require('./config/yargs');
const { convertir_guardar, publicar, guardar, consult } = require('./controlador/funciones');

let comando = argv._[0];

switch (comando) {
    case 'mostrar':
        let publica = publicar(argv.file, argv.country, argv.year);
        console.log(publica);
        break;
    case 'guardar':
        console.log('Guardando datos...');
        let guarda = guardar(argv.file, argv.country, argv.year, argv.out);
        console.log(guarda);
        break;
    default:
        console.log('Comando no válido');
}