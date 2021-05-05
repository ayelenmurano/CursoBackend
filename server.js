"use strict";
var express = require('express');
//Iniciamos express
var app = express();
//Le pasamos a http la constante app
var http = require('http').createServer(app);
//Le pasamos al constante http a socket.io
var io = require('socket.io')(http);
var admin = true;
//Indicamos que queremos cargar los archivos estaticos que se encuentran en dicha carpeta
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//------RUTAS--------
var routerProduct = require('./routes/routesProduct');
app.use('/productos', routerProduct);
var routerCarrito = require('./routes/routesCarrito');
app.use('/carrito', routerCarrito);
//-------FUNCIONES-------
var mensajes = require('./utils/mensajes.js');
//------Socket.io------
io.on('connection', function (socket) {
    //"connection" se ejecuta la primera vez que se abre una nueva conexion
    console.log('Usuario conectado');
    socket.on('client-message', function (producto) {
        io.emit('server-message', (producto));
    });
    socket.on('client-chat-message', function (mensaje) {
        io.emit('server-chat-message', (mensaje));
    });
    //Nos suscribimos a un evento enviada desde el cliente
    socket.on('client-carrito-message', function (mensaje) {
        io.emit('server-carrito-message', (mensaje));
    });
});
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
var server = http.listen(8080, function () {
    console.log("Escuchando en el puerto " + server.address().port);
});
server.on("error", function (error) { return console.log("Se produjo un error: " + error); });
function table(arg0, table, arg2) {
    throw new Error("Function not implemented.");
}
