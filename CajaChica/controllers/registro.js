const Registro = require("../models/registro")
const Saldo = require("../models/saldo")
const Partida = require('../models/partida')
const registroPost =async(req,res) => {
    let nuevoSaldo, newSaldo, retencion;
    const {movimiento,fecha,factura,partida,descripcion,importe,tipoRetencion,beneficiario,observaciones,sesion} = req.body
    
    const encontrarPartida = await Partida.find({partida})    
    console.log(encontrarPartida[0]._id)
    //registro con factura
    if(factura!=""){
        //actualizar el saldo segun es entrada y salida
        const [{saldo}] = await Saldo.find().sort({$natural: -1}).limit(1)
        if(movimiento == "entrada"){
            nuevoSaldo = Number(saldo) +Number(importe)
            newSaldo = new Saldo({saldo:nuevoSaldo,fecha})  
        }else if(movimiento == "salida"){
            nuevoSaldo = Number(saldo) - Number(importe)
            newSaldo = new Saldo({saldo:nuevoSaldo,fecha})
        }
        await newSaldo.save()
        //llenamos el registro
        
        const registro = new Registro({ movimiento,fecha,factura,partida:encontrarPartida[0]._id,descripcion,tipoRetencion,importe,retencion:null,total_importe: importe, cod_saldo: newSaldo._id, beneficiario,observaciones,sesion})
        await registro.save()
        return res.json({
            value: true,
            msg:"Registro registrado"
        })
    }else{
        //sin factura
        const [{saldo}] = await Saldo.find().sort({$natural: -1}).limit(1)
        if(movimiento == "salida"){
            nuevoSaldo = Number(saldo) - Number(importe)
            newSaldo = new Saldo({saldo:nuevoSaldo,fecha}) 
            await newSaldo.save() 
            if(tipoRetencion == "bien") retencion = (Number(importe)*0.08).toFixed(3)
            if(tipoRetencion == "servicio") retencion = (Number(importe)*0.15).toFixed(3) 
            const registro = new Registro({movimiento,fecha,factura,partida:encontrarPartida[0]._id,descripcion,tipoRetencion,importe: Number(importe) - Number(retencion),retencion,total_importe: importe, cod_saldo: newSaldo._id, beneficiario,observaciones,sesion})
            await registro.save()
            return res.json({
                value:true,
                msg:"Registro registrado"
            })
        }
        //sin factura pero de entrada
        nuevoSaldo = Number(saldo) + Number(importe)
        newSaldo = new Saldo({saldo:nuevoSaldo,fecha})
        await newSaldo.save()
        const registro = new Registro({
            movimiento,
            fecha,
            factura,
            partida:laPartida,
            descripcion,
            tipoRetencion:null,
            importe,
            retencion:null,
            total_importe: importe, 
            cod_saldo: newSaldo._id, 
            beneficiario,
            observaciones,
            sesion
        })
        await registro.save()
        return res.json(registro)
    }
}

const registroGet = async(req, res) => {
    
    const registros = await Registro.find()
        .populate('cod_saldo', 'saldo')
        .populate('beneficiario')
        .populate('partida')

  
    res.json(registros)
}

module.exports = {
    registroPost,
    registroGet
}