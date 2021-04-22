const express = require('express');

//Iniciamos express
const app = express();

//Le pasamos a http la constante app
const http = require('http').createServer(app);

//Le pasamos al constante http a socket.io
const io = require('socket.io')(http);



//Indicamos que queremos cargar los archivos estaticos que se encuentran en dicha carpeta
app.use(express.static("public"))
app.set("view engine", "ejs")
app.set("views", "./views")
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//------RUTAS--------
const routerProduct = require('./routes/routesProduct');
app.use('/productos', routerProduct)

const routerCarrito = require('./routes/routesCarrito');
app.use('/carrito', routerCarrito)


//-------FUNCIONES-------
const mensajes = require ('./modules/mensajes.js')


//------Socket.io------
io.on('connection', function(socket:any)  {

    //"connection" se ejecuta la primera vez que se abre una nueva conexion
    console.log('Usuario conectado')
    
    socket.on('client-message', (producto: any) =>
    {
        io.emit('server-message', (producto));
    });

    socket.on('client-chat-message', (mensaje: any) => 
    {        
        io.emit('server-chat-message', (mensaje));
    });

    //Nos suscribimos a un evento enviada desde el cliente

})





const server = http.listen(8080, () =>{
    console.log(`Escuchando en el puerto ${server.address().port}`)
})

server.on("error", (error: any) => console.log(`Se produjo un error: ${error}`))