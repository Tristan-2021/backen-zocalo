const express = require('express');
require('dotenv').config();

// Db config importarlo
// const {dbConnection}  = require('./database');
//dbConnection();

require('./database/confi.g').dbConnection();
// app expres
const app = express();

// lecturaa y parseo del body

app.use(express.json());



// node server 
//// DB_CNN =mongodb+srv://candangas:jhon9419@cluster0.cfpdf.mongodb.net/codigo 

const server = require('http').createServer(app);


const path = require('path');

// path públcio

const publicPath = path.resolve(__dirname, 'public');

//Mis rutas
app.use('/api/login', require('./routes/auth'));


module.exports.io = require('socket.io')(server) 
require('./socket/socket')
app.use(express.static(publicPath));
server.listen(process.env.PORT, (err)  => {

    if(err) throw Error(err);
    console.log(`Servidor corriendo III`, process.env.PORT);
} );