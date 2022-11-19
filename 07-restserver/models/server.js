const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');


class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        

        //Connection DB
        this.connectDb();

        //Middleware
        this.middlewares();

        //Rutas
        this.routes();
    }

    async connectDb() {
        await dbConnection();
    }

    middlewares(){

        //CORS
        this.app.use(cors())

        //Lectura Body
        this.app.use(express.json())

        this.app.use(express.static('public'))

    }

    routes(){
        this.app.use(this.usuariosPath, require('../routes/user'))
    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log('process port: ', this.port);
        })
    }
}

module.exports = Server;

