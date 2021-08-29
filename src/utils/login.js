const CircularJSON = require('circular-json');


function checkAuthentication(req,res,next){
    if(req.session.user){
        console.log(`EStoy chequeando autenticacion ${CircularJSON.stringify(req)}`)
        //req.isAuthenticated() will return true if user is logged in
        next();
    } else{
        console.log(`111111111${CircularJSON.stringify(req)}`)
        res.redirect('/');
    }
}


module.exports = { checkAuthentication } ;