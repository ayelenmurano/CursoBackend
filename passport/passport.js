const passport = require('passport');
const LocalStrategy = require ('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook');
const config = require('../config/config');
const model = require('../models/sessions.js');
const bCrypt = require('bcrypt');

passport.use('login', new LocalStrategy({
    passReqToCallback : true
    },
    function(req, username, password, done){

        //Buscamos usuario
        console.log(`El username es: ${req.body.username}`)
        model.findOne({'username':req.body.username}, function(err, user){
            if (err) {
                console.log('Error in SignUp: '+err);
                return done(err);
            }

        if( !user ) return done(null, false)

        //Validamos la contrase;a
        console.log(`User: ${user}, PAssword: ${password}`)
        if (!isValidPassword(user, password)){
            console.log('Invalid Password');
            return done(null, false)
          }
        // let credencialOk = user.username === req.body.username && user.password === req.body.password ;
        // if ( !credencialOk ) return done(null, false)

        return done(null, user);
        
    })
})
    
)

passport.use ('register', new LocalStrategy ({
    passReqToCallback : true
    },
    function(req, username, password, done){
        findOrCreateUser = function(){
            //Buscamos usuario
            let user = model.findOne({'username':username}, async function(err, user){
                if (err) {
                    console.log('Error in SignUp: '+err);
                    return done(err);
                }

            //Si ya existe
            if (user) {
                console.log(`Usuario ya existente`)
                return done (null, false, console.log('message','User already exists'))
            } else {
                //Si no existe lo creamos
                let user = {}
                user.username = username;
                user.password = createHash(password);
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
        })}
        process.nextTick(findOrCreateUser);
    })
)

passport.serializeUser(function(user, done){
    done(null, user);
})

passport.deserializeUser(function(username, done){
    let usuario = model.findOne(({'username':username.username}, function(err, user){
        if (err) {
            console.log('Error in SignUp: '+err);
            return done(err);
        }
        
        if(user) {
            return user
        }
    }))
    done(null, usuario);
})

const isValidPassword = function(user, password){
    return bCrypt.compareSync(password,user.password)
}

const createHash = function(password){
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

//*************LOGIN WITH FACEBOOK

passport.use('facebook', new FacebookStrategy({
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: '/auth/facebook/callback'
}, (accessToken, refreshToken, profile, done) => {
    console.log(profile);

    model.findOne({'idFacebook':profile.id}, async function(err, user){
        if (err) {
            console.log('Error in SignUp: '+err);
            return done(err);
        }
        console.log(`El usuario es ${user}`)
        if (!user){
            const user = {};
            user.idFacebook = profile.id;
            user.username = profile.displayName;
            console.log(`Entro es ${user}`)
            const userToSave = new model(user);
            await userToSave.save(function(err){
                if(err){
                    console.log('Error in Saving user: '+err);
                    throw err;
                }
                console.log('User Registration succesful')
                return done(null, user)
            })
        } else {
            return done(null, user)
        }

    })
}))



module.exports = passport