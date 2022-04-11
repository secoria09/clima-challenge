const express = require('express');
const { API_VERSION, SERVER_PORT } = require('./constants');
const routes = require('./routes');

class Server {

    constructor() {
        this.app = express();
        this.port = SERVER_PORT;
        this.basePath = `/${API_VERSION}`;
        this.routes();
    }

    middlewares() {
        this.app.use( express.json() );
    }
    
    routes() {
        this.app.use(this.basePath, routes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }
}

module.exports = Server;