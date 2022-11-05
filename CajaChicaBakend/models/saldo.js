
const { DataTypes } = require('sequelize')
const configModel = require('../database/configModel')
const db = require('../database/connection')

const Saldo = db.define('Saldo',{
    
    cod_saldo:{
        type:DataTypes.INTEGER,
        primaryKey:true
    },
    saldo_inicial:{
        type: DataTypes.DOUBLE
    },
    fecha:{
        type:   DataTypes.DATE
    },
   
}, configModel )
module.exports = Saldo
