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
        if (!req.body.username || !req.body.password ) {
            res.send('login failed')
        } else {
            req.session.user = req.body.username;
            req.session.password = req.body.password;
            req.session.contador =+1;
            console.log(`req session: ${JSON.stringify(req.session)}`)
            res.send(`Ok, ${req.session.contador}`)
        }
    },

    register: (req,res) => {
        req.session.user = req.body.username;
        req.session.password = req.body.password;
        req.session.email = req.body.email;
        console.log(req.session)
        res.redirect('/productos')
    },

    logout: (req,res) => {

        req.session.destroy( err => {
            if(err) return err;

            res.sendFile(path.join(__dirname + pathPublic + "logout.html"));
        })
    },

    failRegister: (req, res) => 
    { res.sendFile(path.join(__dirname + pathPublic + "register-error.html") ) },

    failLogin: (req, res) => 
    { res.sendFile(path.join(__dirname + pathPublic + "login-error.html"))}

}