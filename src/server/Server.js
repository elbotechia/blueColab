import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import dbConnect from '../config/mongoose.js';
import MainRouter from '../routes/mainRouter.js';
import expressEjsLayouts from 'express-ejs-layouts';
dotenv.config();

export class Server{

    constructor(){
        this.app = express();
        this.port = Number(process.env.PORT) || 3000;
        this.mainPath="/"
        this.mainRouter = new MainRouter();
        this.expressEjsLayouts = expressEjsLayouts;
        // Middlewares
        this.middlewares();

        // Routes
        this.routes();
    }


    middlewares(){
           // Connect to the database
        dbConnect();
        // CORS
        this.app.use(cors());

        // Body parser
        this.app.use(express.json());

        // Morgan for logging
        this.app.use(morgan('dev'));

        // Serve static files
        this.app.use(express.static(path.resolve('public')));
                this.app.use(express.static(path.resolve('UPLOADS')));

    this.app.set("views", path.resolve("views"));
    this.app.set("view engine", "ejs");
    this.app.use(this.expressEjsLayouts);
    this.app.set('layout', 'layout'); // ou outro nome, sem .ejs
    this.app.set('layout extractScripts', true); // opcional

    }


    routes(){
        this.app.use(this.mainPath, this.mainRouter.getRouter())
    }


    listen(){
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }

}