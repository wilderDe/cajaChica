require('dotenv').config()

const express =  require('express')
const cors = require('cors')
const db = require('../database/connection')
const fileUpload = require('express-fileupload');

class Server{

    constructor(){
        this.app= express()
        this.port = process.env.PORT

        this.paths = {
            personal: '/api/personal',
            usuario: '/api/usuario',
            partida: '/api/partida',
            uploads: '/api/upload',
          
            registroController: '/api/registro'
        }

        this.dbConnection();
        this.middleware();

        this.routes();

    }

    async dbConnection(){
        try {
            
            await db.authenticate();
            console.log('Database online')
            
        } catch (error) {
            throw new Error(error)
        }
    }

    routes(){
        this.app.use(this.paths.personal, require('../routes/personal'))
        this.app.use(this.paths.usuario, require('../routes/usuario'))
        this.app.use(this.paths.partida, require('../routes/partida'))
        this.app.use(this.paths.uploads, require('../routes/uploads'))
    
        this.app.use(this.paths.registroController, require('../routes/registro_routes'))
    }
    
    middleware(){
        //cors
        this.app.use(cors())
        //carpeta publica
        this.app.use(express.static('public'))
        //lectura y parseo del body
        this.app.use(express.json())
        //para manejar la carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/'
        }));
    }

    listen(){
        this.app.listen(this.port, ()=> console.log("Servidor en el puerto ", this.port ))
    }
}

module.exports = Server;