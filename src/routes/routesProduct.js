const express = require("express");
const routerProduct = express.Router();
const controllers = require("../controllers/controllers.js");

routerProduct.get('/', controllers.getData )

routerProduct.get("/listar", controllers.getDataJSON )

routerProduct.get('/vista-test', controllers.vistaTest )

routerProduct.get('/agregarProductos',  controllers.agregarProducto )

routerProduct.post('/guardar', controllers.guardarProducto )

routerProduct.put('/', controllers.actualizar )

routerProduct.delete('/', controllers.borrar )


module.exports = routerProduct;
