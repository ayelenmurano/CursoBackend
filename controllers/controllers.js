const Productos = require ('../modules/productos.js')
const Mensajes = require ('../modules/mensajes.js')

console.log(Mensajes)
let product = new Productos()
let message = new Mensajes()

let admin = true
 
module.exports = {
    
    consultar: (req, res) => {
        const productos = product.leer()
        res.render("pages/index.ejs", {productos})
    },

    agregarProducto: (req, res) => {

        const productos = product.leer()
        if(admin){
           
            res.status(200).render("pages/indexAdmin.ejs", {productos})
        }
        if(!admin){
            res.status(200).render('pages/acceso_denegado.ejs',{productos})
        }
        
    },

    listar: (req,res) => {

        const productos = product.leer()
        if ( JSON.stringify(productos) === '[]'){     
            res.json ({error:'no hay productos cargados'})
           } else {
            res.json({items: productos})
           }   
    },

    listarById: (req,res) => {

        const productos = product.leer()
        console.log('request recibido')
        var longitud = productos.length
        var id = req.params.id;
    
        if ( id > longitud || id < 1){
            res.json ({error:'producto no encontrado'})
        } else {
            const productos = product.leer()
            var producto = productos[id-1]
    
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

        var id = req.params.id
        const producto = await product.borrar(id)
    
        res.json({items: producto})
    }


}
    