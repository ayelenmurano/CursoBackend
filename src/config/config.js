const ini = require('ini');
const fs = require('fs');
const path = require('path');
require('dotenv').config()

//_____________LOGGS_____________//
const log4js = require ('./logger/log4jsConfig.js');
const loggs = log4js.getLogger('config');


let configInit = undefined;
let config = {};

if ( fs.existsSync( path.join(__dirname, './parameters/config.ini' )) ) {
    configInit = ini.parse( fs.readFileSync( path.join(__dirname, './parameters/config.ini' ), 'utf-8' ) );      
} else {
    loggs.error( "[ LoadConfigINI ] - The config.ini file is not present. We can not continue" );  
}


//___________VALORES POR DEFAULT____________
let port = 8080;
let clientID= '249923326905355';
let clientSecret= '2d813974f9043c70e42c536e95e2eb47';
let cluster=false;
let userFrom = 'cosmesfulanitocoderhouse@gmail.com';
let passFrom = 'coderhouse' ;
let userTo = 'muranoayelen@gmail.com';


//___________ARMADO DE PARAMETROS DE CONFIGURACION____________
config.port = ( process.env.port || configInit.Parameters.port || port);
config.cluster = ( process.env.cluster || configInit.Parameters.cluster || cluster);
config.facebook = {
    clientID : (process.env.clientID || configInit.Facebook.clientID || clientID),
    clientSecret : (process.env.clientSecret || configInit.Facebook.clientSecret || clientSecret),
}
config.userFrom = ( process.env.userFrom || configInit.Mail.userFrom || userFrom );
config.passFrom = ( process.env.passFrom || configInit.Mail.passFrom || passFrom );
config.userTo = ( process.env.userTo || configInit.Mail.userTo || userTo );
config.sId = ( process.env.sId || configInit.Message.sId );
config.authToken = ( process.env.authToken || configInit.Message.authToken) ;
config.number = (process.env.number || configInit.Message.number) ;



module.exports = config;