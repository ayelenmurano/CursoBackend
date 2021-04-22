"use strict";
var express = require('express');
//Iniciamos express
var app = express();
//Le pasamos a http la constante app
var http = require('http').createServer(app);
//Le pasamos al constante http a socket.io
var io = require('socket.io')(http);
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
var mensajes = require('./modules/mensajes.js');
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
});
var server = http.listen(8080, function () {
    console.log("Escuchando en el puerto " + server.address().port);
});
server.on("error", function (error) { return console.log("Se produjo un error: " + error); });
