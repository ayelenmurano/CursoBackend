const mongoose = require('mongoose');

const carritoCollection = 'carritos';

const CarritoSchema = new mongoose.Schema({
    username: {type: String, require: true},
    productos: {type: Array, default: [], require: true}
});

const carrito = mongoose.model(carritoCollection, CarritoSchema);

module.exports = carrito;