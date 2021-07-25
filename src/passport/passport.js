const passport = require('passport');
const LocalStrategy = require ('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const config = require('../config/config.js');
const model = require('../models/sessions.js');
const bCrypt = require('bcrypt');
const log4js = require ('../config/logger/log4jsConfig');

const loggs = log4js.getLogger('passport');


passport.use('login', new LocalStrategy({
    passReqToCallback : true
    },
    function(req, username, password, done){

        //Buscamos usuario
        loggs.debug(`El username es: ${req.body.username}`)
        model.findOne({'username':req.body.username}, function(err, user){
            if (err) {
                loggs.error('Error in SignUp: '+err);
                return done(err);
            }

        if( !user ) return done(null, false)

        //Validamos la contrase;a
        loggs.debug(`User: ${user}, Password: ${password}`)
        if (!isValidPassword(user, password)){
            loggs.error('Invalid Password');
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
                    loggs.error('Error in SignUp: '+err);
                    return done(err);
                }

            //Si ya existe
            if (user) {
                loggs.error(`Usuario ya existente`)
                return done (null, false, loggs.error('message','User already exists'))
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
                        loggs.error('Error in Saving user: '+err);
                        throw err;
                    }
                    loggs.info('User Registration succesful')
                    return done(null, user)
                })      
            }           
        })}
        process.nextTick(findOrCreateUser);
    })
)

//_____________LOGIN WITH FACEBOOK_____________//
passport.use('facebook', new FacebookStrategy({
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: '/auth/facebook/callback'
}, (accessToken, refreshToken, profile, done) => {


    model.findOne({'password':profile.id}, async function(err, user){
        if (err) {
            loggs.error('Error in SignUp: '+err);
            return done(err);
        }

        if (!user){
            let user = {};
            user.password = profile.id;
            user.username = profile.displayName;
            const userToSave = new model(user);
            await userToSave.save(function(err){
                if(err){
                    loggs.error('Error in Saving user: '+err);
                    throw err;
                }
                loggs.info('User Registration succesful')
                return done(null, user)
            })
        } else {
            return done(null, user)
        }

    })
}))


//***************
passport.serializeUser(function(user, done){
    done(null, user);
})

passport.deserializeUser(function(username, done){
    let usuario = model.findOne(({'username':username.username}, function(err, user){
        if (err) {
            loggs.error('Error in SignUp: '+err);
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

module.exports = passport