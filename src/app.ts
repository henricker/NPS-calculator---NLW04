import 'reflect-metadata';
import express from 'express';
import 'express-async-errors';
import createConnection from './database';

//middlewares
import validateMiddleware from './app/middlewares/ValidationMiddleware';

//routes
import { userRouter }  from './routes/User.route';
import { surveyRouter } from './routes/Survey.route';
import { mailRouter } from './routes/Mail.route';
import { NPSrouter } from './routes/Nps.route';
 

createConnection()
const app = express();

// appConfig
  //body with json
  app.use(express.json());
  
  //routes
  app.use(userRouter);
  app.use(surveyRouter);
  app.use(mailRouter);
  app.use(NPSrouter);
  
  //middlewares
  app.use(validateMiddleware);

export { app }