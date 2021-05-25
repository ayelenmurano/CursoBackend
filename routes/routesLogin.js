const express = require("express");
const routerLogin = express.Router();
const controllers = require("../controllers/controllersLogin.js");

routerLogin.get("/login", controllers.login )

routerLogin.post("/login", controllers.checkLogin )

routerLogin.post("/register", controllers.register )

routerLogin.get("/logout", controllers.logout )

function control (req, res, next) {
    if(req.session.nombre) {
        if(req.session.contador) {
            req.session.contador ++;
        } else {
            req.session.contador = 1;
        }
        next();
    } else {
        res.redirect("/login");
    }
}


module.exports = routerLogin;