
const { DataTypes } = require('sequelize')
const configModel = require('../database/configModel')
const db = require('../database/connection')

const Factura = db.define('Factura',{
    cod_factura:{
        type:DataTypes.INTEGER,
        primaryKey:true
    },
    monto_total:{
        type: DataTypes.DOUBLE
    },
    fecha_factura:{
        type: DataTypes.DATE
    }
    
}, configModel)

module.exports = Factura
