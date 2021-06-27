const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const log4js = require ('../config/log4jsConfig');

const loggs = log4js.getLogger('baseDeDatos');

//---------Conexion base de datos
const URL = 'mongodb://admin:root@localhost:27017/ecommerce';

try{
    mongoose.connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    loggs.info('Base de Datos conectada')
    } catch (e) {
        loggs.error(`Error: ${e}`)
}

module.exports = mongoose.connection;