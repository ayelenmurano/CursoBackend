const express = require("express");
const router = express.Router();
const functions = require("../controllers/functions");
var multer  = require('multer')

//Cargamos el archivo index en la raiz
app.get("/",function(req, res){
    res.redirect("/api/productos/")
})

router.get("/",async function(req, res){
    if(!productos) productos = await  funciones.leer();
    res.render("pages/index.ejs",{productos})
})

router.get('/listar',(req, res)=>{
    console.log('request recibido');
   // var longitud = productos.length;
   if ( JSON.stringify(productos) === '[]'){
    res.json ({error:'no hay productos cargados'})
   } else {
    res.json({items: productos})
   }   
})

router.get('/listar/:id',(req, res)=>{
    console.log('request recibido');
    var longitud = productos.length;
    var id = req.params.id;
    if ( id > longitud || id < 1){
        res.json ({error:'producto no encontrado'})
    } else {
        var producto = productos[id-1]

        res.json({items: producto})
    }
    
})
var upload = multer({ dest: 'uploads/' })

router.post('/guardar',upload.array('title','price','thumbnail'), (req,res) => {
    
    const producto = req.body;
    functions.guardar(producto)

    res.json({items: productos})
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
    var producto = productos[id-1]
    productos.splice(id-1,1)
    functions.escribir(productos)

    res.json({items: producto})
})

