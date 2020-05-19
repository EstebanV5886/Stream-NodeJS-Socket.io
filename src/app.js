const express = require('express');
const app = express();

//Creamos servidor http a traves de Express
const http = require('http').Server(app);

//Generamos comunicacion con socket.io
const io = require('socket.io')(http);

//routes
app.use(require('./routes/streaming.routes'));

//Donde cargamos los html con los que vamos a trabajar
app.use(express.static(__dirname + '/public'));

//Generamos canal de comunicacion dentro del servidor que estamos trabajando
io.on('connection', (socket) => {
    socket.on('stream', (image) => {
        //emitir evento a todos los sockets conectados
        socket.broadcast.emit('stream', image);
    })
})


module.exports = http;

