var fs = require('fs')

function leer() {

    try {
 //       console.log(__dirname)
 //       console.log(__filename)

       if(!fs.existsSync('./productos.txt')){
           fs.writeFileSync('./productos.txt','[]')
       }
       
       var contenido = fs.readFileSync('./productos.txt','utf-8');
       var productos = JSON.parse(contenido)
       return productos

    } catch (error) {

       console.log('Se produjo un error al leer el archivo.' + error)
    }
      
   };
   
function escribir(items) {

    try{   
        fs.writeFileSync('./productos.txt',JSON.stringify(items)) 

    } catch{

        console.log('Se produjo un error al escribir el archivo.')
    }
}

async function guardar(producto) {

    var longitud = productos.length
    producto.id= longitud+1
    productos.push(producto)
    await escribir(productos)

    return productos
}



exports.leer = leer
exports.escribir = escribir
exports.guardar = guardar
