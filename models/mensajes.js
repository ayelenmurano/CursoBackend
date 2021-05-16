const mongoose= require('mongoose');

const mensajesCollection = 'mensajes';

const MensajesSchema = new mongoose.Schema({
    email: {type: String, require: true},
    fecha: {type: Date, require: true},
    mensaje: {type: String, require: true, max:200}
});

const mensajes = mongoose.model(mensajesCollection, MensajesSchema);

module.exports = mensajes