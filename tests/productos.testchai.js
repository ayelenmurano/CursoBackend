let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

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

// var request = require('supertest').agent('http://localhost:8080');
// var server = request.agent('http://localhost:8080');

// describe('GET /api/getDir', () => {

//     it('login', async (done) => {
//         let response = await server
//         .post('/login')
//         .send({ username: 'Aye42', password: 'Aye42' })
//         .expect(302)
//         .expect('Location', '/productos')
//         // .end( (err, res) => {
//         //         if (err) return done(err);
//         //         return done();
//         // });
//     });


//     it('uri that requires user to be logged in', async (done) => {
//     let response =await server
//         .get('/productos')                       
//         .expect(200)
//         // .end( (err, res) => {
//         //     if (err) return done(err);
//         //     console.log(`11111 ${JSON.stringify(res.body)}`);
//         //      done()
//         // });
//         console.log(`11111 ${response}`)
//     });
// });

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

var request = require('superagent');
var user1 = request.agent();

describe('Logueo del usuario: ',() => {

    it('should log', (done) => {
        user1
        .post('http://localhost:8080/login')
        .send({ user: 'Aye42', password: 'Aye42' })
        .end(function(err, res) {
            // user1 will manage its own cookies
            // res.redirects contains an Array of redirects
            expect(200)
        });
        done()
    });

        it('should insert a product',  (done) => {
        user1.get('/productos/listar')
        .end(function(err, res) {
            // user1 will manage its own cookies
            // res.redirects contains an Array of redirects
            console.log(res)
            expect(200)
        });
        done()
    });
})
