const express = require("express");
const routerCarrito = express.Router();
const controllers = require("../controllers/controllersCarrito");
const multer  = require('multer')

routerCarrito.get("/listar", controllers.listar )

routerCarrito.get("/listar/:id", controllers.listarById )

routerCarrito.get("/agregar/:id", controllers.agregarById )

routerCarrito.get("/borrar/:id", controllers.borrar )

module.exports = routerCarrito;
