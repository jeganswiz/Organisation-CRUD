import express, { Express, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import cors from 'cors';
import userRouter from './router/user';
import * as dotenv from "dotenv";
import path from 'path';
import httpStatus from 'http-status';
import mongoose from 'mongoose';
dotenv.config({ path: path.join(__dirname, './.env') });

const startServer = async () => {
    const app: Express = express();
    
    const httpServer = http.createServer(app);
    const PORT = process.env.API_PORT;
    app.use(cors())
    app.use(bodyParser.json());

    //router
    app.use('/api', userRouter)

    // send back a 404 error for any unknown api request
    app.use((req: Request, res: Response, next: NextFunction) => {
        next(res.json({ statusCode: httpStatus.NOT_FOUND, message:'Not found' }));
    });

    //DB Connection
    
    let mongoConnectionOptions:any = { useNewUrlParser: true, useUnifiedTopology: true };
    mongoose.connect(process.env.MONGO_URI, mongoConnectionOptions)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));
  
    
    await new Promise<void>((resolve) => httpServer.listen({ port: PORT }, resolve));
    console.log(`Server ready at http://localhost:${PORT}`);
}

startServer(); 
