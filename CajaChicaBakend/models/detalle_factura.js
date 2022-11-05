
const { DataTypes } = require('sequelize')
const configModel = require('../database/configModel')
const db = require('../database/connection')

const Detalle_Factura = db.define('Detalle_Factura',{
    id_detalle_fac:{
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    cod_factura:{
        type:DataTypes.INTEGER,
    },
    detalle:{
        type: DataTypes.TEXT
    },
    importe:{
        type: DataTypes.DOUBLE
    },
    retencion:{
        type: DataTypes.DOUBLE
    },
    total_importe:{
        type: DataTypes.DOUBLE
    }
    
}, configModel)

module.exports = Detalle_Factura
