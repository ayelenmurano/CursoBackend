const CircularJSON = require('circular-json');


function checkAuthentication(req,res,next){
    if(req.session.user){
        //req.isAuthenticated() will return true if user is logged in
        next();
    } else{
        res.redirect('/');
    }
}


module.exports = { checkAuthentication } ;