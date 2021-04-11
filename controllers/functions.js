var fs = require('fs')

function leer() {

    try {
 //       console.log(__dirname)
 //       console.log(__filename)

       if(!fs.existsSync('../productos.txt')){
           fs.writeFileSync('../productos.txt','[]')
       }
       
       const contenido = fs.readFileSync('productos.txt','utf-8');
       let productos = JSON.parse(contenido)

       return productos

    } catch (error) {

       console.log('Se produjo un error al leer el archivo.' + error)
    }
      
   };
   
function escribir(items) {

    try{   
        fs.writeFileSync('productos.txt',JSON.stringify(items)) 

    } catch{

        console.log('Se produjo un error al escribir el archivo.')
    }
}

async function guardar(producto) {

    const productos = leer()
    var longitud = productos.length
    producto.id= longitud+1
    productos.push(producto)
    await escribir(productos)

    return productos

}

async function guardarMensaje(datos) {

    try {
        const mensajes = obtenerMensajes()
        mensajes.push(datos)
        await escribirMensajes(mensajes)
    } catch (error) {
        console.log(`No se encontró el archivo, error: ${error}`);
    }

}

   
function escribirMensajes(items) {

    try{   
        fs.writeFileSync('chat.txt',JSON.stringify(items)) 

    } catch{

        console.log('Se produjo un error al escribir el archivo.')
    }
}

async function borrar(id) {

    const productos = leer()
    var producto = productos[id-1]
    productos.splice(id-1,1)
    await escribir(productos)

    return producto
}

function obtenerMensajes() {

    try {
       if(!fs.existsSync('../chat.txt')){
           fs.writeFileSync('../chat.txt','')
       }
       
       const contenidoMensajes = fs.readFileSync('chat.txt','utf-8');
       let mensajes = JSON.parse(contenidoMensajes)
       return mensajes

    } catch (error) {

       console.log('Se produjo un error al leer el archivo.' + error)
    }
      
   };


exports.leer = leer
exports.escribir = escribir
exports.guardar = guardar
exports.borrar = borrar
exports.guardarMensaje = guardarMensaje
exports.obtenerMensajes = obtenerMensajes
exports.escribirMensajes = escribirMensajes
