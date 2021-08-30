let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
const querystring = require('querystring');


chai.use(chaiHttp);
const url= 'http://localhost:8080';

let producto = {
    "nombre": "PruebaTest",
    "precio": 1300,
    "descripcion": "Objeto que sirve para hacer cuentas ",
    "codigo": "1213444541",
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

let cantidadDeProductos = 0;
let sid = '';

describe('Se prueban las funciones correspondientes a productos: ',()=>{
    
    it('Logueo con el usuario ya creado', async () => {
        const agent = chai.request.agent('http://localhost:8080');
     
        try {
          await agent
            .post('/login')
            .send({ username: 'Aye55', password: 'Aye55' })
            .then( function(res){
             sid = res.header['set-cookie'][0].split(';')[0]
             expect(res).to.redirectTo(`${url}/productos`)
             });
     
         } catch (e) {
             console.log(e);
         } 
    }); 

    
    it('Obtener productos disponibles. GET /productos/listar', (done) => {
        chai.request(url)
        .get('/productos/listar')
        .set('Cookie',sid)
        .end( async function(err,res){
            await expect(res)
            .to.have.status(200)
            .to.be.json;
            done();
            });
    });

    it('Agregar un producto. POST /productos/guardar', (done) => {
        chai.request(url)
        .post('/productos/guardar')
        .set('Cookie',sid)
        .send(producto)
        .end( async function(err,res){
            await expect(res)
            .to.have.status(200)
            .to.be.json;
            cantidadDeProductos = res.body.productos.length;
            const id = cantidadDeProductos-1
            expect(res.body.productos[id].nombre).to.equal(producto.nombre)
            expect(res.body.productos[id].precio).to.equal(producto.precio)
            expect(res.body.productos[id].descripcion).to.equal(producto.descripcion)
            expect(res.body.productos[id].codigo).to.equal(producto.codigo)
            expect(res.body.productos[id].foto).to.equal(producto.foto)
            expect(res.body.productos[id].stock).to.equal(producto.stock)
            done();
            });
    });

    it('Actualizar un producto. POST /productos', (done) => {
        producto.precio = 1400
        chai.request(url)
        .put('/productos')
        .set('Cookie',sid)
        .send(producto)
        .end( async function(err,res){
            await expect(res)
            .to.have.status(200)
            .to.be.json;

            let productoResponse = {};
            for (let elem in res.body.productos ) {
                if (res.body.productos[elem].precio === producto.precio) {
                    productoResponse = res.body.productos[elem]
                    break;
                }
            }
            expect(productoResponse.precio).to.equal(producto.precio)
            done();
            });
    });

    it('Listar un producto por codigo. GET /productos/listar?codigo=1213444541', (done) => {
        chai.request(url)
        .get('/productos/listar')
        .query({codigo:producto.codigo})
        .set('Cookie',sid)
        .end( async function(err,res){
            await expect(res)
            .to.have.status(200)
            .to.be.json;
            expect(res.body.producto.nombre).to.equal(producto.nombre)
            expect(res.body.producto.descripcion).to.equal(producto.descripcion)
            expect(res.body.producto.codigo).to.equal(producto.codigo)
            expect(res.body.producto.foto).to.equal(producto.foto)
            expect(res.body.producto.stock).to.equal(producto.stock)
            done();
            });
    });

    it('Borrar un producto. DELETE /productos?codigo=1213444541', (done) => {
        chai.request(url)
        .delete('/productos')
        .query({codigo:producto.codigo})
        .set('Cookie',sid)
        .end( async function(err,res){
            await expect(res)
            .to.have.status(200)
            .to.be.json;
            expect(res.body.productos.length).to.equal(cantidadDeProductos-1)
            done();
            });
    });

});

    


