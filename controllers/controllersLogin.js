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