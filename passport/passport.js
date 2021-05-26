const passport = require('passport');
const LocalStrategy = require ('passport-local').Strategy;
// const model = require('../models/sessions.js');

passport.use('login', new LocalStrategy({
    passReqToCallback : true
    },
    function(req, username, password, done){

        //Buscamos usuario
        console.log(`El username es: ${req.body.username}`)
        sessions.findOne({'username':req.body.username}, function(err, user){
            if (err) {
                console.log('Error in SignUp: '+err);
                return done(err);
            }
        console.log(`El user es:`)
        console.log(user)

        if( !user ) return done(null, false)

        //Validamos la contrase;a
        let credencialOk = user.username == req.body.username && user.password == req.body.password ;
        if ( !credencialOk ) return done(null, false)
        
    })
})
    
)

passport.use ('register', new LocalStrategy ({
    passReqToCallback : true
    },
    function(req, username, password, done){
        findOrCreateUser = async function(){
            //Buscamos usuario
            let user = model.findOne({'username':username}, function(err, user){
                if (err) {
                    console.log('Error in SignUp: '+err);
                    return done(err);
                }
            })
        
            //Si ya existe
            if (user) {
                console.log(`Usuario ya existente`)
                return done (null, false, console.log('message','User already exists'))
            } else {
                //Si no existe lo creamos
                let user = {}
                user.username = username;
                user.password = password;
                user.email = req.body.email;
                user.contador = 0;
                const userToSave = new model(user);
                await userToSave.save(function(err){
                    if(err){
                        console.log('Error in Saving user: '+err);
                        throw err;
                    }
                    console.log('User Registration succesful')
                    return done(null, user)
                })      
            }           
        }
        process.nextTick(findOrCreateUser);
    })
)

passport.serializeUser(function(user, done){
    done(null, user.username);
})

passport.deserializeUser(function(username, done){
    let usuario = usuarios.find(usuario => usuario.username == username);
    done(null, usuario);
})

module.exports = passport