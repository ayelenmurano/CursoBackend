var fs = require('fs')

async function leer(){
    try{
        console.log(__dirname)
        console.log(__filename)
       if(!fs.existsSync('./productos.txt')){
           fs.writeFileSync('./productos.txt','[]')
       }
       var contenido = await fs.promises.readFile('./productos.txt','utf-8');
       var productos = JSON.parse(contenido)
       return productos
    } catch (error) {
       console.log('Se produjo un error al leer el archivo.' + error)
    }
      
   };
   
async function escribir(items){
    try{   
        await fs.promises.writeFile('./productos.txt',JSON.stringify(items)) 
    } catch{
        console.log('Se produjo un error al escribir el archivo.')
    }
}

exports.leer = leer
exports.escribir = escribir
