const Partida = require("../models/partida")


const partidGet = async(req, res) => {
    const partida = await Partida.findAll()
    res.json(partida)
}

const partidaPost = async(req, res) => {
    const {body} = req

    const partida = new Partida(body)
    await partida.save()
    res.json({
        partida     
    })

}

module.exports = {
    partidGet,
    partidaPost
}