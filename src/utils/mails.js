const nodemailer = require("nodemailer");
const config = require('../config/config.js');
const log4js = require('../config/logger/log4jsConfig');
const loggs = log4js.getLogger('utils');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.userFrom,
        pass: config.passFrom,
    }
});

const mailOptions = (info) => ({
    from: config.userFrom,
    to: config.userTo,
    subject: 'Nuevo registro',
    html: `<b> DATOS DE REGISTRO: </b>
    <li> Usuario: ${info.user} </li>
    <li> Contraseña: ${info.password} </li>
    <li> Email: ${info.email} </li>
    <li> Email: ${info.phone} </li> `,
    // attachments: [{
    //     path: ''
    // }]
});

const mailOptionsBuy = (user, productos, costoTotal) => {
    loggs.info(`LOGIN.JS ${JSON.stringify(user)}`)
    let html = `<b> DATOS DE LA COMPRA: </b>
    <table class="table" border='1'>
        <thead>
            <tr>
                <td>Nombre</td>
                <td>Descripción</td>
                <td>Código</td>
                <td>Foto</td>
                <td>Precio</td>
                <td>Cantidad</td>
            </tr>
        </thead>
        <tbody>
        `;
    productos.forEach(function(producto){ 
        html += `<tr>
        <td> ${producto.nombre} </td>
        <td> ${producto.descripcion} </td>
        <td> ${producto.codigo} </td>
        <td> <img src=${producto.foto} width="50" height="50"> </td>
        <td> ${producto.precio} </td>
        <td> ${producto.cantidad} </td>
    </tr>`
    });
    html += `</tbody>
    </table>
    <b> COSTO TOTAL: ${costoTotal} </b>`;

    const options = {
        from: config.userFrom,
        to: user.mail,
        subject: `Nuevo pedido de ${user.username}`,
        html: html
    }
    // attachments: [{
    //     path: ''
    // }]

    return options
};

const sendMail = (info) => {
    const options = mailOptions(info);
    transporter.sendMail(options, (err, response) => {
        if(err) {
            loggs.error("Error en el envio de mail: ", err);
        }
    
        return response;
    })
}

const sendMailBuy = (user, productos, costoTotal) => {
    const options = mailOptionsBuy(user, productos, costoTotal);
    transporter.sendMail(options, (err, response) => {
        if(err) {
            loggs.error("Error en el envio de mail: ", err);
        }
    
        return response;
    })
}

        
module.exports = { sendMail, sendMailBuy };
