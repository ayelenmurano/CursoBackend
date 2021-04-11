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
const { router } = require('./routes/productos.js');
app.use('/productos', router)

//-------FUNCIONES-------
const funciones = require ('./controllers/functions.js')


// router.post('/vista', function(req,res){
//     console.log(req.body);
//     const {titulo, precio, thumbnail} = req.body;
//     const producto = {titulo, precio, thumbnail};
//     var longitud = productos.length;
//     producto.id= longitud+1;
//     productos.push(producto);
//     escribir(productos);

//     res.render("pages/index.ejs",{productos})   
// })


//------Socket.io------
io.on('connection', socket => {

    //"connection" se ejecuta la primera vez que se abre una nueva conexion
    console.log('Usuario conectado')
    
    socket.on('client-message', (producto) =>
    {
        io.emit('server-message', (producto));
    });

    socket.on('client-chat-message', async (datos) => 
    {
        await funciones.guardarMensaje(datos);
        io.emit('server-chat-message', (datos));
    });

    //Nos suscribimos a un evento enviada desde el cliente

})





const server = http.listen(8080, () =>{
    console.log(`Escuchando en el puerto ${server.address().port}`)
})

server.on("error", (error) => console.log(`Se produjo un error: ${error}`))