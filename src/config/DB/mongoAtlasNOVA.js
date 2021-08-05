const mongoose = require('mongoose')

const uri = `mongodb+srv://ayelenmurano:ayelenmurano@cluster0.s0im9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conectado a la base de datos')
  })
  .catch((e) => {
    console.log('Database error', e)
  })


  module.exports = mongoose.connection;