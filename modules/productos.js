const fs = require('fs')

class Productos {

    leer() {

        try {

           if(!fs.existsSync('../productos.txt')){
               fs.writeFileSync('../productos.txt','[]')
           }
           
           const contenido = fs.readFileSync('productos.txt','utf-8');
           let productos = JSON.parse(contenido)
    
           return productos
    
        } catch (error) {
    
           console.log('Se produjo un error al leer el archivo.' + error)
        }
          
    }

    escribir(items) {

        try{   
            fs.writeFileSync('productos.txt',JSON.stringify(items)) 
    
        } catch{
    
            console.log('Se produjo un error al escribir el archivo.')
        }
    }

    async guardar(producto) {

        const productos = this.leer()
        var longitud = productos.length
        producto.id= longitud+1
        producto.timestamp=Date.now()
        productos.push(producto)
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