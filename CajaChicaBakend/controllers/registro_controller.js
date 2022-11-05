

//aqui recibimos desde el front los datos de registro

const Caja_Chica = require("../models/caja_chica")
const Detalle_Factura = require("../models/detalle_factura")
const Factura = require("../models/factura")
const Saldo = require("../models/saldo")

const registroController = async(req, res) => {

    const {body} = req
    if(body.cod_factura != ""){
        //verificamos q exista la factura
        const existeCodFac = await Factura.findByPk(body.cod_factura);
        if(existeCodFac){
            //llenamos los detalles
            const detalle_fac = new Detalle_Factura({
                cod_factura: body.cod_factura,
                detalle: body.detalle,
                importe: body.importe,
                total_importe: body.importe
            })
            await detalle_fac.save()

             //actualizamos el saldo
             const id_saldo = await Saldo.max('cod_saldo')
             const {dataValues} = await Saldo.findByPk(id_saldo)

            //verificamos si es entrada o salida
            if(body.movimiento=="salida"){
                const saldoUpdate = dataValues.saldo_inicial - body.importe
                const saldo = new Saldo({saldo_inicial: saldoUpdate, fecha: body.fecha })
                
                await saldo.save()
           
            }else if(body.movimiento == "entrada"){
                const saldoUpdate = dataValues.saldo_inicial + body.importe
                const saldo = new Saldo({saldo_inicial: saldoUpdate, fecha: body.fecha })
                await saldo.save()
            }
            
            const id_detalle_fac = await Detalle_Factura.max('id_detalle_fac')
            //insertamos datos a la caja chica
            const caja_chica = new Caja_Chica({
                cod_factura: id_detalle_fac,
                movimiento: body.movimiento,
                cod_partida: body.partida,
                cod_saldo: id_saldo+1,
                beneficiario: body.beneficiario,
                observaciones: body.observaciones,
                cod_usuario: body.cod_usuario
            })

    
            await caja_chica.save()

            return res.json({
                value:true,
                msg:"datos correctos"
            })

        }else{
            console.log("no existe")
            return res.json({
                value: false,
                msg: `No hay un factura con el numero ${body.cod_factura}`
            })
        }
    }
    //cuando no hay factura, va a ver retencion 
    //bien 8%  servicio 15%
    console.log(body.retencion)
    if(body.retencion == "bien"){
        //monto retenido
        const retencion = body.importe *0.08;
        //monto importe
        const importe = body.importe - retencion
        //monto total importe
        console.log(body.importe)
        const detalle_fac = new Detalle_Factura({
            cod_factura: 0,
            detalle: body.detalle,
            fecha: body.fecha,
            importe,
            retencion,
            total_importe: body.importe
        })
        await detalle_fac.save()
    }else if(body.retencion == "servicio"){
        //monto retenido
        const retencion = body.importe *0.15;
        //monto importe
        const importe = body.importe - retencion
        //monto total importe
        console.log(body.importe)
        const detalle_fac = new Detalle_Factura({
            cod_factura: 0,
            detalle: body.detalle,
            importe,
            retencion,
            total_importe: body.importe
        })
        await detalle_fac.save()
    }
    
    //actualizamos el saldo
    const id_saldo = await Saldo.max('cod_saldo')
    const {dataValues} = await Saldo.findByPk(id_saldo)
    if(body.movimiento=="salida"){
        const saldoUpdate = dataValues.saldo_inicial - body.importe
        const saldo = new Saldo({saldo_inicial: saldoUpdate, fecha: body.fecha })
            
        await saldo.save()
    }else if(body.movimiento == "entrada"){
        const saldoUpdate = dataValues.saldo_inicial + body.importe
        const saldo = new Saldo({saldo_inicial: saldoUpdate, fecha: body.fecha })
        await saldo.save()
    }

    const id_detalle_fac = await Detalle_Factura.max('id_detalle_fac')

    //insertamos datos a la caja chica
    const caja_chica = new Caja_Chica({
        cod_factura: id_detalle_fac,
        movimiento: body.movimiento,
        cod_partida: body.partida,
        cod_saldo: id_saldo+1,
        beneficiario: body.beneficiario,
        observaciones: body.observaciones,
        cod_usuario: body.cod_usuario
    })


    await caja_chica.save()

    return res.json({
        value: true,
        msg: "Datos registrados"
    })
 
}


module.exports = registroController