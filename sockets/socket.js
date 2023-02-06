
//para importar
const {io} = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();
bands.addBand(new Band("Queen"));
bands.addBand(new Band("Bon Jovi"));
bands.addBand(new Band("Héroes del Silencio"));
bands.addBand(new Band("Metallica"));





//MENSAJES DE SOCKETS
//client es un dispositivo q se acaba de conectar
// http://localhost:3000/socket.io/socket.io.js entrar para ver la configuracion
//revisar el html y agregar <script src="socket.io/socket.io.js"></script>
io.on('connection', client => {
    console.log("Cliente conectado");
    //emitir un mensaje solo al cliente q se esta conectado
    client.emit("active-bands",bands.getBands());



    client.on('disconnect', () => { 
        //cuando se descoencta el cliente
        console.log("Cliente desconectado");
     });
     //COMUNICACIÓN DEL SOCKET EVENTO   
     //on es para escuchar o estar escuchando
     //"mensaje" debe ser igual al del html del emit 
     //payload es el dato
     client.on("mensaje",(payload)=>{
        console.log("Mensaje ",payload);
        console.log("Mensaje ",payload.nombre);
        //para emitir a todos los clientes conectados
        io.emit('mensaje',{admin:'Nuevo mensaje'});
    });

    client.on("emitir-mensaje",(payload) =>{
        //io.emit("nuevo-mensaje",payload); Emite a todos
        //Emitir a todos menos al cliente conectado q emitio el mensaje
        client.broadcast.emit("nuevo-mensaje",payload);
    });

    client.on('vote-band',(payload)=>{
        bands.voteBand(payload.id);
        //Recordar io emite a todos los cleintes conectados
        //client solo el q se esta conectando
        io.emit("active-bands",bands.getBands());

    });

    client.on("add-band",(payload)=>{
        bands.addBand(new Band(payload.name));
        io.emit("active-bands",bands.getBands());
    });
    client.on("delete-band",(payload)=>{
        bands.deleteBand(payload.id);
        io.emit("active-bands",bands.getBands());
    });
    
});