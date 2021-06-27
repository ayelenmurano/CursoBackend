const socket = io()

const log4js = require ('../config/log4jsConfig');

const loggs = log4js.getLogger('utils');

document.getElementById('agregarProducto').addEventListener('click', function(){
     const idProducto = document.getElementById('idProducto').value
     socket.emit('client-carrito-message', {idProducto})
    // const productosCarrito = carrito.leer()
    // const productToAdd = ""
    // for (let producto in productosCarrito){
    //     if ( productosCarrito[producto].id === idProducto){
    //         productoToAdd = productos[producto]
    //     }
    // }

    loggs.info(`El producto a agregar es ${idProducto}`)
    
})


socket.on('server-carrito-message', (producto) =>
{
   // location.reload();
    tbody.innerHTML += `<td> ${producto.title} </td>
    <td> ${producto.price} </td>
    <td><img src="${producto.thumbnail}" width="50" height="50"</td>`;
});



