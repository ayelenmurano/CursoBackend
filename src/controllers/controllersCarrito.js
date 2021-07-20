const Productos = require ('../utils/productos.js')
const Mensajes = require ('../utils/mensajes.js')
const Carrito = require ('../utils/carrito.js')
const log4js = require ('../config/logger/log4jsConfig');

const loggs = log4js.getLogger('controllers');


let product = new Productos()
let carrito = new Carrito()
 
module.exports = {

    listar: (req, res) => {
        const productos = carrito.leer()
        res.render("pages/indexCarrito.ejs", {productos})
    },

    listarById: (req, res) => {
        const productos = carrito.leer()
        loggs.debug(`El id recibido es ${req.params.id}`)
        res.render("pages/indexCarrito.ejs", {productos})
    },

    agregarById: async (req, res) => {
        
       const producto = await product.buscarPorId(req.params.id)
       if(!producto){
           return res.status(400).send({Error: "No se encontro producto con dicho id"})
       }
       carrito.guardar(producto);
       const productos = carrito.leer()

       res.render("pages/indexCarrito.ejs", {productos})
    },

    borrar: async (req, res) => {

        const id = req.params.id
        const producto = await carrito.borrar(id)
        const productos = carrito.leer()
    
        res.render("pages/indexCarrito.ejs", {productos})
    }

}