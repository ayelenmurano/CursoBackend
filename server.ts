const express = require('express');
const session = require('express-session')

const cookieParser = require('cookie-parser')

//Iniciamos express
const app = express();

//Le pasamos a http la constante app
const http = require('http').createServer(app);

//Le pasamos al constante http a socket.io
const io = require('socket.io')(http);

//import model from './models/mensajes';
//import * as model from './models/mensajes';
import model from './models/mensajes';

const {CRUD} = require('./options/mongoose');

let admin = true;

CRUD()

//Indicamos que queremos cargar los archivos estaticos que se encuentran en dicha carpeta
app.use(express.static("public"))
app.set("view engine", "ejs")
app.set("views", "./views")
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser());
app.use(session({
    secret: 'secreto',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 30000,
    }
}))

//------RUTAS--------
const routerProduct = require('./routes/routesProduct');
app.use('/productos', routerProduct)

const routerCarrito = require('./routes/routesCarrito');
app.use('/carrito', routerCarrito)

const routerLogin = require('./routes/routesLogin');
app.use(routerLogin)


//-------FUNCIONES-------
const mensajes = require ('./utils/mensajes.js')


//------Socket.io------
io.on('connection', function(socket:any)  {

    //"connection" se ejecuta la primera vez que se abre una nueva conexion
    console.log('Usuario conectado')
    
    // socket.on('client-message', (producto: any) =>
    // {
    //     io.emit('server-message', (producto));
    // });

    socket.on('client-chat-message', async (mensajeNuevo: any) => 
    {
        const mensaje = { 
            email: mensajeNuevo.nuevoEmail, 
            fecha: new Date(),
            mensaje: mensajeNuevo.nuevoMensaje
        };
        const mensajeSaveModel = new model(mensaje);
        let mensajeSave = await mensajeSaveModel.save()
        io.emit('server-chat-message', (mensajeNuevo));
    });

    // //Nos suscribimos a un evento enviada desde el cliente
    // socket.on('client-carrito-message', (mensaje: any) => 
    // {        
    //     io.emit('server-carrito-message', (mensaje));
    // });

    socket.on('disconnect', ()=> {
        console.log('Usuario desconectado')
    })


})

// const {options} = require('./options/mariaDB')
// const knex = require('knex')(options)

// knex.schema.createTable('productos', function(table: any) {
//     table.increments("id")
//     table.string('nombre',15)
//     table.float('precio',10,2)
//     table.string('descripcion',100)
//     table.string('codigo',15)
//     table.string('foto',150)
//     table.integer('stock')
//     table.timestamp('fecha')
// })
// .then( ()=>{
//     console.log('Tabla creada')
// })
// .catch( async(e:any)=>{
//     console.log(e)
// })
// .finally(()=>{
//     knex.destroy()
// })


// const {options} = require('./options/sqlite3')
// const knex = require('knex')(options)

// knex.schema.createTable('mensajes', function(table: any) {
//     table.increments("id")
//     table.string('email',15)
//     table.timestamp('fecha')
// })
// .then( ()=>{
//     console.log('Tabla creada')
// })
// .catch( async(e:any)=>{
//     console.log(e)
// })
// .finally(()=>{
//     knex.destroy()
// })



const server = http.listen(8080, () =>{
    console.log(`Escuchando en el puerto ${server.address().port}`)
})

server.on("error", (error: any) => console.log(`Se produjo un error: ${error}`))

function table(arg0: string, table: any, arg2: (any: any) => void) {
    throw new Error("Function not implemented.");
}
