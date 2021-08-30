const Productos = require ('../utils/productos.js')
const Carrito = require ('../utils/carrito.js')
const mail = require('../utils/mails.js')
const message = require('../utils/messages.js')
const userFunctions = require ('../utils/user.js')
const log4js = require ('../config/logger/log4jsConfig');
const path = require ('path');


const loggs = log4js.getLogger('controllers');


let product = new Productos()
let carrito = new Carrito()

 
module.exports = {

    getData: async (req, res) => {
        res.sendFile(path.join(__dirname, '../../views/pages/indexCarrito.html'))
    },

    listar: async (req, res) => {
        const session = req.session;
        if ( !session) { res.redirect('/timeExpired') }        
        loggs.info(`session: ${session}`)
        const productos = await carrito.leerProductos(session.user)
        res.status(200).json({productos, session})
    },

    listarById: (req, res) => {
        
        const session = req.session;
        if ( !session ) { res.redirect('/timeExpired') } 
        const productos = carrito.leerProductos(session.user)
        loggs.debug(`El id recibido es ${req.params.codigo}`)
        res.status(200).json({productos, session})
    },

    agregarByCodigo: async (req, res) => {

       const username = req.session.user;
       if ( !username) { res.redirect('/timeExpired') } 
       const producto = await product.buscarPorCodigo(req.query.codigo)
       if(!producto){
           return res.status(400).send({Error: "No se encontro producto con dicho id"})
       }       
       const productos = await carrito.guardar(username, producto);
       res.status(200).json({productos})
    },

    borrar: async (req, res) => {
        const username = req.session.user;
        if ( !username ) { res.redirect('/timeExpired') } 
        const codigo = req.query.codigo;
        const { productos , message } = await carrito.borrar(username, codigo);
        if ( message !== '') {
            res.status(200).json({message: 'El codigo no pertenece a ningún producto existente'})
        } else {
            res.status(200).json({productos})
        }  
    },

    comprar: async (req, res) => {

        const username = req.session.passport.user;
        if ( !username ) { res.redirect('/timeExpired') } 
        const userData = await userFunctions.readByUsername(username);
        const user = {
            username: username,
            mail: userData.email
        }
        const productos = await carrito.leerProductos(username);
        let costoTotal = 0;
        productos.forEach (function(producto){
            let costoParcial = producto.precio * producto.cantidad;
            costoTotal += costoParcial;
        });
        mail.sendMailBuy(user,productos,costoTotal);
        message.sendMessage(userData.phone,productos,costoTotal);

        res.render("pages/indexCarrito.ejs", {productos, username})
    }

}