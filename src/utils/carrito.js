const fs = require('fs')
const model = require('../models/carrito.js')
const CircularJSON = require('circular-json');

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
            if ( JSON.stringify(productosCarrito) != '[]' ) {
                productosArray = productosCarrito[0].productos;
            }
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
        if (JSON.stringify(productosCarrito) != '[]') { 
            let productDuplicated = false
            for (let i in productosCarrito) {
                if ( productosCarrito[i].nombre == producto.nombre ) {
                    productDuplicated = true
                    const cantidadProductos = productosCarrito[i].cantidad;
                    productosCarrito[i].cantidad = cantidadProductos + 1;
                    loggs.debug(`Se agrega una unidad del producto al carrito ya existente.`)
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
                loggs.debug(`Se agrega el producto al carrito ya existente: ${productoAgregar}`)
            }
            
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
            loggs.debug(`Se crea un nuevo carrito: ${nuevoCarrito}`)
            const carritoSaveModel = new model(nuevoCarrito);
            let carritoSave = await carritoSaveModel.save();

            return nuevoCarrito.productos; 
        }
          
    
    };

    async borrar(username, codigo) {

        const productos = await this.leerProductos(username);
        let positionProducto = "";
        let message = "";
        for (let producto in productos){ 
            if (productos[producto].codigo == codigo) {
                positionProducto = producto
                break
            }
            message = 'El carrito no contiene dicho producto';
        }
        if ( productos[positionProducto].cantidad != 1 ) {
            productos[positionProducto].cantidad -= 1 ;
            loggs.debug(`El carrito contiene mas de un producto de este tipo. Se elimina una unidad.`)
        } else { 
            productos.splice(positionProducto,1) 
            loggs.debug(`Se elimina el producto del carrito.`)
        }
  
        try {
            if (productos.length === 0) {
                const productoSaveModel = await model.deleteOne({username: username});
                loggs.debug(`El carrito esta vacio. Se elimina.`)
            } else {
                    const productoSaveModel = await model.updateOne({username: username},{$set : { productos : productos } });
            }
        } catch (e) {
            loggs.error('No se pudo borrar el elemento. ERROR: '+ e)
        }   
        
        return { productos , message }
    };


    async borrarCarrito(username) {
        try {
                const productoSaveModel = await model.deleteOne({username: username});
        } catch (e) {
            loggs.error('No se pudo borrar el carrito. ERROR: '+ e)
        }   
        return ''
    }

}

module.exports = Carrito