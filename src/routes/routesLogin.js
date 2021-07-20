const express = require("express");
const routerLogin = express.Router();
const controllers = require("../controllers/controllersLogin.js");
const passport = require('passport')

routerLogin.get("/", controllers.login )
routerLogin.post("/login", passport.authenticate('login', {failureRedirect: 'failLogin'}), controllers.checkLogin)
routerLogin.get("/failLogin", controllers.failLogin);

routerLogin.post("/register", passport.authenticate('register', {failureRedirect: 'failRegister'}), controllers.register)
routerLogin.get("/failRegister", controllers.failRegister);

routerLogin.get("/logout", controllers.logout )

routerLogin.get("/auth/facebook", passport.authenticate('facebook'));
routerLogin.get("/auth/facebook/callback", passport.authenticate('facebook', { successRedirect:'/productos', failureRedirect:'/login'}))

routerLogin.get("/info", controllers.getInfo )


module.exports = routerLogin;