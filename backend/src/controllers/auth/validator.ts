import Joi from "joi"
import UserDTO from '../../models/users/dto';
import CredentialsDTO from "../../models/auth/credential-dto";

export const signupValidator = Joi.object<UserDTO>({
    email: Joi.string().email().regex(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).required().messages({
        'string.empty': 'Email is required',
        'any.required': 'Email is required',
        'string.pattern.base': 'Please enter a valid email address',
    }),
    password: Joi.string().min(6).required().messages({
        'string.empty': 'Password is required',
        'any.required': 'Password is required',
        'string.min': 'Password must be at least {#limit} characters long',
    }),
    firstName: Joi.string().min(2).max(20).required().messages({
        'string.empty': 'First Name is required',
        'any.required': 'First Name is required',
        'string.min': 'First Name must be at least {#limit} characters long',
    }),
    lastName: Joi.string().min(2).max(20).required().messages({
        'string.empty': 'Last Name is required',
        'any.required': 'Last Name is required',
        'string.min': 'Last Name must be at least {#limit} characters long',
    })
});

export const loginValidator = Joi.object<CredentialsDTO>({
    email: Joi.string().regex(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).required().messages({
        'string.empty': 'Email is required',
        'any.required': 'Email is required',
        'string.pattern.base': 'Please enter a valid email address',
    }),
    password: Joi.string().min(6).required().messages({
        'string.empty': 'Password is required',
        'any.required': 'Password is required',
        'string.min': 'Password must be at least {#limit} characters long',
    }),
});