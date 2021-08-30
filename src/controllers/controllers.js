const Productos = require ('../utils/productos.js')
const generadorProductos = require ('../utils/generadorProductos.js')
const log4js = require ('../config/logger/log4jsConfig');
const path = require ('path');

const loggs = log4js.getLogger('controllers');

let product = new Productos()

let admin = true
 
module.exports = {

    getData: async (req, res) => {
        res.sendFile(path.join(__dirname, '../../views/pages/index.html'))
    },

    getDataJSON: async (req, res) => {
        const productos = await product.leer()
        if ( !req.query.codigo ) {
            loggs.debug(`Se obtienen los productos disponibles: ${productos}`)
            const session = req.session;
            if ( JSON.stringify(productos) === '[]'){     
                res.json ({message:'no hay productos cargados'})
               } else {
                res.status(200).json({productos, session})
               }   
        } else {
            const producto = await product.buscarPorCodigo(req.query.codigo)
            loggs.debug(`Se obtiene el producto de codigo: ${req.params.codigo}. El producto es ${producto}`)
            if ( !producto ){
                res.json ({error:'producto no encontrado'})
            } else {
                res.json({producto})
            }
        }
  
    },

    agregarProducto: async (req, res) => {

        if(admin){          
            res.status(200).sendFile(path.join(__dirname, '../../views/pages/indexAdmin.html'))
        }
        if(!admin){
            res.status(200).sendFile(path.join(__dirname, '../../views/pages/acceso_denegado.html'))
        }
        
    },

    listarById: async (req,res) => {

        const productos = await product.leer()
        const producto = await product.buscarPorId(req.params.id)
        loggs.debug(`Se obtiene el producto de id: ${req.params.id}. El producto es ${producto}`)
    
        if ( !producto ){
            res.json ({error:'producto no encontrado'})
        } else {
            res.json({producto})
        }
    },

    guardarProducto: async (req,res) => {
    
        const producto = req.body;
        const { productos, message } = await product.guardar(producto);
        loggs.debug(`Se guarda un nuevo producto: ${producto}.`)
        if ( message == undefined ) {
            res.status(200).json( { productos } )
        } else {
            res.status(200).json( { message } )  
        }
        
    },
    
    actualizar: async (req, res)=>{
        let producto = req.body;
        const response = await product.actualizar(producto);
        loggs.debug(`Se actualiza el producto indicado: ${producto}.`)
        if (response.nModified == 0) {
            res.status(200).json({message: 'El codigo no pertenece a ningún producto existente'})
        } else {
            const productos = await product.leer();
            res.status(200).json({productos})
        }    
    },
    
    borrar: async (req, res)=>{
        const response = await product.borrar(req.query.codigo)
        loggs.debug(`Se borra el producto de codigo ${req.query.codigo}.`)
        if (response.deletedCount == 0) {
            res.status(200).json({message: 'El codigo no pertenece a ningún producto existente'})
        } else {
            const productos = await product.leer();
            res.status(200).json({productos})
        }  

    }

}
    