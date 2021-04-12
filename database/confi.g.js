const mongoose = require('mongoose');

const dbConnection = async ()=>{
    try{


     mongoose.connect(process.env.DB_CNN, {
         useNewUrlParser:true,
         useUnifiedTopology:true,
         useCreateIndex:true
     } );

     console.log('DB Online');
    } catch (err){
        console.log(err);
        throw new Error('Error en la base de Datos');
    }
}
// exportar manualmente con nombre
module.exports ={
    dbConnection
}