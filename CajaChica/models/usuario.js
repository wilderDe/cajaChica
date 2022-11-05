

const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema({
    ci:{
        type: String
    },
    nombre:{
        type: String
    },
    ap_paterno:{
        type: String
    },
    ap_materno:{
        type: String
    },
    direccion: {
        type: String
    },
    telefono:{
        type: String
    },
    fecha_ingreso: {
        type: String
    },
    fecha_salida:{
        type: String
    },
    rol:{
        type: String
    },
    estado:{
        type: Boolean,
        default: true
    },
    avatar:{
        type: String
    },
    usuario:{
        type: String
    },
    password: {
        type: String
    }
})

UsuarioSchema.methods.toJSON = function(){
    const {__v, ...data } = this.toObject();
    
    return data;
}

module.exports = model('Usuario', UsuarioSchema)