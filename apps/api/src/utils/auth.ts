import type { Request, Response, NextFunction } from 'express'
import { config } from './config';

const jwt = require('jsonwebtoken')


export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {

    const cookies = req.cookies;
    const decodeAccessToken = jwt.verify(cookies.accessToken, config.jwt_secret);
    console.log("decodeAccessToken", decodeAccessToken)
}

export const generateToken = async (email: string, expTime: string) => {

    return jwt.sign({

    })

}