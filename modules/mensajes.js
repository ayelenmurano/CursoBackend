const fs = require('fs')

class Mensajes {

    async guardar(datos) {

        try {
            const mensajes = this.leer()
            mensajes.push(datos)
            await this.escribir(mensajes)
        } catch (error) {
            console.log(`No se encontró el archivo, error: ${error}`);
        }
   
    }
       
    escribir(items) {
    
        try{   
            fs.writeFileSync('chat.txt',JSON.stringify(items)) 
    
        } catch{
    
            console.log('Se produjo un error al escribir el archivo.')
        }
    }

    leer() {

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
          
       }
}
module.exports = Mensajes
