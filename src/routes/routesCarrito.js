const express = require("express");
const routerCarrito = express.Router();
const controllers = require("../controllers/controllersCarrito");
const multer  = require('multer')
const passport = require('passport')

routerCarrito.get("/", controllers.getData )

routerCarrito.get("/listar", controllers.listar )

routerCarrito.get("/listar/:id", controllers.listarById )

routerCarrito.get("/agregar", controllers.agregarById )

routerCarrito.get("/borrar", controllers.borrar )

routerCarrito.get("/comprar", controllers.comprar )

module.exports = routerCarrito;
