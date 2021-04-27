const Productos = require ('../modules/productos.js')
const Mensajes = require ('../modules/mensajes.js')
const Carrito = require ('../modules/carrito.js')
//const { restart } = require('nodemon')

console.log(Mensajes)
let product = new Productos()
let message = new Mensajes()
let carrito = new Carrito()
 
module.exports = {

    listar: (req, res) => {
        const productos = carrito.leer()
        res.render("pages/indexCarrito.ejs", {productos})
    },

    listarById: (req, res) => {
        const productos = carrito.leer()
        console.log(req.params.id)
        res.render("pages/indexCarrito.ejs", {productos})
    },

    agregarById: (req, res) => {
       console.log('hola')
       const productosEnGeneral = product.leer()
       
       const producto = productosEnGeneral.find( producto => {
           return producto.id == req.params.id 
        })

       console.log(`producto: ${producto}`)
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