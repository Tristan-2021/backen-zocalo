const { io } = require('../index')

// sockets = mensajes
io.on('connection', client => {
    console.log('Cliente conectado');
    
    client.on('disconnect', () => {
    console.log('Cliente desonectado');
    } ) ;
    
    client.on('mensaje' ,(payload)=> {
        console.log('Mensaje !!', payload ); 
        io.emit('mensaje', {
            admin: ' nuevo mensajee desde el servidor'
        }); 
    });
    
    
    });