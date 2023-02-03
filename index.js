const express = require("express");


//definir carpetas
const path = require("path");

//APP DE EXPRESS    
const app = express(); //esto inicializa y ya puedo emepzar a escuchar peticiones

//DEFINIR VARIABLES DE ENTORNO
require('dotenv').config(); //esto lee lo de nuestro archivo env, la configuracion

//CREAR UN SERVIDOR DE SOCKETS // NODE SERVER
//npm i socket.io installar //https://www.npmjs.com/package/socket.io
const server = require('http').createServer(app);
// module.exports para esportar el dato
module.exports.io = require('socket.io')(server);
//para llamar a los sockets o clase
require("./sockets/socket");



//Path público
//__dirname apunta a donde este nuestro servidor
// si es un servidor http://  y asi
const publicPath = path.resolve(__dirname,"public");
app.use(express.static(publicPath)); //asi ya estoy usando nuestro directorio publico


//escuchando en el puerto 3000
// para usar el socket cambiamos por server a app
server.listen(process.env.PORT,(err) =>{
    if(err) throw new Error(err);
    console.log('Servidor corriendo en puerto!!!!, ', process.env.PORT);
});