const {DataTypes} = require('sequelize')
const configModel = require('../database/configModel')
const db = require('../database/connection')

const Usuario = db.define('Usuario',{

    CI:{
        type: DataTypes.STRING,
        primaryKey:true
    },
    usuario:{
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
    }
    
}, configModel)

module.exports = Usuario