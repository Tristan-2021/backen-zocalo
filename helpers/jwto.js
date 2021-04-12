// json Wetoken

const jwt  = require('jsonwebtoken');

const generarJWT  = (uid) => {

    return new Promise((resolve, reject) => {

    
  const payload = {
    uid
  }
  
   jwt.sign(payload, process.env.JWT_KEY, {
   expiresIn: '24h' 
   }, (err,token) => {
   // no se pudo crear el token
    if(err){
       reject('no se pudo generar el JWT ');
    }else{
    // TOKEN!! que lo envío  
    
    resolve(token);
    }} );
   

    });



}




module.exports ={
    generarJWT
}