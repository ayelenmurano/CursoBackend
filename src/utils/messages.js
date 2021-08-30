const config = require('../config/config.js');

const log4js = require('../config/logger/log4jsConfig');
const loggs = log4js.getLogger('utils');


const client = require('twilio')(config.sId, config.authToken);
loggs.info(`el config.sId es ${config.sId}.el config.authToken es ${config.authToken}`);

const sendMessage = (phone,productos,costoTotal) => {
    if ( phone != '^(+54)') { phone = `+54${phone}` }
    let body = `Su pedido se encuentra en proceso.
    DATOS DE LA COMPRA: `;
    productos.forEach(function(producto){ 
        body += `
        Nombre : ${producto.nombre}
        Descripción: ${producto.descripcion}
        Código: ${producto.codigo}
        Precio: ${producto.precio}
        Cantidad: ${producto.cantidad}
    `
    });
    body += `COSTO TOTAL: ${costoTotal}`;
    loggs.info(`el body es ${body}`);
    client.messages.create({
        body: body,
        from: config.number,
        to: phone
    }).then( message => {
        loggs.info(`La cuenta id es ${message.accountSid}`);
    }).catch( (err) => {
        loggs.error("error: ", err);
    })

    loggs.info(`Mensaje enviado`)

    return ''
}

module.exports = { sendMessage }
