const { Schema, model } = require("mongoose");

const PartidaSchema = Schema({
    partida:{
        type: Number
    },
    categoria:{
        type: String
    }
})

PartidaSchema.methods.toJSON = function(){
    const {__v, ...data } = this.toObject();   
    return data;
}

module.exports = model('Partida', PartidaSchema)