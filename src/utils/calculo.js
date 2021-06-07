const calculo = (param) => {
    const cantidad = param.cant || 9;

    const arrayDeNumeros = [];
    console.log(`cantidad ${cantidad}`)
    for (let index = 0; index < cantidad; index++) {
        const element = Math.floor(Math.random() * 1000);
        arrayDeNumeros.push(element);
    };
    console.log(arrayDeNumeros)
    const objeto = {};

    for (const i in arrayDeNumeros) {
        const number = arrayDeNumeros[i]
        if (objeto.hasOwnProperty(number)) { 
            objeto[number] = objeto[number] + 1      
        } else {
            objeto[number] = 1;
        }
    }
    console.log(JSON.stringify(objeto))
    return objeto
}

process.on('message', (param) => {
      let objectResult = calculo(param);
      let message = `{"objetoTotal":${objectResult}}`;
      process.send(objectResult);
    }
);
