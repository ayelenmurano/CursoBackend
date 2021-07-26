const Productos = require ('../utils/productos.js')
const Mensajes = require ('../utils/mensajes.js')
const generadorProductos = require ('../utils/generadorProductos.js')
const log4js = require ('../config/logger/log4jsConfig');

const loggs = log4js.getLogger('controllers');

let product = new Productos()
let message = new Mensajes()

let admin = true
 
module.exports = {

    vistaTest: (req, res) => {
        let cantidad = 10
        if (req.query.cant !== undefined) {
            cantidad = req.query.cant
        }
        const productos = generadorProductos(cantidad)
        res.render("pages/index.ejs", {productos})
    },
    
    consultar: async (req, res) => {
        const productos = await product.leer()
        const session = req.session;
        res.render("pages/index.ejs", {productos, session})
    },

    agregarProducto: async (req, res) => {

        const productos = await product.leer();
        const username = req.query.username;
        if(admin){
           
            res.status(200).render("pages/indexAdmin.ejs", {productos, username})
        }
        if(!admin){
            res.status(200).render('pages/acceso_denegado.ejs',{productos})
        }
        
    },

    listar: async (req,res) => {

        const productos = await product.leer()
        if ( JSON.stringify(productos) === '[]'){     
            res.json ({error:'no hay productos cargados'})
           } else {
            res.json({items: productos})
           }   
    },

    listarById: async (req,res) => {

        const productos = await product.leer()
        loggs.debug('request recibido')
        const producto = await product.buscarPorId(req.params.id)
    
        if ( !producto ){
            res.json ({error:'producto no encontrado'})
        } else {
            res.json({items: producto})
        }
    },

    guardarProducto: async (req,res) => {
    
        const producto = req.body;
        const productos = await product.guardar(producto)
        res.redirect('http://localhost:8080/productos');

    },

    guardarMensaje: async (req,res) => {
        
        const datos = req.body;
        loggs.debug(`Los datos recibidos son ${datos}`)
        let fecha = new Date();
        let fechaFormateada= `${fecha.getDate()}/${fecha.getMonth()+1}/${fecha.getFullYear()} ${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}`;
        datos.fecha=fechaFormateada        
        const productos = await message.guardar(datos)

        res.redirect('http://localhost:8080/productos');

    },


    actualizar: (req, res)=>{

        const productos = functions.leer()
        loggs.debug('request recibido');
        var longitud = productos.length;
        var id = req.params.id;
        var actualizar = req.body
    
        if ( id > longitud || id < 1){
            res.json ({error:'producto no encontrado'})
    
        } else {
    
        productos[id-1] = actualizar
        var producto = productos[id-1]
        product.escribir(productos)
    
        res.json({items: producto})
        }
    },

    borrar: async (req, res)=>{

        const producto = await product.borrar(req.params.id)
    
        res.json({items: producto})
    }


}
    