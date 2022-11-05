const { Schema, model } = require("mongoose");

const SaldoSchema = Schema({
    saldo:{
        type: Number
    },
    fecha:{
        type: String
    }
})

SaldoSchema.methods.toJSON = function(){
    const {__v, ...data } = this.toObject();
    
    return data;
}

module.exports = model('Saldo', SaldoSchema)