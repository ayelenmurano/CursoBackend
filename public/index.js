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

function nuevoProducto(){

    let title = document.getElementById("titulo").value
    let price = document.getElementById("precio").value
    let thumbnail = document.getElementById("thumbnail").value

    socket.emit('client-message', {title, price, thumbnail})
}

function nuevoMensaje(){
    console.log({email, fecha, mensaje})
    let email = document.getElementById("email").value
    let fecha = fechaFormateada
    let mensaje = document.getElementById("mensaje").value
    

    socket.emit('client-chat-message', {email, fecha, mensaje})

  //  listaMensajes.innerHTML += `<b>${datosMensaje.email}</b>[${fechaFormateada}]: <i>${datosMensaje.mensaje}</i><br>`
}


socket.on('server-message', (producto) =>
{
   // location.reload();
    tbody.innerHTML += `<td> ${producto.title} </td>
    <td> ${producto.price} </td>
    <td><img src="${producto.thumbnail}" width="50" height="50"</td>`;
});

socket.on('server-chat-message', (datos) => 
        {
            console.log(datos)
         listaMensajes.innerHTML += ` <h10><b>${datos.email}</b><br>[${datos.fecha}]: <i>${datos.mensaje}</i><br></h10>`
        });

// socket.on('nuevoProducto', productos =>{
//     console.log('hola')
//     location.reload();
// })


