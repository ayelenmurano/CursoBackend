const CircularJSON = require('circular-json');


function checkAuthentication(req,res,next){
    console.log(`el req en login es ${CircularJSON.stringify(req)}`)
    if(req.session.user){
        //req.isAuthenticated() will return true if user is logged in
        next();
    } else{
        res.redirect('/');
    }
}


module.exports = { checkAuthentication } ;