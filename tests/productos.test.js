const assert = require("assert");
const axios = require("axios");


const url = 'http://localhost:8080';

const producto = {
    "nombre": "PruebaTest",
    "precio": 1300,
    "descripcion": "Objeto que sirve para hacer cuentas ",
    "codigo": "1213444547789999",
    "foto": "https://cdn3.iconfinder.com/data/icons/e-commerce-and-online-shopping/64/__Calculator-256.png",
    "stock": "3"
}

const usuario = {
    "username":"Aye42",
    "password":"Aye42",
    "email":"muranoayelen@gmail.com",
    "phone":"1133542390",
    "photo":"sss",
    "age":"26"
}

const usuarioLogueado = {
    "username":"Aye42",
    "password":"Aye42"
}



const logueo = usuarioLogueado => axios.post(`${url}/login`, usuarioLogueado );
const agregarProducto = producto => axios.post(`${url}/productos/guardar`, producto);


// const postNumbers = async () => {
//     try {
//     //    let responseLogeuo =await logueo(usuarioLogueado);
//         let response = await agregarProducto(producto);
//         console.log(response);
//     } catch (e) {
//         console.log("Error: ", e);
//     }
// };

// postNumbers();
describe('Corroborar que el servidor funciona OK', () => {

    it('Agregar un producto como administrador', async () => {

        let response = await agregarProducto(producto);


        assert.strictEqual(response.length, 10);
        assert.deepStrictEqual(numeros, [0,1,2,3,4,5,6,7,8,9]);
    })
})