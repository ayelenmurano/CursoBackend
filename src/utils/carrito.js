const fs = require('fs')
const model = require('../models/carrito.js')

const log4js = require('../config/logger/log4jsConfig');
const loggs = log4js.getLogger('utils');


class Carrito {

    leer(username) {
        try {
            let productosCarrito = model.findOne({username: username});
            loggs.debug(`Carrito.js ${JSON.stringify(productosCarrito)}`)
            return productosCarrito;
        } catch (error) {
            loggs.error(`Se produjo un error al buscar los productos del carrito correspondiente a ${username}` + error)
        }
          
    };

    async leerProductos(username) {
        try {
            let productosCarrito = await model.find({username: username}, {productos:1, _id:0});
            let productosArray = [];
            loggs.debug(`productoscarrito en carrito.js ${productosCarrito}`)
            if ( JSON.stringify(productosCarrito) != '[]' ) {
                productosArray = productosCarrito[0].productos;
            }
            loggs.debug(`Carrito.js ${JSON.stringify(productosArray)}`)
            return productosArray;       
            
        } catch (error) {
            loggs.error(`Se produjo un error al buscar los productos del carrito correspondiente a ${username}` + error)
        }
          
    }

    escribir(items) {

        try {   
            fs.writeFileSync('carrito.txt',JSON.stringify(items))    
        } catch { 
            loggs.error('Se produjo un error al escribir el archivo.')
            }
    }

    async guardar(username, producto) {
        const productosCarrito = await this.leerProductos(username);
        loggs.debug(`productosCarrito 11111 ${JSON.stringify(productosCarrito)}`)
        if (JSON.stringify(productosCarrito) != '[]') { 
            let productDuplicated = false
            for (let i in productosCarrito) {
                if ( productosCarrito[i].nombre == producto.nombre ) {
                    productDuplicated = true
                    const cantidadProductos = productosCarrito[i].cantidad;
                    productosCarrito[i].cantidad = cantidadProductos + 1;
                    break;
                }
            }
            if ( !productDuplicated ) {
                const productoAgregar = {
                    nombre: producto.nombre,
                    precio: producto.precio,
                    descripcion: producto.descripcion,
                    codigo: producto.codigo,
                    foto: producto.foto,
                    cantidad: 1,
                    id: producto.id
                };
                productosCarrito.push(productoAgregar);
            }
            
            loggs.debug(`productosCarrito 22222: ${JSON.stringify(productosCarrito)}`);
            try {
                const productoSaveModel = await model.updateOne({username: username},{$set : { productos : productosCarrito } });
            } catch (e) {
                loggs.error('No se pudo agregar el elemento. ERROR: '+ e)
            }

            return productosCarrito;
        } else {
            const nuevoCarrito = {
                username: username,
                productos: [{
                    nombre: producto.nombre,
                    precio: producto.precio,
                    descripcion: producto.descripcion,
                    codigo: producto.codigo,
                    foto: producto.foto,
                    cantidad: 1,
                    id: producto.id
                }]
            };

            const carritoSaveModel = new model(nuevoCarrito);
            let carritoSave = await carritoSaveModel.save();
            const array = [producto]
            loggs.debug(`producto en carrito.js ${JSON.stringify(array)}, el tipo es ${typeof array }`)
            return array; 
        }
          
    
    };

    async borrar(username, id) {

        const productos = this.leerProductos(username);
        let idProducto = "";
        for (let producto in productos){ 
            if (productos[producto].id == id) {
                idProducto = producto
                break
            }
        }
        const producto = productos[idProducto]
        productos.splice(idProducto,1)
        try {
            const productoSaveModel = await model.updateOne({username: username},{$set : { productos : productos } });
        } catch (e) {
            loggs.error('No se pudo agregar el elemento. ERROR: '+ e)
        }
    
        return productos
    }

}
//export default
module.exports = Carrito

//export mas de uno
//exports.Productos = Productos