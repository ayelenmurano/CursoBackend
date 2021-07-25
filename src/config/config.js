const ini = require('ini');
const fs = require('fs');
const path = require('path');

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


//___________ARMADO DE PARAMETROS DE CONFIGURACION____________
config.port = ( process.env.PORT || configInit.Parameters.port || port);
config.cluster = ( configInit.Parameters.cluster || cluster);
config.facebook = {
    clientID : (configInit.Facebook.clientID || clientID),
    clientSecret : (configInit.Facebook.clientSecret || clientSecret),
}


module.exports = config;