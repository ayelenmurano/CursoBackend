const faker = require('faker')

faker.locale='es'

const generateProducts = (id) => {
    let productos = []
    for (let i=1; i<=id; i++){

        productos.push({
            "id": i,
            "nombre": faker.name.firstName(),
            "precio": faker.random.number(15),
            "descripcion": faker.lorem.sentence(),
            "codigo": faker.random.number(),
            "foto": faker.image.imageUrl(),
            "stock": faker.random.number(7)
        })
    }

    return productos
    
}

//exports.generateProducts = generateProducts
module.exports = generateProducts