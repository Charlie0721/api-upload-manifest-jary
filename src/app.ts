import express, { Application, Request } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import IndexRoutes from './routes/IndexRoutes'
import Database from './db';
import dotenv from 'dotenv';
dotenv.config();
export class App {

    private app: Application;
    constructor(private port?: number | string) {
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes()
        Database;
    }
    settings() {
        this.app.set('port', this.port || process.env.PORT || 4500);
    }

    middlewares() {

        this.app.use(morgan('dev'));
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(express.json({ limit: '50mb' }));
        this.app.use(cors());

    }
    routes() {

        this.app.use('/api/v1', IndexRoutes)
    }
    async listen() {

        await this.app.listen(this.app.get('port'));
        console.log('server on port ', this.app.get('port'))

    }

}


