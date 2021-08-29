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




// var supertest = require('supertest');
// var app       = require('../server')
// var agent     = supertest.agent(app);

// describe('Login', function () {

//   it('should login form', function(done) {
//     agent
//       .post('/login')
//       .type('form')
//       .send({ "username":"Aye55" })
//       .send({ "password":"Aye55" })
//       .expect(302)
//       .expect('Location', '/')
//       .expect('set-cookie', /connect.sid/)
//       .end(function(err, res) {
//         if (err) return done(err);
//         agent.saveCookies(res);
//         return done();
//       });
//   });
// });


// var request = require('superagent');
// var user1 = request.agent();
let sessionString = '';
let sig = '';
describe('GET /productos: ',()=>{
    
    it('Obtener sesion falsa', async () => {
        const Buffer = require('safe-buffer').Buffer;
        const sessionObject = {
            passport: {
                user: 'Aye55'
            }
        }
        sessionString = Buffer.from(
            JSON.stringify(sessionObject)
        ).toString('base64');
        

        const Keygrip = require('keygrip');
        const keygrip = new Keygrip(['secreto']);
        sig = keygrip.sign('session='+sessionString)

        console.log(sessionString,sig);
    }); 
    // NO FUNCIONA, FUNCIONA DENTRO DE UN IT
    // before((done) => {
    //     chai.request(url)
    //     .post('/login')
    //     .send(usuarioLogueado)
    //     .end( async function(err,res){
    //         await expect(res).to.have.status(200);
    //         done();
    //     });
    // });


    
    it('Obtener productos disponibles', (done) => {
        chai.request(url)
        .get('/productos')
        .set('Cookie', `session=${sessionString};session.sig=${sig}`)
        .end( async function(err,res){
            await expect(res).to.have.status(200);
            console.log(res)
            done();
            });
        });

});


