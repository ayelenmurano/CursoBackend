//const {options} = require('../config/DB/mariaDB')
//const knex = require('knex')(options)
const model = require('../models/productos.js');
const CircularJSON = require('circular-json');

const log4js = require('../config/logger/log4jsConfig');
const loggs = log4js.getLogger('utils');

class Productos {

    async leer() {

        try {
        //    let productos = await knex.select('*').from('productos')
        //    console.log(JSON.parse(JSON.stringify(productos)))
           let productos = model.find({})
           loggs.debug(`productos.js ${productos}`)
           return productos;   
        } catch (error) {   
           loggs.error('Se produjo un error al leer el archivo.' + error)
        }
          
    }

    async buscarPorId(id) {

        try {
        //    const producto = await knex('productos').where('id','=',id).select('*')
        //    console.log(`hola ${JSON.parse(JSON.stringify(producto[0]))}`)
           const producto = model.findOne({ _id: id })
           return (producto)   
        } catch (error) {   
            loggs.error('Se produjo un error al leer el archivo--.' + error)
        }
          
    }

    async buscarPorCodigo(codigo) {

        try {
        //    const producto = await knex('productos').where('id','=',id).select('*')
        //    console.log(`hola ${JSON.parse(JSON.stringify(producto[0]))}`)
           const producto = model.findOne({ codigo: codigo })
           return (producto)   
        } catch (error) {   
            loggs.error('Se produjo un error al leer el archivo--.' + error)
        }
          
    }

    escribir(items) {

        try{   
            //fs.writeFileSync('productos.txt',JSON.stringify(items)) 
            const productos = model(items).save()
        } catch {
    
            loggs.error('Se produjo un error al escribir el archivo.')
        }
    }

    async guardar(producto) {

        let originalProducts = await this.leer();
        let message = '';
        for (let elem in originalProducts){ 
            if (originalProducts[elem].codigo == producto.codigo) {
                message = `El codigo ${producto.codigo} no está disponible`;
                break
            }           
        }
        if ( message == '' ) {
            //const idMayor = await knex('productos').max('id')
            const productoAgregar = { 
            //    id: idMayor+1,
                nombre: producto.nombre,
                precio: producto.precio,
                descripcion:producto.descripcion,
                codigo: producto.codigo,
                foto: producto.foto,
                stock: producto.stock
            };
            const productoSaveModel = new model(productoAgregar);
            let productoSave = await productoSaveModel.save()      
            // await knex('productos').insert(productoAgregar)
            //     .then(console.log('producto agregado'))
            let productos = await this.leer()

            return { productos }
        } else { 

            return { message }
        }
        
    
        
    
    }

    async borrar(codigo) {
        // await knex('productos').where('id','=',id).del()
        // const producto = await knex('productos').where('id','=',id).select()    
        let response = await model.deleteOne({'codigo':codigo})
        loggs.info(`La respuesta al borrado es ${response}, el codigo ${codigo}`)
        return response
    }

    async actualizar(producto) {
        // await knex('productos').where('id','=',id).del()
        // const producto = await knex('productos').where('id','=',id).select()    
        let response = await model.replaceOne({'codigo':producto.codigo},producto)
        return response
    }

}
//export default
module.exports = Productos

//export mas de uno
//exports.Productos = Productos