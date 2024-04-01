import { NextFunction, Request, Response } from "express";

export default function addImageToBody(req: Request, res: Response, next: NextFunction) {
    req.body.imageFile = req.files?.imageFile;
    return next();
}