const axios = require('axios');
const path =  require('path');

let url = 'http://localhost:8080';

const getProducts =  (async () => {
    try {
        let response = await axios.get('http://localhost:8080/productos');
        console.log(response.request.ClientRequest.data);
    } catch (e) {
        console.log("Error: ", e);
    }
});

getProducts();


// function getProducts() {
//     let response = axios.get(path.join(url,'/productos'))
//     console.log(response);
//     return response;
// }

// Promise.all([getProducts()])
//     .then(function(results) {
//         const products = results[0];
//     })


// (async () => {
//     try {
//         let response = await axios(url);
//         console.log(response.data);
//     } catch (e) {
//         console.log("Error: ", e);
//     }
// })();