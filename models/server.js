const express = require('express');
const cors = require('cors');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';

        //Middlewares
        this.middlewares();

        //rutas de mi aplicacion
        this.routes();
    }

    middlewares(){

        //CORS
        this.app.use(cors());

        //Lectura y parsei del body
        this.app.use(express.json());

        //Directorio Publico
        this.app.use(express.static('public'));

    }

    routes(){
       this.app.use(this.usersPath, require('../routers/users'))
    }

    listen(){

        this.app.listen(this.port, () => {
            console.log(`Server listen in http://localhost:${this.port}`);
        });
    }

}

module.exports = Server;