const mongoose= require('mongoose');

const productosCollection = 'productos';

const ProductosSchema = new mongoose.Schema({
    nombre: {type: String, require: true},
    precio: {type: Number, require: true},
    descripcion: {type: String, require: true},
    codigo: {type: String, require: true},
    foto: {type: String, require: true},
    stock: {type: String, require: true}
});

const productos = mongoose.model(productosCollection, ProductosSchema);

module.exports = productos