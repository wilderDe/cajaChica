const {Sequelize} = require('sequelize')

const db = new Sequelize('CAJA', 'root', '',{
    host: 'localhost',
    dialect: 'mariadb',
    //logging: false
})


module.exports = db;
