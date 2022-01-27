import 'reflect-metadata';
import express from 'express';
import flash from 'connect-flash';
import session from 'express-session';
import pageRoute from './routes/pageRoute';
import userRoute from './routes/userRoute';
import cookieParser from 'cookie-parser';
import { Request, Response, NextFunction } from 'express';
import { connectDB } from './config/database';
import { getConnection } from 'typeorm';
import { TypeormStore } from 'typeorm-store';
import { Session } from './entity/Session';
require('./config/database').connect();
import 'reflect-metadata';
import { createConnection } from 'typeorm';

const app = express();
//* Connect to DB
createConnection()
  .then(async (connection) => {
    //Middlewares
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static('public'));
    app.use(express.json());
    app.use(cookieParser());
    const repository = getConnection().getRepository(Session);

    app.use(
      session({
        secret: 'secret',
        resave: false,
        saveUninitialized: false,
        store: new TypeormStore({ repository }),
      })
    );
    app.use(flash());
    app.use((req: Request, res: Response, next: NextFunction) => {
      res.locals.flashMessages = req.flash();
      next();
    });

    //* Template engine settings
    app.set('view engine', 'ejs');

    //* Router
    app.use('/', pageRoute);
    app.use('/user', userRoute);

    const PORT = 3000;
    app.listen(PORT, () => {
      console.log(`Started in port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));
