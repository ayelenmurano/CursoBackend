// let chai = require('chai');
// let chaiHttp = require('chai-http');
// const expect = require('chai').expect;

// chai.use(chaiHttp);
// const url= 'http://localhost:8080';

// var request = require('superagent');

// var authenticatedUser = request.agent();

const producto = {
    "nombre": "PruebaTest",
    "precio": 1300,
    "descripcion": "Objeto que sirve para hacer cuentas ",
    "codigo": "1213444547789999",
    "foto": "https://cdn3.iconfinder.com/data/icons/e-commerce-and-online-shopping/64/__Calculator-256.png",
    "stock": "3"
}

const userCredentials = {
    "username":"Aye42",
    "password":"Aye42"
}

var request = require('supertest');
var server = request.agent('http://localhost:8080');

describe('GET /api/getDir', function(){

    it('login', async (done) => {
        await server
        .post('/login')
        .send({ username: 'Aye42', password: 'Aye42' })
        .expect(302)
        .expect('Location', '/productos')
        .end( (err, res) => {
                if (err) return done(err);
                return done();
        });
    });


    it('uri that requires user to be logged in', async (done) => {
    await server
        .get('/productos')                       
        .expect(200)
        .end( (err, res) => {
            if (err) return done(err);
            console.log(`11111 ${JSON.stringify(res.body)}`);
             done()
        });
    });
});

// describe('Logueo del usuario: ',() => {

//     it('should log', (done) => {
//         chai.request(url)
//         .post('/login')
//         .send(usuarioLogueado)
//         .end( function(err,res){
//         console.log(res)
//         expect(res).to.have.status(200);
//         expect(res).to.have.cookie('authToken');
//         done();
//         });
//     });
// })


// describe('Insert a product: ',() => {

//     it('logg', async function(){
//         await authenticatedUser
//             .post(`${url}/login`)
//             .send(userCredentials)
//             .expect(200)
//             .then((res) => {
//                 expect(res.body).to.have.property('success', true);
//             });
//     });


//     it('should insert a product', async (done) => {
//         await authenticatedUser.get('/productos/listar')
//         .expect(200, done);
//         // .post('/productos/guardar')
//         // .send(producto)
//         // .end( function(err,res){
//         // console.log(res.body)
//         // expect(res).to.have.status(200);
//         // done();
//         // });
//     });
// });