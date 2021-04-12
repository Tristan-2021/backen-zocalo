const { response } = require("express");
const Usuario   = require('../models/usuario');
const bcrypt    = require('bcryptjs');
const { generarJWT } = require("../helpers/jwto");

const crearUsuario = async(req, res = response) => {
   // extraemos del objeto user una propiedad
   const { email, password }  = req.body;
   try{
    const existEmail = await Usuario.findOne({email});
    if(existEmail){
        return res.status(400).json({
         ok: false,
         msg: 'El correo ya está registraado'
        });
    }
    // utilizamos el modelo creado, lo extramos del body para usarlo
    const usuario = new Usuario(req.body);
   /// antes de save el Usuario en la base de datos, vamso a 
   // encriptar el password 
   const salt  = bcrypt.genSaltSync();
   usuario.password = bcrypt.hashSync(password, salt);


    await usuario.save();
    // Generar Token

    const token = await generarJWT(usuario._id );


     // desde modle/Users se llama al json cuando se le envía un JSON que envía un objectId
     res.json({
         ok: true,
         usuario,
         token
     });

   } catch (err){
       console.log(err);
       res.status(500).json({
           ok:  false,
           msg: 'hable con el administrador'
       });
   }

   
   /// creand isntancai del modelo usuario
   
   
}
const login = async(req, res = response ) => {
    const { email, password } = req.body; 
    try{
        const usuarioDB = await Usuario.findOne({email});
        if(!usuarioDB){
            return res.status(404).json({
                ok:false,
                msg: 'Email no encontrado'
            });
        }

        const validaPassword = bcrypt.compareSync(password, usuarioDB.password);
         
        if(!validaPassword){
            return res.status(400).json({
                ok:false,
                msg: 'La contraseña no es valida '
            });

        }
        // generar token
        const token = await generarJWT(usuarioDB);

           res.json({
             ok: true,
             usuario: usuarioDB,
             token
           });


    }catch(err){

        console.log(err);
        return res.json({
         ok : false,
         msg :'Hable con el administrador'
        });
    }

}
 // renovar
 const renewToken = async (req, res = response) => {
   

    const  uid  = req.uid; 

    // const  recuperar el uid del usuario
       
    
    //generar un nuevo JWT 
    const token = await generarJWT( uid );
  
   
   // obtener el usuario por uid, hacer referencia al moogoose
   const usuario = await Usuario.findById(uid);
    
    res.json({
        ok:true,
        usuario,
        token
    })

   /*
    res.json({
        ok:true,
        msg: 'Renew'
    })
    */
 }

module.exports = {
    crearUsuario,
    login,
    renewToken

}