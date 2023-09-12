require('dotenv').config();

const express = require('express');
const cors = require('cors');


const { dbConnection } = require('./database/config')

// Crear servidor de express

const app = express();

//configurar CORS
app.use(cors());

//Lectura del Body
app.use(express.json())

//Database
dbConnection();

console.log( process.env );

//user -> fcarmona
// password -> U1po1Rgp1sCa1cwA

//Rutas
app.use('/api/usuarios', require('./routes/usuarios'))
app.use('/api/login', require('./routes/auth'))
//app.get('/api/usuarios', (req, res) => {
//
//    res.json({
//        ok: true,
//        usuarios: [{
//            id: 123,
//            nombre: 'asdf'
//        }]
//    })
//})



app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT)
})