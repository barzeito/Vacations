import express from "express";
import usersRouter from './routers/users';
import config from "config";
import { notFound } from "./middlewares/not-found";
import { errorHandler } from "./middlewares/error-handler";
import cors from 'cors';
import authentication from "./middlewares/authentication";
import authRouter from './routers/auth';
import followersRouter from './routers/followers';
import vacationRouter from './routers/vacations';
import expressFileUpload from 'express-fileupload';
import path from "path";

//TODO: Check Auth (All functions)
//TODO: Check Vacation (All functions)/ Fix update[PUT]
//TODO: validation for vacation add/update/patch

const server = express();
server.use(authentication);
server.use(cors());
server.use(express.json());
server.use(expressFileUpload());

server.use('/api/users', usersRouter)
server.use('/api/vacations', vacationRouter)
server.use('/images', express.static(path.resolve(config.get<string>('app.images.path'))))
server.use('/api', authRouter)
server.use('/api/followers', followersRouter)


// special middleware for not found error
server.use(notFound)

// error middlewares
server.use(errorHandler)

export default server;
