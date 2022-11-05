
const {DataTypes} = require('sequelize')
const configModel = require('../database/configModel')
const db = require('../database/connection')

const Caja_Chica = db.define('Caja_Chica',{
   
    cod_factura:{
        type: DataTypes.INTEGER,
    },
    movimiento:{
        type: DataTypes.STRING
    },
    cod_partida:{
        type: DataTypes.INTEGER
    },
    cod_saldo:{
        type: DataTypes.INTEGER 
    },
    beneficiario:{
        type: DataTypes.STRING
    },
    observaciones:{
        type: DataTypes.TEXT
    },
    cod_usuario:{
        type: DataTypes.INTEGER
    }
}, configModel)

module.exports = Caja_Chica