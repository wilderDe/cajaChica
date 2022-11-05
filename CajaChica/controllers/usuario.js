const Usuario = require("../models/usuario")



const usuarioPost=async(req,res) => {

    const {ci,nombre,ap_paterno,ap_materno,direccion,telefono,fecha_ingreso,rol} = req.body
    const usuario = new Usuario({ci,nombre,ap_paterno,ap_materno,direccion,telefono,fecha_ingreso,rol,usuario: ci,password: ci})
    await usuario.save()
    res.json({
        value:true,
        msg:"usuario registrado"
    })
}

const usuariosGet = async(req, res) => {
    const usuarios = await Usuario.find({estado:true})
    res.json(usuarios)

}

const usuarioGetId = async(req, res) => {

    const {usuario,password} = req.params
    
    const user = await Usuario.find({usuario:usuario, password:password})
    
    if(user.length > 0){
        return res.json({
            value:true,
            user
        })
    }else{
        return res.json({
            value:false
        })
    }

    
  
}

const usuarioPutId = async(req, res) => {

    const {id} = req.params
    const {body} = req
    try {
        
        const usuario = await Usuario.findByIdAndUpdate(id,body);
        return res.json(usuario)
    } catch (error) {
        return res.json({msg: "no existe"})
    }
}

const busquedaUsuarios = async (req, res) => {

    const {termino} = req.params;

    const regex = new RegExp(termino,'i')
    const usuarios = await Usuario.find({estado:true,
        $or:[{nombre:regex}]
    })
    res.json(usuarios)

}

module.exports = {
    usuarioPost,
    usuariosGet,
    usuarioGetId,
    usuarioPutId,
    busquedaUsuarios
}