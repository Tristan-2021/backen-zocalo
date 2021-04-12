const jwt   = require('jsonwebtoken');

const validarJWT = (req, res, next) =>{
   

    // leer token 
    const token = req.header('x-token');

    if( !token ){
        return res.status(401).json({
          ok:false,
          msg:'no hay token en la petición'  
        });
    }
     
     try{
         const { uid } = jwt.verify( token, process.env.JWT_KEY );
         
         req.uid  =  uid;
          console.log(uid);

     next();   

     }catch(err){
         console.log(err);
      return res.status(401).json({
        ok:false,
        msg:' Token no válido'  
    });
     }


    
}

module.exports = {
    validarJWT
}