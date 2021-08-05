const express = require("express");
const routerLogin = express.Router();
const controllers = require("../controllers/controllersLogin.js");
const passport = require('passport')
let multer = require('multer')({
    dest: 'public/uploads/'
    })

routerLogin.get("/", controllers.login )
routerLogin.post("/login", passport.authenticate('login', {failureRedirect: 'failLogin'}), controllers.checkLogin)
routerLogin.get("/failLogin", controllers.failLogin);

routerLogin.post("/register", [multer.single('photo')], passport.authenticate('register', {failureRedirect: 'failRegister'}), controllers.register)
routerLogin.get("/failRegister", controllers.failRegister);

routerLogin.get("/logout", controllers.logout )
routerLogin.get("/timeExpired", controllers.logoutTimeExpired )

routerLogin.get("/auth/facebook", passport.authenticate('facebook'));
routerLogin.get("/auth/facebook/callback", passport.authenticate('facebook', { successRedirect:'/productos', failureRedirect:'/login'}))

routerLogin.get("/info", controllers.getInfo )


module.exports = routerLogin;