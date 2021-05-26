const fs = require('fs');
const csv = require('csvtojson')
var colors = require('colors')

let js = [];

const consult = async(path, code, year) => {
    let consulta = [];
    let country = await getData(path);
    if (country != "Fatal Error") {
        let countr = await getCountry(country, code);
        if (countr == true) {
            if (year <= 2019 && year >= 1964) {
                getSuscription(country, code, year).then((suscriptionCountry) => {
                    getValue(country, year, suscriptionCountry).then((half) => {
                        if (half > 0) {
                            let value;
                            let medi = {
                                Year: year,
                                Code: code,
                                Suscription: Number(suscriptionCountry),
                                Reference: 1
                            }
                            consulta.push(medi);
                        }
                    });
                });
            } else {
                console.log(`No existe el año ${year}`.red);
            }
        } else {
            console.log(`No existe el código de país ${code}`.red);
        }
    } else {
        console.log(`No existe ${path}`.red);
    }
    return await consulta;
}

/* const convertir_guardar = () => {
    csv().fromFile('./data/API.csv')
        .then((json) => {
            js = json;
            let js1 = JSON.stringify(js);
            fs.writeFile('./data/datos.json', js1, (err) => {
                if (err) throw new Error('No se pueden guardar los resultados', err)
            });
        });
} */

const saveData = async(path, country, year, out) => {
    /* let data = JSON.stringify(js);
    fs.writeFileSync(`./data/${out}.json`, data, (err, data) => {
        if (err) throw new Error('No se puede guardar la data', err);
    }); */
    datos(path, country, year).then((inf) => {
        if (inf.length > 0) {
            for (let i of inf) {
                if (i.Reference == 1) {
                    let data = '';
                    fs.writeFile(`${i.Code}-${i.Year}.txt`, data, (err) => {
                        if (err)
                            console.log(err);
                        else
                            console.log('Archivo guardado exitosamente');
                    })
                }
            }
        };
    });
}

const leerDatos = async(out) => {
    try {
        js = require(`../data/${out}.json`);
    } catch (error) {
        js = []
    }
}

const getData = async(file) => {
    try {
        const infs = await csv().fromFile(file);
        let data = [];
        var code = JSON.parse(fs.readFileSync('./data/country.json', 'utf8'));
        for (let inf of infs) {
            inf = Object.values(inf);
            for (let c of code) {
                if (inf[1] == c.countryCode) {
                    data.push(inf)
                }
            }
        }
        return data;
    } catch (e) {
        e = "Fatal Error"
        return e
    }
}

const getCountry = async(country, code) => {
    for (var i = 0; i < country.length; i++) {
        let value = Object.values(country[i]);
        if (value[1] == code) {
            return true;
        }
    }
}

const getSuscription = async(country, code, year) => {
    for (var i = 0; i < country.length; i++) {
        let value = Object.values(country[i]);
        if (value[1] == code) {
            suscription = value[year - 1956];
            return suscription
        }
    }
}

const getValue = async(country, year) => {
    let sum = 0;
    let prom = 0;
    for (var i = 0; i < country.length; i++) {
        let value = Object.values(country[i]);
        let number = Number(value[year - 1956]);
        if (number > 0) {
            prom++;
            sum = sum + number;
        }
    }
    if (prom > 0) {
        prom = (sum / prom).toFixed(3)
        return prom
    } else {
        return 0
    }
}

const datos = async(path, country, year) => {
    let datos = consult(path, country, year)
    var respuesta = await datos
    return respuesta;
}

const publicar = async(path, country, year) => {
    datos(path, country, year).then((inf) => {
        if (inf.length > 0) {
            console.log('                                                           ESTADÍSTICAS GENERALES'.bgBlack.inverse);
            console.log();
            for (let i of inf) {
                if (i.Reference == 1) {
                    console.log(`                                                                   Año`.bgRed);
                    console.log(`                                                                   ${i.Year}`.bgBlue);
                    console.log();
                    console.log(`                                                             Codigo de País`.bgRed);
                    console.log(`                                                                   ${i.Code}`.bgBlue);
                    console.log();
                    console.log(`                                                               Valor`.bgRed);
                    console.log(`                                                                   ${i.Suscription}`.bgBlue);
                }
            }
            console.log();
        };
    });
}

/* let est = {
    country: true,
    year: true
}
let n = "Country Name"
let i = js.filter(n => n.Data_Source === "ABW")
    /*  if (index1, index2 >= 0) {
         
     } */


const guardar = (path, code, year, out) => {
    leerDatos(out);
    consult(path, code, year).then((inf) => {
        for (let i of inf) {
            if (i.Reference == 1) {
                /* let medi = {
                    Global_Media: Number(i.Global_Media),
                    Year: year,
                    Code: code,
                    Suscription: Number(i.Suscription),
                    Value: i.Value,
                    Reference: 1
                }
                js.push(medi); */
            }
        }
        saveData(path, code, year, out);
    });
}

module.exports = {
    publicar,
    guardar
}