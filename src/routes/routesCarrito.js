const express = require("express");
const routerCarrito = express.Router();
const controllers = require("../controllers/controllersCarrito");
const multer  = require('multer')

routerCarrito.get("/", controllers.getData )

routerCarrito.get("/listar", controllers.listar )

routerCarrito.get("/listar/:codigo", controllers.agregarByCodigo )

routerCarrito.get("/agregar", controllers.agregarByCodigo )

routerCarrito.delete("/", controllers.borrar )

routerCarrito.get("/comprar", controllers.comprar )

module.exports = routerCarrito;
