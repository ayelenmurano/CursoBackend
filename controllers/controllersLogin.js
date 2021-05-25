const path = require("path");
const pathPublic = "../../public/";

module.exports = {

    login: (req, res) => {
        if ( req.session.user ){
            res.redirect('/productos')
        } else {
            res.sendFile(path.join(__dirname + pathPublic + "login.html"));
        }     
    },

    checkLogin: (req,res) => {
        if (!req.body.nombre || !req.body.contraseña ) {
            res.send('login failed')
        } else {
            req.session.user = req.body.nombre;
            req.session.contraseña = req.body.contraseña;
            req.session.contador =+1;
            console.log(`req session: ${JSON.stringify(req.session)}`)
            res.send(`Ok, ${req.session.contador}`)
        }
    },

    register: (req,res) => {
        req.session.user = req.body.nombre;
        req.session.contraseña = req.body.contraseña;
        req.session.email = req.body.email;
        console.log(req.session)
        res.redirect('/productos')
    },

    logout: (req,res) => {

        req.session.destroy( err => {
            if(err) return err;

            res.sendFile(path.join(__dirname + pathPublic + "logout.html"));
        })
    }
}