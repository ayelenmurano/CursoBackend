const express = require("express");
const routerProduct = express.Router();
const controllers = require("../controllers/controllers.js");

const multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

routerProduct.get("/", controllers.consultar )

routerProduct.get('/listar', controllers.listar )

routerProduct.get('/vista-test', controllers.vistaTest )

routerProduct.get('/listar/:id',  controllers.listarById ) 

routerProduct.get('/agregarProductos',  controllers.agregarProducto )

routerProduct.post('/guardar', upload.array('nombre','descripcion','codigo','foto','precio','stock'), controllers.guardarProducto )

routerProduct.post('/guardarMensaje', upload.array('email','mensaje'), controllers.guardarMensaje )

routerProduct.put('/:id', controllers.actualizar )

routerProduct.delete('/:id', controllers.borrar )


module.exports = routerProduct;
