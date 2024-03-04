import jwt from 'jsonwebtoken';
import httpStatus from "http-status";
import { Request, Response, NextFunction } from 'express';
import config from "../config/config";

export const authenicate = async (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers.authorization;
    if (token) {
        const authenticationScheme = 'Bearer ';
        if (token.startsWith(authenticationScheme)) {
            token = token.slice(authenticationScheme.length, token.length);
        }
        const decode = jwt.verify(token, config.jwt.secret);
        next()
    } else {
        return res.json({ statusCode : httpStatus.BAD_REQUEST, message: "Token not found!" })
    }
};