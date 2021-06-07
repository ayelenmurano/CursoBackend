const { info } = require("console");
const path = require("path");
const pathPublic = "../../../public/";
const { fork } = require('child_process');


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
        res.redirect('/productos')
    },

    register: (req,res) => {
        req.session.user = req.body.username;
        req.session.password = req.body.password;
        req.session.email = req.body.email;
        console.log(req.session)
        res.redirect('/productos')
    },

    logout: (req,res) => {
        req.logout();
        res.sendFile(path.join(__dirname + pathPublic + "logout.html"));
    },

    failRegister: (req, res) => 
    { res.sendFile(path.join(__dirname + pathPublic + "register-error.html") ) },

    failLogin: (req, res) => 
    { res.sendFile(path.join(__dirname + pathPublic + "login-error.html"))},

    getInfo: (req, res) => {
        let info = {};
        info.argumentos = JSON.stringify(process.argv);
        info.sistemaOperativo = process.platform;
        info.versionNode = process.version;
        info.memoria = process.memoryUsage();
        info.path = process.argv[1];
        info.processID= process.pid;
        info.carpeta = process.cwd();

        console.log(`infooo ${info}`)
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