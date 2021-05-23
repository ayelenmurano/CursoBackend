const fs = require('fs')
const {options} = require('../options/mariaDB')
const knex = require('knex')(options)
const model = require('../models/productos.js');

class Productos {

    async leer() {

        try {

           let productos = await knex.select('*').from('productos')
           console.log(JSON.parse(JSON.stringify(productos)))
           //let productos = model.find({})

           return productos;
    
        } catch (error) {
    
           console.log('Se produjo un error al leer el archivo.' + error)
        }
          
    }

    async buscarPorId(id) {

        try {

           const producto = await knex('productos').where('id','=',id).select('*')
           console.log(`hola ${JSON.stringify(producto[0])}`)
           return producto[0]
        //    const producto = model.findOne({ _id: id })
        //    return (producto)
    
        } catch (error) {
    
           console.log('Se produjo un error al leer el archivo--.' + error)
        }
          
    }

    escribir(items) {

        try{   
            //fs.writeFileSync('productos.txt',JSON.stringify(items)) 
            const productos = model(items).save()
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
        };
        // const productoSaveModel = new model(productoAgregar);
        // let productoSave = await productoSaveModel.save()

        
        await knex('productos').insert(productoAgregar)
            .then(console.log('producto agregado'))
        let productos = this.leer()
    
        return productos
    
    }

    async borrar(id) {

        await knex('productos').where('id','=',id).del()
        const producto = await knex('productos').where('id','=',id).select()
    
        // let producto = model.deleteOne({_id:id})
        return producto
    }

}
//export default
module.exports = Productos

//export mas de uno
//exports.Productos = Productos