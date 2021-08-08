const express = require("express");
const passport = require ('../passport/passport.js');
const routerProduct = express.Router();
const controllers = require("../controllers/controllers.js");

const multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

// const authenticationMiddleware = (whiteList =[]) => (req, res, next) => {
//     if(whiteList.includes(req.baseUrl)) {
//       next();
//     }

//     if (req.isAuthenticated()) {
//       return next()
//     }
//     res.redirect('/');
// }

// routerProduct.get("/", authenticationMiddleware([]), controllers.getData )
routerProduct.get("/", controllers.getData )

routerProduct.get("/listar2", controllers.getDataJSON )

routerProduct.get('/listar', controllers.listar )

routerProduct.get('/vista-test', controllers.vistaTest )

routerProduct.get('/listar/:id',  controllers.listarById )

routerProduct.get('/agregarProductos',  controllers.agregarProducto )

routerProduct.post('/guardar', upload.array('nombre','descripcion','codigo','foto','precio','stock'), controllers.guardarProducto )

routerProduct.post('/guardarMensaje', upload.array('email','mensaje'), controllers.guardarMensaje )

routerProduct.put('/:id', controllers.actualizar )

routerProduct.delete('/:id', controllers.borrar )


module.exports = routerProduct;
