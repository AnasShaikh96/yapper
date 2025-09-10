import type { Request, Response, NextFunction } from 'express'
import { config } from './config';
import { User } from '../schema/user';
import { ApiError } from './ApiError';

const jwt = require('jsonwebtoken')


export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { accessToken, refreshToken } = req.cookies;
        const decodeAccessToken = jwt.verify(accessToken, config.jwt_secret);
        // const decodeRefreshToken = jwt.verify(refreshToken, config.jwt_secret);

        req.user = decodeAccessToken;

        next()
    } catch (error) {
        throw new ApiError(401, 'Invalid or Unauthorized Token');
    }
}

export const generateToken = (user: User, expTime: string) => {


    const encodedToken = jwt.sign(user, config.jwt_secret, { expiresIn: expTime });

    // console.log("jwt token", encodedToken)
    return encodedToken
}