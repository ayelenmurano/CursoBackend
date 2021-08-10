
function checkAuthentication(req,res,next){
    console.log(`el req en login es ${req}`)
    if(req.isAuthenticated()){
        //req.isAuthenticated() will return true if user is logged in
        next();
    } else{
        res.redirect("/");
    }
}


module.exports = { checkAuthentication } ;