import { NextFunction, Request, Response } from "express";
import getModel from "../../models/vacations/factory";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import createHttpError, { NotFound } from "http-errors";
import DTO from "../../models/vacations/dto";
import config from "config";

function convertVacationToImageUrl(vacation: DTO) {
    const vacationWithImageUrl = {
        ...vacation,
        imageUrl: `${config.get<string>('app.protocol')}://${config.get<string>('app.host')}:${config.get<number>('app.port')}/images/${vacation.image}`
    }
    delete vacationWithImageUrl.image;
    return vacationWithImageUrl;
}

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const vacations = await getModel().getAll();
        res.json(vacations.map(convertVacationToImageUrl));
    } catch (err) {
        next(err)
    }
}

export const getAllByPage = async (req: Request, res: Response, next: NextFunction) => {
    const { page, perPage } = req.query;
    const pageNumber = +page
    const recordsPerPage = +perPage
    try {
        const vacations = await getModel().getAllPages(pageNumber, recordsPerPage);
        res.json(vacations.map(convertVacationToImageUrl));
    } catch (err) {
        next(err)
    }
}

export const getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const vacation = await getModel().getOne(req.params.id);
        if (!vacation) return next();
        res.json(vacation);
    } catch (err) {
        next(err)
    }
}

export const add = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const vacation = await getModel().add(req.body);
        res.status(StatusCodes.CREATED).json(convertVacationToImageUrl(vacation));
    } catch (err) {
        next(err)
    }
}


export const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const updatedVacation = { id, ...req.body }
        const vacation = await getModel().update(updatedVacation);
        res.json(vacation);
    } catch (err) {
        next(err)
    }
}


export const patch = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const existingVacation = await getModel().getOne(id);
        const updatedVacation = { ...existingVacation, ...req.body };
        const vacation = await getModel().update(updatedVacation);
        res.json(convertVacationToImageUrl(vacation));
    } catch (err) {
        next(err)
    }
}


export const remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const isDeleted = await getModel().remove(req.params.id)
        if (!isDeleted) return next(createHttpError(NotFound(`Vacation with id ${req.params.id} is not found!`)));
        res.sendStatus(StatusCodes.NO_CONTENT)
    } catch (err) {
        next(err)
    }
}


export const getAllByStartDate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const vacationsByDate = await getModel().getAllByStartDate(req.params.date);
        res.json(vacationsByDate.map(convertVacationToImageUrl));
    } catch (err) {
        next(err)
    }
}

export const getAllByBetweenDates = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const vacationsByDate = await getModel().getAllByBetweenDates();
        res.json(vacationsByDate.map(convertVacationToImageUrl));
    } catch (err) {
        next(err)
    }
}

export const getAllByFollow = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const vacationsByFollow = await getModel().getAllByFollow(req.params.id);
        res.json(vacationsByFollow.map(convertVacationToImageUrl));
    } catch (err) {
        next(err)
    }
}