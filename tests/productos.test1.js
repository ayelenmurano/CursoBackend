let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;


chai.use(chaiHttp);
const url= 'http://localhost:8080';

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
    "username":"Aye55",
    "password":"Aye55"
}

describe('Login: ',()=>{
    it('Loguear un usuario', (done) => {
        chai.request(url)
        .post('/login')
        .send(usuarioLogueado)
        .end( async function(err,res){
            console.log(res)
            await expect(res).to.have.status(200);
            done();
        });
    });
});

