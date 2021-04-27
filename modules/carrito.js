const fs = require('fs')

class Productos {

    leer() {

        try {

           if(!fs.existsSync('../carrito.txt')){
               fs.writeFileSync('../carrito.txt','[]')
           }
           
           const contenido = fs.readFileSync('carrito.txt','utf-8');
           let productos = JSON.parse(contenido)
    
           return productos
    
        } catch (error) {
    
           console.log('Se produjo un error al leer el archivo.' + error)
        }
          
    }

    escribir(items) {

        try {   
            fs.writeFileSync('carrito.txt',JSON.stringify(items))    
        } catch { 
            console.log('Se produjo un error al escribir el archivo.')
            }
    }

    async guardar(producto) {

        const productos = this.leer()
        const longitud = productos.length
        const productoAgregar = {
            id: longitud+1,
            nombre: producto.nombre,
            precio: producto.precio,
            descripcion:producto.descripcion,
            codigo: producto.codigo,
            foto: producto.foto,
            stock: producto.stock,
            timestamp: Date.now()
        }
        
        productos.push(productoAgregar)
        await this.escribir(productos)
    
        return productos
    
    }

    async borrar(id) {

        const productos = this.leer()
        var producto = productos[id-1]
        productos.splice(id-1,1)
        await this.escribir(productos)
    
        return producto
    }

}
//export default
module.exports = Productos

//export mas de uno
//exports.Productos = Productos