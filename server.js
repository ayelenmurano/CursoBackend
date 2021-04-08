
var express = require('express')


//Iniciamos express
var app = express()

//Le pasamos a http la constante app
const http = require('http').Server(app)

//Le pasamos al constante http a socket.io
const io = require('socket.io')(http)

//Indicamos que queremos cargar los archivos estaticos que se encuentran en dicha carpeta
app.use(express.static("public"))

app.set("view engine", "ejs")

app.set("views", "./views")



app.use(express.urlencoded({ extended: false }))

var router = express.Router()

app.use(express.json())

const server = http.listen(8080, () =>{
    console.log(`Escuchando en el puerto ${server.address().port}`)
})

server.on("error", (error) => console.log(`Se produjo un error: ${error}`))


//-------FUNCIONES-------

const funciones = require ('./controllers/functions.js')

let productos;

app.use('/api/productos',router)


//-------RENDERIZADOS-------



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
    
    //io.sockets.emit('nuevoProducto',productos)
    //Enviamos un evento al cliente
    //socket.emit ('mi mensaje', 'ESte es un mensaje del servidor')

    socket.on('nuevoProducto',async (producto)=> {
        var longitud = productos.length;
        console.log(longitud)
        producto.id= longitud+1
        productos.push(producto)
        await funciones.escribir(productos);
        
        

        io.sockets.emit('nuevoProducto',productos)
        

    })
    //Nos suscribimos a un evento enviada desde el cliente

})


