//_____________APLICATIVO_____________//
const express = require('express');
const session = require('express-session');
const app = express();
const http = require('http').createServer(app);


//_____________LOGGS_____________//
const log4js = require ('./src/config/logger/log4jsConfig.js');
const loggs = log4js.getLogger('server');

const cookieParser = require('cookie-parser');
const io = require('socket.io')(http);


const model = require('./src/models/mensajes.js');
const conn = require('./src/options/mongoAtlas.js');


//_____________PASSPORT_____________//
const passport = require ('./src/passport/passport.js');


let admin = true;



//_____________CONEXION CON MONGODB_____________//
const MongoStore = require('connect-mongo');
const advancedOptions = {useNewUrlParser: true, useUnifiedTopology: true};



//_____________APLICATIVO_____________//
app.use(express.static("public"))
app.set("view engine", "ejs")
app.set("views", "./views")
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser());
app.use(passport.initialize());
app.use(session({
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



//_____________RUTAS_____________//
const routerProduct = require('./src/routes/routesProduct.js');
app.use('/productos', routerProduct)

const routerCarrito = require('./src/routes/routesCarrito.js');
app.use('/carrito', routerCarrito)

const routerLogin = require('./src/routes/routesLogin.js');
app.use(routerLogin)



//_____________SOCKET.IO_____________//
io.on('connection', function(socket)  {

    loggs.info('Usuario conectado');

    socket.on('client-chat-message', async (mensajeNuevo) => 
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

    socket.on('disconnect', ()=> {
        loggs.info('Usuario desconectado');
    })


})

//_____________LEVANTAMOS EL SERVIDOR_____________//
const config = require('./src/config/config.js')


if ( config.cluster ) {
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
    const server = http.listen(config.port, () =>{
        loggs.info(`Escuchando en el puerto ${config.port}. Codigo de salida: ${process.pid}`)
    })
    
    server.on("error", (error) => loggs.error(`Se produjo un error: ${error}`))
}



