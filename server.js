"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
//Iniciamos express
var app = express();
//Le pasamos a http la constante app
var http = require('http').createServer(app);
//Le pasamos al constante http a socket.io
var io = require('socket.io')(http);
//import model from './models/mensajes';
//import * as model from './models/mensajes';
var mensajes_1 = __importDefault(require("./models/mensajes"));
var CRUD = require('./options/mongoose').CRUD;
var admin = true;
CRUD();
//Indicamos que queremos cargar los archivos estaticos que se encuentran en dicha carpeta
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret: 'secreto',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 30000,
    }
}));
//------RUTAS--------
var routerProduct = require('./routes/routesProduct');
app.use('/productos', routerProduct);
var routerCarrito = require('./routes/routesCarrito');
app.use('/carrito', routerCarrito);
var routerLogin = require('./routes/routesLogin');
app.use(routerLogin);
//-------FUNCIONES-------
var mensajes = require('./utils/mensajes.js');
//------Socket.io------
io.on('connection', function (socket) {
    var _this = this;
    //"connection" se ejecuta la primera vez que se abre una nueva conexion
    console.log('Usuario conectado');
    // socket.on('client-message', (producto: any) =>
    // {
    //     io.emit('server-message', (producto));
    // });
    socket.on('client-chat-message', function (mensajeNuevo) { return __awaiter(_this, void 0, void 0, function () {
        var mensaje, mensajeSaveModel, mensajeSave;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mensaje = {
                        email: mensajeNuevo.nuevoEmail,
                        fecha: new Date(),
                        mensaje: mensajeNuevo.nuevoMensaje
                    };
                    mensajeSaveModel = new mensajes_1.default(mensaje);
                    return [4 /*yield*/, mensajeSaveModel.save()];
                case 1:
                    mensajeSave = _a.sent();
                    io.emit('server-chat-message', (mensajeNuevo));
                    return [2 /*return*/];
            }
        });
    }); });
    // //Nos suscribimos a un evento enviada desde el cliente
    // socket.on('client-carrito-message', (mensaje: any) => 
    // {        
    //     io.emit('server-carrito-message', (mensaje));
    // });
    socket.on('disconnect', function () {
        console.log('Usuario desconectado');
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
