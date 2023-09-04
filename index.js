require('dotenv').config();

const express = require('express');
const cors = require('cors');


const { dbConnection } = require('./database/config')

// Crear servidor de express

const app = express();

//configurar CORS
app.use(cors());


//Database
dbConnection();

console.log( process.env );

//user -> fcarmona
// password -> U1po1Rgp1sCa1cwA

//Rutas
app.get('/', (req, res) => {

    res.json({
        ok: true,
        msg: 'Hola mundo'
    })
})



app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT)
})