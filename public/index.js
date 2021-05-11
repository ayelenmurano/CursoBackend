const socket = io()

//Permite empezar a usar los sockets desde el lado cliente
//cliente

//Nos suscribimos a un evento enviada desde el servidor
// socket.on('NuevoProducto', data=>{
//     res.render("pages/index.ejs",{productos})
//     // alert(data)

//     //Enviamos un evento al servidor
//     socket.emit('notificacion','Mensaje recibido exitosamente')

// })

const tbody = document.querySelector('tbody');
const listaMensajes = document.getElementById('mensajes');
let fecha = new Date();
        
let fechaFormateada= `${fecha.getDate()}/${fecha.getMonth()+1}/${fecha.getFullYear()} ${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}`;

socket.on('server-chat-message', function (msj) {
    const mensajeEnviar = msj.nuevoMensaje;
    const emailEnviar = msj.nuevoEmail;
    const fechaEnviar = msj.fechaFormateada;
    $('#listado-msjs').append( $('<li>').text(emailEnviar+'('+fechaEnviar+'): '+mensajeEnviar) );
  });

function enviarMensaje() {
    console.log('Esto es una prueba');
    const nuevoMensaje = $('#nuevo-msj').val();
    const nuevoEmail = $('#email-nuevo-msj').val();
    socket.emit('client-chat-message', {nuevoMensaje,nuevoEmail,fechaFormateada});
    $('#nuevo-msj').val('');
    $('#email-nuevo-msj').val('');
};

// function nuevoProducto(){

//     let nombre = document.getElementById("nombre").value
//     let descripcion = document.getElementById("descripcion").value
//     let codigo = document.getElementById("codigo").value
//     let foto = document.getElementById("foto").value
//     let precio = document.getElementById("precio").value
//     let stock = document.getElementById("stock").value

//     socket.emit('client-message', {nombre, descripcion, codigo, foto, precio, stock})
// }

// function nuevoMensaje(){
//     console.log({email, fecha, mensaje})
//     let email = document.getElementById("email").value
//     let fecha = fechaFormateada
//     let mensaje = document.getElementById("mensaje").value
    

//     socket.emit('client-chat-message', {email, fecha, mensaje})

//   //  listaMensajes.innerHTML += `<b>${datosMensaje.email}</b>[${fechaFormateada}]: <i>${datosMensaje.mensaje}</i><br>`
// }

// function nuevoProductoCarrito(){

//     let id = document.getElementById("id").value

//     socket.emit('client-message', {id})
// }


// socket.on('server-message', (producto) =>
// {
//    // location.reload();
//     tbody.innerHTML += `<td> ${producto.title} </td>
//     <td> ${producto.price} </td>
//     <td><img src="${producto.thumbnail}" width="50" height="50"</td>`;
// });

// socket.on('server-chat-message', (datos) => 
//         {
//             console.log(datos)
//          listaMensajes.innerHTML += ` <h10><b>${datos.email}</b><br>[${datos.fecha}]: <i>${datos.mensaje}</i><br></h10>`
//         });

// // socket.on('nuevoProducto', productos =>{
// //     console.log('hola')
// //     location.reload();
// // })


// document.getElementById('agregarProducto').addEventListener('click', function(){
//      const idProducto = document.getElementById('id')
//     // const productosCarrito = carrito.leer()
//     // const productToAdd = ""
//     // for (let producto in productosCarrito){
//     //     if ( productosCarrito[producto].id === idProducto){
//     //         productoToAdd = productos[producto]
//     //     }
//     // }
//     console.log(`El producto a agregar es ${idProducto}`)
    
// })



