const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


//---------Conexion base de datos
const URL = 'mongodb://admin:root@localhost:27017/ecommerce';

try{
    mongoose.connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    console.log('Base de Datos conectada')
    } catch (e) {
        console.log(`Error: ${e}`)
}

module.exports = mongoose.connection;