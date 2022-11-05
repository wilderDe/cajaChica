
const { Schema, model } = require("mongoose");

const RegistroSchema = Schema({
    movimiento:{
        type: String
    },
    fecha:{
        type: String
    },
    factura:{
        type: String
    },
    partida:{
        type: Schema.Types.ObjectId,
        ref: 'Partida'
    },
    descripcion:{
        type: String
    },
    tipoRetencion:{
        type: String
    },
    importe:{
        type: Number
    },
    retencion:{
        type: Number
    },
    total_importe:{
        type: Number
    },
    cod_saldo:{
        type: Schema.Types.ObjectId,
        ref: 'Saldo'
    },
    beneficiario:{
        type: String
    },
    observaciones:{
        type: String
    },
    sesion:{
        type: Schema.Types.ObjectId,
        ref:'Usuario'
    }
})

RegistroSchema.methods.toJSON = function(){
    const {__v, ...data } = this.toObject();
    
    return data;
}

module.exports = model('Registro', RegistroSchema)