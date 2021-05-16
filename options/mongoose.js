const mongoose = require('mongoose');

async function CRUD() {
    try {
        //---------Conexion base de datos
        const URL = 'mongodb://admin:root@localhost:27017/ecommerce';
        let rta = await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Base de Datos conectada')
    } catch (e) {
        console.log(`Error: ${e}`)
    }
}

module.exports = {CRUD}