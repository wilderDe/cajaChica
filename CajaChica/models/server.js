require('dotenv').config();
const express = require('express')
const cors = require('cors');
const fileUpload = require('express-fileUpload');
const dbConnection = require('../database/config');
class Server{

    constructor(){
        this.app = express()
        this.port = process.env.PORT
        this.paths = {
            partida:    '/api/partida',
            usuario:    '/api/usuario',
            saldo:      '/api/saldo',
            registro:   '/api/registro'
        }


        this.conectarDB()
        this.middlewares()
        this.routes()
    }


    middlewares(){
        this.app.use(cors())
        this.app.use(express.static('public'))
        this.app.use(express.json());
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath:true //esto es peligroso, trabaja de forma manual crendo de forma manual
        }));
    }

    async conectarDB(){
        await dbConnection()
    }

    routes(){
        this.app.use(this.paths.partida, require('../routes/partida'))
        this.app.use(this.paths.usuario, require('../routes/usuario'))
        this.app.use(this.paths.saldo, require('../routes/saldo'))
        this.app.use(this.paths.registro, require('../routes/registro'))
    }
    listen(){
        this.app.listen(this.port, ()=>(console.log("Servidor en el puerto: "+this.port)))
    }
   
}

module.exports = Server
