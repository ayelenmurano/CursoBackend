const { info } = require("console");
const path = require("path");
const pathPublic = "../../../public/";
const pathRoot = "../../../";
const { fork } = require('child_process');
const fs = require('fs');
const mail = require('../utils/mails.js')

const log4js = require ('../config/logger/log4jsConfig');
const loggs = log4js.getLogger('controllers');


module.exports = {

    login: (req, res) => {
        if ( req.session.user ){
            res.redirect('/productos')
        } else {
            res.sendFile(path.join(__dirname + pathPublic + "login.html"));
        }     
    },

    checkLogin: (req,res) => {
        req.session.user = req.body.username;
        req.session.email = req.body.email;
        req.login(req.user, (err) => {
            if (err) { return next(err); }
            res.redirect('/productos');
          })
    },

    register: (req,res) => {
        req.session.user = req.body.username;
        req.session.password = req.body.password;
        req.session.email = req.body.email;
        req.session.phone = req.body.phone;
        const info = {
            user : req.body.username ,
            password : req.session.password,
            email : req.session.email,
            phone : req.session.phone,
            address : req.body.address,
            age : req.body.age,
            photo : req.body.photo
        }
        mail.sendMail(info);
        loggs.debug(`La sesion es ${req.session}`)
        res.redirect('/productos')
    },

    logout: (req,res) => {
        req.logout();
        res.sendFile(path.join(__dirname + pathPublic + "logout.html"));
    },

    logoutTimeExpired: (req,res) => {
        res.sendFile(path.join(__dirname + pathPublic + "logout-timeExpired.html"));
    },


    failRegister: (req, res) => 
    { res.sendFile(path.join(__dirname + pathPublic + "register-error.html") ) },

    failLogin: (req, res) => 
    { res.sendFile(path.join(__dirname + pathPublic + "login-error.html"))},

    getInfoArtillery: (req, res) => {
        if(fs.existsSync('./result_fork.txt')){
            res.sendFile(path.join(__dirname + pathRoot + 'result_fork.txt'));
        } else {
            res.status(200).json({message: "Debe correr el siguiente comando para generar el archivo: artillery quick --count 50 -n 40 http://localhost:8080/random?cant=14 > result_fork.txt "})
        }
    },

    getInfo: (req, res) => {
        let info = {};
        info.argumentos = JSON.stringify(process.argv);
        info.sistemaOperativo = process.platform;
        info.versionNode = process.version;
        info.memoria = process.memoryUsage();
        info.path = process.argv[1];
        info.processID= process.pid;
        info.carpeta = process.cwd();

        loggs.debug(`La info formada es ${info}`)
        res.render("pages/info.ejs", {info})
    },

    getNumber: (req, res) => {
        const computo = fork('./src/utils/calculo.js');
        computo.send(req.query);

        computo.on('message', objeto => {
            res.end(`El objeto random es ${JSON.stringify(objeto)}`)
        })
    }

}