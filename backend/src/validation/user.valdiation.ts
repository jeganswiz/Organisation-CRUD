import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import Joi from 'joi';

export const userCreateValidation = (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object().keys({
        firstName: Joi.string().min(3).max(12).required(),
        lastName: Joi.string().min(1).max(12).required(),
        role: Joi.string().min(1).max(12).required(),
        gender: Joi.string().min(3).max(12).required(),
        phoneNumber: Joi.string().min(3).max(12).required(),
        email: Joi.string().email().min(6).max(30).required(),
        password: Joi.string().min(8).max(10).required(),
        dob: Joi.string().max(80).required(),
    });

    const validData = schema.validate(req.body)

    if (validData.error) {
        return res.json({ statusCode : httpStatus.BAD_REQUEST, message: validData.error.details[0].message })
    }
    next()
}

export const userLogin = (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object().keys({
        email: Joi.string().email().min(6).max(30).required(),
        password: Joi.string().min(8).max(10).required()
    });

    const validData = schema.validate(req.body)

    if (validData.error) {
        return res.json({ statusCode : httpStatus.BAD_REQUEST, message: validData.error.details[0].message })
    }
    next()
}

export const userLogout = (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object().keys({
        id: Joi.string().required(),
        token: Joi.string().required()
    });

    const validData = schema.validate(req.body)

    if (validData.error) {
        return res.json({ statusCode : httpStatus.BAD_REQUEST, message: validData.error.details[0].message })
    }
    next()
}


export const refreshToken = (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object().keys({
        id: Joi.string().required(),
        token: Joi.string().required()
    });

    const validData = schema.validate(req.body)

    if (validData.error) {
        return res.json({ statusCode : httpStatus.BAD_REQUEST, message: validData.error.details[0].message })
    }
    next()
}

export const userUpdateValidation = (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object().keys({
        id: Joi.string().required(),
        firstName: Joi.string().min(3).max(12),
        lastName: Joi.string().min(1).max(12),
        gender: Joi.string().min(3).max(12),
        phoneNumber: Joi.string().min(3).max(12),
        email: Joi.string().email().min(6).max(30),
        // password: Joi.string().min(8).max(10),
        dob: Joi.string().max(80),
    });

    const validData = schema.validate(req.body)

    if (validData.error) {
        return res.json({ statusCode : httpStatus.BAD_REQUEST, message: validData.error.details[0].message })
    }
    next()
}

export const deleteUser = (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object().keys({
        id: Joi.string().required()
    });

    const validData = schema.validate(req.body)

    if (validData.error) {
        return res.json({ statusCode : httpStatus.BAD_REQUEST, message: validData.error.details[0].message })
    }
    next()
}