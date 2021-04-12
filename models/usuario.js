const { Schema, model }    = require('mongoose');

const  UsuaioSchema = Schema({

    nombre:{
        type: String,
        required: true,
        
  
    },
    email: {
      type: String,
      required: true,
      unique  : true,
    },
    password: {
        type: String,
        required: true,
        unoque  : true,
      },
      online: {
        type: Boolean,
        required: false,
        
      },
  
 
});
UsuaioSchema.method('toJSON', function() {
    /// hacemos una desestrcuturación, del objeto User solo extraemos
    // una propiedad, de la cual no se enviará 
const { __v,_id,password, ...object }  = this.toObject();
  object.uid = _id;
  return object; 
 
} );


module.exports = model('Usuario', UsuaioSchema );