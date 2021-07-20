const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');

const log4js = require ('./src/config/log4jsConfig');

const loggs = log4js.getLogger('server');

//**************EXPRESS
//Iniciamos express
const app = express();

//Le pasamos a http la constante app
const http = require('http').createServer(app);

//Le pasamos al constante http a socket.io
const io = require('socket.io')(http);

//import model from './models/mensajes';
//import * as model from './models/mensajes';
import model from './src/models/mensajes';

const conn = require('./src/options/mongoose');


//**************PASSPORT
const passport = require ('./src/passport/passport');

let admin = true;



//**************CONEXIONES

//-----FILESTORE-----
//const fileStore = require("session-file-store")(session);

//-----MONGO-----
const MongoStore = require('connect-mongo');
const advancedOptions = {useNewUrlParser: true, useUnifiedTopology: true};

//-----REDIS-----
// const redis = require("redis");
// const client = redis.createClient();
// const redisStore = require("connect-redis")(session);



//**************APP
//Indicamos que queremos cargar los archivos estaticos que se encuentran en dicha carpeta
app.use(express.static("public"))
app.set("view engine", "ejs")
app.set("views", "./views")
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser());
app.use(passport.initialize());
app.use(session({

    //-----FILESTORE-----
    //store: new fileStore({path: './sessions', ttl: 10, retries: 0}),

    //-----REDIS-----
    // store: new redisStore({
    //     host: 'localhost',
    //     port: 6379,
    //     client: client,
    //     ttl: 60 //opcional
    // }),
    secret: 'secreto',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: false,
        secure: false,
        maxAge: 3000,
    },
    rolling:true,
    
    //-----MONGO-----
    // store: MongoStore.create({
    //     mongoUrl: 'mongodb://admin:root@localhost:27017/ecommerce',
    //     mongoOptions: advancedOptions,
    //     ttl: 60,
    //     collectionName: 'sessions'
    //     }),
    
}))
app.use(passport.initialize());
app.use(passport.session());



//**************RUTAS
const routerProduct = require('./src/routes/routesProduct');
app.use('/productos', routerProduct)

const routerCarrito = require('./src/routes/routesCarrito');
app.use('/carrito', routerCarrito)

const routerLogin = require('./src/routes/routesLogin');
app.use(routerLogin)


//**************FUNCIONES
const mensajes = require ('./src/utils/mensajes.js')


//**************Socket.io
io.on('connection', function(socket:any)  {

    //"connection" se ejecuta la primera vez que se abre una nueva conexion
    loggs.info('Usuario conectado');
    
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
        loggs.info('Usuario desconectado');
    })


})

//---------CREACION DE LA TABLA PRODUCTOS CON MYSQL

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


//---------CREACION DE LA TABLA PRODUCTOS CON SQLITE3
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

let port = 8080;
let cluster = false;

for ( let i in process.argv ) {
    if ( process.argv[i].includes("port" )) {
        port = parseInt(process.argv[i])
    }

    if( process.argv[i].includes("cluster") ){
        cluster = true;
    }
}

if ( cluster ) {
    const cluster = require('cluster');
    const numCpu = require('os').cpus().length;
    if(cluster.isMaster) {
        loggs.info(`cantidad de nucleos: ${numCpu}`);
        loggs.info(`process ID: ${process.pid} `);

        for (let i=0; i < numCpu; i++){
            cluster.fork();
        }

        cluster.on('exit', worker  => {
            loggs.info(`Worker, ${worker.process.pid} died ${new Date()}`);
            cluster.fork();
        })
    }
} else { 
    const server = http.listen(port, () =>{
        loggs.info(`Escuchando en el puerto ${port}. Codigo de salida: ${process.pid}`)
    })
    
    server.on("error", (error: any) => loggs.error(`Se produjo un error: ${error}`))
}



