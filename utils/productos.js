const fs = require('fs')
const {options} = require('../options/mariaDB')
const knex = require('knex')(options)

class Productos {

    async leer() {

        try {

           let productos = await knex.select('*').from('productos')
           console.log(JSON.parse(JSON.stringify(productos)))

           return JSON.parse(JSON.stringify(productos))
    
        } catch (error) {
    
           console.log('Se produjo un error al leer el archivo.' + error)
        }
          
    }

    async buscarPorId(id) {

        try {

           const producto = await knex('productos').where('id','=',id).select('*')
           console.log(`hola ${JSON.parse(JSON.stringify(producto[0]))}`)
           return JSON.parse(JSON.stringify(producto[0]))
    
        } catch (error) {
    
           console.log('Se produjo un error al leer el archivo--.' + error)
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

        const idMayor = await knex('productos').max('id')
        const productoAgregar = {
            id: idMayor+1,
            nombre: producto.nombre,
            precio: producto.precio,
            descripcion:producto.descripcion,
            codigo: producto.codigo,
            foto: producto.foto,
            stock: producto.stock
        }
        await knex('productos').insert(productoAgregar)
            .then(console.log('producto agregado'))
        let productos = this.leer()
    
        return productos
    
    }

    async borrar(id) {

        await knex('productos').where('id','=',id).del()
        const producto = await knex('productos').where('id','=',id).select()
    
        return producto
    }

}
//export default
module.exports = Productos

//export mas de uno
//exports.Productos = Productos