const Saldo = require('../models/saldo')

const saldoPost=async(req,res) =>{

    const {saldo,fecha} = req.body

    const newSaldo = new Saldo({saldo,fecha})

    await newSaldo.save()
    res.json({
        value:true,
        msg:"Saldo ingresado"
    })
}

const saldoGet = async (req, res) =>{
    
    const saldos = await Saldo.find()

    res.json(saldos)
}

const ultimoSaldo = async(req, res) => {
    const ultimo = await Saldo.find().sort({$natural: -1}).limit(1)

    res.json(ultimo)
}

module.exports = {
    saldoPost,
    ultimoSaldo,
    saldoGet
}