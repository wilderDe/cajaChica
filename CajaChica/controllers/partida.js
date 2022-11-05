const Partida = require('../models/partida')

const partidaPost = async(req, res) =>{

    const {partida,categoria} = req.body
    const NewPartida = new Partida({partida, categoria})
    await NewPartida.save()
    res.json({
        value: true,
        msg: "Partida agregada"
    })
}

const partidaGet = async(req, res) =>{
    const partida = await Partida.find()

    res.json(partida)
}

const partidaPut = async(req, res) =>{
    const {id} = req.params
    const {body} = req
    const partida = await Partida.findByIdAndUpdate(id,body);

    res.json(partida)
}

module.exports = {
    partidaPost,
    partidaGet,
    partidaPut

}