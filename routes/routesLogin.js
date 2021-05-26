const express = require("express");
const routerLogin = express.Router();
const controllers = require("../controllers/controllersLogin.js");
const passport = require('passport')

routerLogin.get("/login", controllers.login )
routerLogin.post("/login", passport.authenticate('login', {failureRedirect: 'failLogin'}), controllers.checkLogin )
routerLogin.get("/failLogin", controllers.failLogin);

routerLogin.post("/register", passport.authenticate('register', {failureRedirect: 'failRegister'}), controllers.register )
routerLogin.get("/failRegister", controllers.failRegister);

routerLogin.get("/logout", controllers.logout )


// function control (req, res, next) {
//     if(req.session.nombre) {
//         if(req.session.contador) {
//             req.session.contador ++;
//         } else {
//             req.session.contador = 1;
//         }
//         next();
//     } else {
//         res.redirect("/login");
//     }
// }


module.exports = routerLogin;