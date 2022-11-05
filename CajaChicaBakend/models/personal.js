
const { DataTypes } = require('sequelize')
const configModel = require('../database/configModel')
const db = require('../database/connection')

const Personal = db.define('Personal',{
    CI:{
        type: DataTypes.STRING,
        primaryKey: true
    },
    nombre:{
        type: DataTypes.STRING
    },
    ap_paterno:{
        type: DataTypes.STRING
    },
    ap_materno:{
        type: DataTypes.STRING
    },
    direccion: {
        type: DataTypes.TEXT
    },
    telefono:{
        type: DataTypes.INTEGER
    },
    fecha_ingreso: {
        type: DataTypes.DATE
    },
    fecha_salida:{
        type: DataTypes.DATE
    },
    rol:{
        type: DataTypes.STRING
    },
    estado:{
        type: DataTypes.BOOLEAN
    },
    avatar:{
        type: DataTypes.TEXT
    }
    
}, configModel)

module.exports = Personal
