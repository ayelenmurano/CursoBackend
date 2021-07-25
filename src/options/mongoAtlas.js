const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const log4js = require ('../config/logger/log4jsConfig');

const loggs = log4js.getLogger('baseDeDatos');

//---------Conexion base de datos
const URL = `mongodb+srv://ayelenmurano:ayelenmurano@cluster0.s0im9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

try{
    mongoose.connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    loggs.info('Base de Datos conectada!!')
    } catch (e) {
        loggs.error(`Error: ${e}`)
}

module.exports = mongoose.connection;