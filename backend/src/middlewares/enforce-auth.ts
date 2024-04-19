import { NextFunction, Request, Response } from "express";
import createHttpError, { Unauthorized } from "http-errors";
import { ReasonPhrases } from 'http-status-codes';

export default function enforceAuth(req: Request, res: Response, next: NextFunction) {
    //TODO: Delete Console log
    console.log(req.user);
    if (!req.user) return next(createHttpError(Unauthorized(ReasonPhrases.UNAUTHORIZED)));
    return next()
}