import { NextFunction, Request, Response } from "express";
import getModel from "../../models/followers/factory";
import { StatusCodes } from "http-status-codes";
import createHttpError, { NotFound } from "http-errors";


export const getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const followers = await getModel().getAll();
        res.json(followers);
    } catch (err) {
        next(err)
    }
}

export const getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const follower = await getModel().getOne(req.params.id);
        if (!follower) return next();
        res.json(follower);
    } catch (err) {
        next(err)
    }
}

export const getFollows = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const follows = await getModel().getFollows(req.params.id);
        if (follows.length === 0) {
            return next();
        }
        res.json(follows);
    } catch (err) {
        next(err);
    }
}

export const add = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const addedFollower = await getModel().follow(req.body);
        res.status(StatusCodes.CREATED).json(addedFollower);
    } catch (err) {
        next(err)
    }
}

export const remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const isDeleted = await getModel().unFollow(req.params.id)
        if (!isDeleted) return next(createHttpError(NotFound(`User not found.`)));
        res.sendStatus(StatusCodes.NO_CONTENT)
    } catch (err) {
        next(err)
    }
}

export const followsCounter = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const followers = await getModel().followsCounter(req.params.id);
        if (!followers) return next();
        res.json(followers);
    } catch (err) {
        next(err)
    }
}

