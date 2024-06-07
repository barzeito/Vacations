import { NextFunction, Request, Response } from "express";
import { v4 } from "uuid";
import addImageToBody from "./add-image-to-body";

describe(`addImageToBody Middleware unit test`, () => {
    test(`Check if image is added to body`, () => {
        const req = {
            body: {},
            files: { image: v4() }
        } as unknown as Request;
        const res = {} as Response;
        const next = (() => { }) as NextFunction
        addImageToBody(req, res, next);
        expect(req.body).toHaveProperty('imageFile')
        expect(req.body.image).toEqual(req.files.imageFile)
    })
})