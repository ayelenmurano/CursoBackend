const { assert } = require('chai');
const chai = require('chai');
const { expect } = require('chai');
const chaiHttp = require('chai-http');
const CircularJSON = require('circular-json');

const url= 'http://localhost:8080';

chai.use(chaiHttp);

let producto1 = {
    "nombre": "PruebaTest",
    "precio": 1300,
    "descripcion": "Objeto que sirve para hacer cuentas ",
    "codigo": "12121212",
    "foto": "https://cdn3.iconfinder.com/data/icons/e-commerce-and-online-shopping/64/__Calculator-256.png",
    "stock": "3"
}

let producto2 = {
    "nombre": "PruebaTest2",
    "precio": 1000,
    "descripcion": "Objeto que sirve para hacer cuentas ",
    "codigo": "13131313",
    "foto": "https://cdn3.iconfinder.com/data/icons/e-commerce-and-online-shopping/64/__Calculator-256.png",
    "stock": "2"
}

let sid = ''

let cantidadDeProductos = 0;

describe('Se prueban las funciones correspondientes a carrito: ', () => {
 
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

    it('Agregar el producto 1. POST /productos/guardar', (done) => {
        chai.request(url)
        .post('/productos/guardar')
        .set('Cookie',sid)
        .send(producto1)
        .end( async function(err,res){
            await expect(res)
            .to.have.status(200)
            .to.be.json;
            cantidadDeProductos = res.body.productos.length;
            const id = cantidadDeProductos-1
            expect(res.body.productos[id].nombre).to.equal(producto1.nombre)
            expect(res.body.productos[id].precio).to.equal(producto1.precio)
            expect(res.body.productos[id].descripcion).to.equal(producto1.descripcion)
            expect(res.body.productos[id].codigo).to.equal(producto1.codigo)
            expect(res.body.productos[id].foto).to.equal(producto1.foto)
            expect(res.body.productos[id].stock).to.equal(producto1.stock)
            done();
            });
    });

    it('Agregar el producto 2. POST /productos/guardar', (done) => {
        chai.request(url)
        .post('/productos/guardar')
        .set('Cookie',sid)
        .send(producto2)
        .end( async function(err,res){
            await expect(res)
            .to.have.status(200)
            .to.be.json;
            cantidadDeProductos = res.body.productos.length;
            const id = cantidadDeProductos-1
            expect(res.body.productos[id].nombre).to.equal(producto2.nombre)
            expect(res.body.productos[id].precio).to.equal(producto2.precio)
            expect(res.body.productos[id].descripcion).to.equal(producto2.descripcion)
            expect(res.body.productos[id].codigo).to.equal(producto2.codigo)
            expect(res.body.productos[id].foto).to.equal(producto2.foto)
            expect(res.body.productos[id].stock).to.equal(producto2.stock)
            done();
            });
    });

  it('Obtener productos disponibles del carrito. GET /carrito/listar', (done) => {
    chai.request(url)
    .get('/carrito/listar')
    .set('Cookie',sid)
    .end( async function(err,res){
        await expect(res)
        .to.have.status(200)
        .to.be.json;
        done();
        });
    });

    it('Agregar un solo producto. GET /carrito/agregar?codigo=q2334', (done) => {
        chai.request(url)
        .get('/carrito/agregar')
        .query({codigo:producto1.codigo})
        .set('Cookie',sid)
        .end( async function(err,res){
            await expect(res)
            .to.have.status(200)
            expect(res.body.productos.length).to.equal(1)
            expect(res.body.productos[0].nombre).to.equal(producto1.nombre)
            expect(res.body.productos[0].precio).to.equal(producto1.precio)
            expect(res.body.productos[0].descripcion).to.equal(producto1.descripcion)
            expect(res.body.productos[0].codigo).to.equal(producto1.codigo)
            expect(res.body.productos[0].foto).to.equal(producto1.foto)
            expect(res.body.productos[0].cantidad).to.equal(1)
            done();
            });
        });

        it('Agregar un segundo producto igual. GET /carrito/agregar?codigo=q2334', (done) => {
            chai.request(url)
            .get('/carrito/agregar')
            .query({codigo:producto1.codigo})
            .set('Cookie',sid)
            .end( async function(err,res){
                await expect(res)
                .to.have.status(200)
                expect(res.body.productos.length).to.equal(1)
                expect(res.body.productos[0].nombre).to.equal(producto1.nombre)
                expect(res.body.productos[0].precio).to.equal(producto1.precio)
                expect(res.body.productos[0].descripcion).to.equal(producto1.descripcion)
                expect(res.body.productos[0].codigo).to.equal(producto1.codigo)
                expect(res.body.productos[0].foto).to.equal(producto1.foto)
                expect(res.body.productos[0].cantidad).to.equal(2)
                done();
                });
            });

        it('Agregar un tercer producto diferente. GET /carrito/agregar?codigo=12134', (done) => {
            chai.request(url)
            .get('/carrito/agregar')
            .query({codigo:producto2.codigo})
            .set('Cookie',sid)
            .end( async function(err,res){
                await expect(res)
                .to.have.status(200)
                expect(res.body.productos.length).to.equal(2)
                expect(res.body.productos[0].nombre).to.equal(producto1.nombre)
                expect(res.body.productos[0].precio).to.equal(producto1.precio)
                expect(res.body.productos[0].descripcion).to.equal(producto1.descripcion)
                expect(res.body.productos[0].codigo).to.equal(producto1.codigo)
                expect(res.body.productos[0].foto).to.equal(producto1.foto)
                expect(res.body.productos[0].cantidad).to.equal(2)
                expect(res.body.productos[1].nombre).to.equal(producto2.nombre)
                expect(res.body.productos[1].precio).to.equal(producto2.precio)
                expect(res.body.productos[1].descripcion).to.equal(producto2.descripcion)
                expect(res.body.productos[1].codigo).to.equal(producto2.codigo)
                expect(res.body.productos[1].foto).to.equal(producto2.foto)
                expect(res.body.productos[1].cantidad).to.equal(1)
                done();
                });
            });

        it('Borrar un producto repetido del carrito. DELETE /carrito?codigo=q2334', (done) => {
            chai.request(url)
            .delete('/carrito')
            .query({codigo:producto1.codigo})
            .set('Cookie',sid)
            .end( async function(err,res){
                await expect(res)
                .to.have.status(200)
                expect(res.body.productos.length).to.equal(2)
                expect(res.body.productos[0].cantidad).to.equal(1)
                done();
                });
            });

            it('Borrar un segundo producto del carrito. DELETE /carrito?codigo=q2334', (done) => {
                chai.request(url)
                .delete('/carrito')
                .query({codigo:producto1.codigo})
                .set('Cookie',sid)
                .end( async function(err,res){
                    await expect(res)
                    .to.have.status(200)
                    expect(res.body.productos.length).to.equal(1)
                    done();
                    });
            });

            it('Borrar un ultimo producto del carrito. DELETE /carrito?codigo=12134', (done) => {
                chai.request(url)
                .delete('/carrito')
                .query({codigo:producto2.codigo})
                .set('Cookie',sid)
                .end( async function(err,res){
                    await expect(res)
                    .to.have.status(200)
                    expect(res.body.productos.length).to.equal(0)
                    done();
                    });
            });


            it('Borrar producto 1. DELETE /productos?codigo=1213444541', (done) => {
                chai.request(url)
                .delete('/productos')
                .query({codigo:producto1.codigo})
                .set('Cookie',sid)
                .end( async function(err,res){
                    await expect(res)
                    .to.have.status(200)
                    .to.be.json;
                    expect(res.body.productos.length).to.equal(cantidadDeProductos-1)
                    done();
                    });
            });

            it('Borrar producto 2. DELETE /productos?codigo=1213444541', (done) => {
                chai.request(url)
                .delete('/productos')
                .query({codigo:producto2.codigo})
                .set('Cookie',sid)
                .end( async function(err,res){
                    await expect(res)
                    .to.have.status(200)
                    .to.be.json;
                    expect(res.body.productos.length).to.equal(cantidadDeProductos-2)
                    done();
                    });
            });


});