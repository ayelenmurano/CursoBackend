const Productos = require ('../utils/productos.js')
const Mensajes = require ('../utils/mensajes.js')

console.log(Mensajes)
let product = new Productos()
let message = new Mensajes()

let admin = true
 
module.exports = {
    
    consultar: async (req, res) => {
        const productos = await product.leer()
        res.render("pages/index.ejs", {productos})
    },

    agregarProducto: async (req, res) => {

        const productos = await product.leer()
        if(admin){
           
            res.status(200).render("pages/indexAdmin.ejs", {productos})
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
        console.log('request recibido')
        const producto = await product.buscarPorId(req.params.id)
    
        if ( !producto ){
            res.json ({error:'producto no encontrado'})
        } else {
            res.json({items: producto})
        }
    },

    guardarProducto: async (req,res) => {
    
        const producto = req.body;
        console.log(producto)
        const productos = await product.guardar(producto)
        res.redirect('http://localhost:8080/productos');

    },

    guardarMensaje: async (req,res) => {
        
        const datos = req.body;
        console.log(datos)
        let fecha = new Date();
        let fechaFormateada= `${fecha.getDate()}/${fecha.getMonth()+1}/${fecha.getFullYear()} ${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}`;
        datos.fecha=fechaFormateada        
        const productos = await message.guardar(datos)

        res.redirect('http://localhost:8080/productos');

    },


    actualizar: (req, res)=>{

        const productos = functions.leer()
        console.log('request recibido');
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
    