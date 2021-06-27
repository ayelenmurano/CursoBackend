const log4js = require ('../config/log4jsConfig');

const loggs = log4js.getLogger('utils');

const calculo = (param) => {
    const cantidad = param.cant || 9;

    const arrayDeNumeros = [];
    loggs.debug(`cantidad ${cantidad}`)
    for (let index = 0; index < cantidad; index++) {
        const element = Math.floor(Math.random() * 1000);
        arrayDeNumeros.push(element);
    };
    loggs.debug(`El array de numeros es ${arrayDeNumeros}`)
    const objeto = {};

    for (const i in arrayDeNumeros) {
        const number = arrayDeNumeros[i]
        if (objeto.hasOwnProperty(number)) { 
            objeto[number] = objeto[number] + 1      
        } else {
            objeto[number] = 1;
        }
    }
    loggs.debug(`El objeto es ${JSON.stringify(objeto)}`)
    return objeto
}

process.on('message', (param) => {
      let objectResult = calculo(param);
      let message = `{"objetoTotal":${objectResult}}`;
      process.send(objectResult);
    }
);
