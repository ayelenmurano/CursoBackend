const express = require("express");
const router = express.Router();
const functions = require("../controllers/functions");
var multer  = require('multer')

router.get("/", function(req, res){

    const productos = functions.leer()
    const mensajes = functions.obtenerMensajes()
    res.render("pages/index.ejs", {productos, mensajes})
})

router.get('/listar',(req, res)=>{

    console.log('request recibido')
   // var longitud = productos.length

   if ( JSON.stringify(productos) === '[]'){     
    res.json ({error:'no hay productos cargados'})
   } else {
    res.json({items: productos})
   }   
})

router.get('/listar/:id',(req, res)=>{

    console.log('request recibido')
    var longitud = productos.length
    var id = req.params.id;

    if ( id > longitud || id < 1){
        res.json ({error:'producto no encontrado'})
    } else {
        const productos = functions.leer()
        var producto = productos[id-1]

        res.json({items: producto})
    }
    
})
var upload = multer({ dest: 'uploads/' })

router.post('/guardar',upload.array('title','price','thumbnail'), async (req,res) => {
    
    const producto = req.body;
    const productos = await functions.guardar(producto)
    res.redirect('http://localhost:8080/productos');

})

router.post('/guardar',upload.array('email','fecha','mensaje'), async (req,res) => {
    
    const datos = req.body;
    const mensajes = await functions.guardarMensaje(datos)
    res.redirect('http://localhost:8080/productos');

})

router.put('/:id',(req, res)=>{

    console.log('request recibido');
    var longitud = productos.length;
    var id = req.params.id;
    var actualizar = req.body

    if ( id > longitud || id < 1){
        res.json ({error:'producto no encontrado'})

    } else {

    productos[id-1] = actualizar
    var producto = productos[id-1]
    functions.escribir(productos)

    res.json({items: producto})
    }
})

router.delete('/:id',(req,res)=>{

    var id = req.params.id
    const producto = functions.borrar(id)

    res.json({items: producto})
})

exports.router = router;
