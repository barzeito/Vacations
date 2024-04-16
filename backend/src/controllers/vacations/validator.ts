import Joi from "joi"
import DTO from '../../models/vacations/dto';

export const addVacationValidator = Joi.object<DTO>({
    destination: Joi.string().min(4).required(),
    description: Joi.string().min(6).required(),
    startDate: Joi.date().greater('now').required(),
    endDate: Joi.date().greater(Joi.ref('startDate')).required(),
    price: Joi.number().min(100).max(10000).positive().required(),
    imageFile: Joi.object({
        minetype: Joi.string().valid('image/jpg', 'image/jpeg', 'image/png')
    }).unknown(true).optional()
});