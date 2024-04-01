import { NextFunction, Request, Response } from "express";
import getModel from "../../models/users/factory";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import config from 'config';
import createHttpError, { Unauthorized } from "http-errors";

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await getModel().getAll();
        res.json(users);
    } catch (err) {
        next(err)
    }
}

export const getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await getModel().getOne(req.params.id);
        console.log('Retrieved user:', user);
        if (!user) return next();
        res.json(user);
    } catch (err) {
        next(err)
    }
}