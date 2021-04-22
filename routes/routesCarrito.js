const express = require("express");
const routerCarrito = express.Router();
const controllers = require("../controllers/controllersCarrito");
const multer  = require('multer')

routerCarrito.get("/listar/:id", controllers.listarById )

routerCarrito.get("/agregar/:id_producto", controllers.agregarById )

routerCarrito.delete("/:id", controllers.borrar )

module.exports = routerCarrito;
