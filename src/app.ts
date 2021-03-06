/**
 * Required External Modules
 */
import express from 'express';
import { EventEmitter } from 'events';
import cors from "cors";
import helmet from "helmet";
import routes from "./routes";
import cookieParser from 'cookie-parser';
require('dotenv').config()
class App {
    public app;
    public server;
    constructor() {
        this.server = express()
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.server.use(express.json());
        this.server.use(cors());
        this.server.use(helmet());
        this.server.use(cookieParser());
        this.server.set('eventEmitter', EventEmitter);
    }

    routes() {
        this.server.use(routes);
    }
}

export default new App().server;
/**
 * App Variables
 */
/*
const eventEmitter = new EventEmitter();
app.set('eventEmitter', eventEmitter);

eventEmitter.on('start', (start, end) => {
    console.log(`started from ${start} to ${end}`)
})

eventEmitter.emit('start', 1, 100) */