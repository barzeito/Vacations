import { NextFunction, Request, Response } from "express";
import getModel from "../../models/auth/factory";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import config from 'config';
import createHttpError, { Unauthorized, BadRequest } from "http-errors";
import { generateJWT } from "../../utils/crypto";

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const existingUser = await getModel().getByEmail(req.body.email);
        if (existingUser) {
            return next(createHttpError(BadRequest('User with this email already exists')));
        }
        const user = await getModel().signUp(req.body);
        const jwt = generateJWT(user, config.get<string>('app.jwt.secret'), config.get<string>('app.jwt.expires'))
        res.status(StatusCodes.CREATED).json({ jwt });
    } catch (err) {
        next(createHttpError(Unauthorized(ReasonPhrases.UNAUTHORIZED)))
    }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await getModel().login(req.body);
        if (!user) return next(createHttpError(Unauthorized('Could not find username or password')));
        const jwt = generateJWT(user, config.get<string>('app.jwt.secret'), config.get<string>('app.jwt.expires'))
        res.json({ jwt });
    } catch (err) {
        return next(createHttpError(Unauthorized(ReasonPhrases.UNAUTHORIZED)));
    }
}

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await getModel().isAdmin(req.params.id);
        if (!user) return next(createHttpError(Unauthorized('User is not Admin')));
        res.json(true);
    } catch (err) {
        return next(createHttpError(Unauthorized(ReasonPhrases.UNAUTHORIZED)));
    }
}