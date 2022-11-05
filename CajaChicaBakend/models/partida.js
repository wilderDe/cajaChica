
const { DataTypes } = require('sequelize')
const configModel = require('../database/configModel')
const db = require('../database/connection')

const Partida= db.define('Partida',{
    cod_partida:{
        type:DataTypes.INTEGER,
    
    },
    categoria:{
        type: DataTypes.STRING
    }
    
}, configModel)

module.exports = Partida
