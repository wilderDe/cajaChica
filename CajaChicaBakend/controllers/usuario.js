const Personal = require("../models/personal")
const Usuario = require("../models/usuario")

const usuarioPost = async(req, res)=>{
    const { usuario, password } = req.body
    const existeUsuario = await Usuario.findOne({
        where:{
            usuario: usuario,
            password: password
        }
    })
    if(!existeUsuario){
        return res.json({
            login:false,
            msg:'datos incorrectos'
        })
    }
    const personal = await Personal.findByPk(existeUsuario.CI)
    res.json({
        login:true,
        personal,
        msg:'datos correctos'
    })

}

const usuarioPut = async(req,res) =>{

    const {id} = req.params
    const {body} = req
    try {
        const usuario = await Usuario.findByPk(id)
        if(!usuario){
            return res.status(404).json({
                msg: 'no existe un usuario con el id ' + id
            })
        }

        await Usuario.update(body ,{
            where: {
                CI: id
            }
        })

        return res.json({
            value: true,
            msg: "datos actualizados"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "hable con el administrador"
        })
    }
}

module.exports = {
    usuarioPost,
    usuarioPut
}