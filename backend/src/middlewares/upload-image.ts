import config from "config";
import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import path from "path";
import { promisify } from "util";
import { v4 } from "uuid";

export default async function uploadImage(req: Request, res: Response, next: NextFunction) {
    if (!req.body.imageFile) return next();

    const image = req.body.imageFile as UploadedFile;
    const imageName = `${v4()}${path.extname(image.name)}`;
    const mvPromisify = promisify(image.mv).bind(image);
    try {
        const fileAbsolutePath = path.resolve(config.get<string>('app.images.path'), imageName);
        await mvPromisify(fileAbsolutePath);
        req.body.image = imageName;
        return next();
    } catch (err) {
        next(err)
    }

}