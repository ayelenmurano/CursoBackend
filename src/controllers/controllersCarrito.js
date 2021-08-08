const Productos = require ('../utils/productos.js')
const Mensajes = require ('../utils/mensajes.js')
const Carrito = require ('../utils/carrito.js')
const mail = require('../utils/mails.js')
const message = require('../utils/messages.js')
const userFunctions = require ('../utils/user.js')
const log4js = require ('../config/logger/log4jsConfig');
const CircularJSON = require('circular-json');
const path = require ('path');

const loggs = log4js.getLogger('controllers');


let product = new Productos()
let carrito = new Carrito()

 
module.exports = {

    getData: async (req, res) => {
        res.sendFile(path.join(__dirname, '../../views/pages/indexCarrito.html'))
    },

    listar: async (req, res) => {
        // if ( !req.query.username ) { res.redirect('/timeExpired') }
        // const username = req.query.username;
        // loggs.info(`username: ${username}`)
        // if ( !req.session.user || req.session.user == 'undefined') { 
        //     console.log(`pruebaaa`)
        //     res.redirect('/timeExpired') }
        const username = req.session.user;
        const session = req.session;
        loggs.info(`username: ${username}`)
        loggs.info(`session: ${CircularJSON.stringify(session)}`)
        const productosCarrito = await carrito.leerProductos(username)
        res.status(200).json({productos: productosCarrito, session})
    },

    listarById: (req, res) => {
        if ( !req.query.username ) { res.redirect('/timeExpired') }
        const username = req.query.username;
        const productos = carrito.leerProductos(username)
        loggs.debug(`El id recibido es ${req.params.id}`)
        res.render("pages/indexCarrito.ejs", {productos, username})
    },

    agregarById: async (req, res) => {      
    //    if ( !req.query.username ) { res.redirect('/timeExpired') }
        if ( !req.session.user ) { res.redirect('/timeExpired') }
        const producto = await product.buscarPorId(req.query.id)
        if(!producto){
            return res.status(400).send({Error: "No se encontro producto con dicho id"})
        }
        console.log(`111 ${JSON.stringify(producto)}`)
        const username = req.session.user;
        const session = req.session;
        console.log(`2222 ${username}`)
        const productos = await carrito.guardar(username, producto);
        loggs.debug(`productosss controllerCarrito ${productos}`)
        res.status(200).json({productos, session})
        // res.render("pages/indexCarrito.ejs", {productos, username})
    },

    borrar: async (req, res) => {
        if ( !req.query.username ) { res.redirect('/timeExpired') }
        const id = req.query.id;
        const username = req.query.username;
        const productos = await carrito.borrar(username, id);
    
        res.render("pages/indexCarrito.ejs", {productos, username})
    },

    comprar: async (req, res) => {
        if ( !req.query.username ) { res.redirect('/timeExpired') };
        const username = req.query.username;
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