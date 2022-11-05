
const Personal = require("../models/personal");
const Usuario = require("../models/usuario");


const personalGet = async(req, res) => {

    const personals = await Personal.findAll();
    
    res.json( personals)

}
const personalGetId = async(req, res) => {
    const {id} = req.params
    const personal = await Personal.findByPk(id)

    if(personal){
        res.json(personal)
    }else{
        res.status(404).json({
            msg: `No existe un personal con el id: ${id} `
        })
    }
}
const personalPost = async(req, res) => {
    const {body} = req
    const {CI} = body
    const personal = new Personal(body)
    const usuario = new Usuario({
        usuario: CI,
        password: CI,
        CI,
    })
    await personal.save()
    await usuario.save()
    res.json({
        personal, usuario
    })
}

const personalPut = async(req, res) => {
    const {id} = req.params
    const {body} = req
    try {
        const personal = await Personal.findByPk(id)
        if(!personal){
            return res.status(404).json({
                msg: 'no existe un personal con el id ' + id
            })
        }
        await personal.update(body)
        res.json(personal)
    } catch (error) {
        res.status(500).json({
            msg: "hable con el administrador"
        })
    }
}

const personalDelete =  async(req, res) => {

    const {id} = req.params
    const personal = await Personal.findByPk(id)
    if(!personal){
        return res.status(404).json({
            msg: 'no existe un personal con el id ' + id
        })
    }

    await Personal.update({
        estado: false
    } ,{where: {
            CI: id
        }
    })
    res.json({
        value: true,
        msg:"personal dado de baja"
    })
    

}


module.exports = {
    personalGet,
    personalGetId,
    personalPost,
    personalPut,
    personalDelete
}