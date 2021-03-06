const file = {
    demand: true,
    alias: 'f',
    desc: ' Permite establecer el path del archivo CSV que contiene los datos a analizar'
}

const country = {
    default: true,
    default: 'ECU',
    alias: 'c',
    desc: ' Permite determinar el país a analizar a través de su código ISO 3166 ALPHA-3'
}

const year = {
    default: true,
    default: 1960,
    alias: 'y',
    desc: 'Permite especificar el año para el cual se requiere las estadísticas'
}

const argv = require("yargs")
    .command('mostrar', 'Publicará las estadísticas en una página web básica', {
        file,
        country,
        year
    })
    .command('guardar', 'Muestra la lista de tareas', {
        file,
        country,
        year
    })
    .help()
    .argv;

module.exports = {
    argv
}