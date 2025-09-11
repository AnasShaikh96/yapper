
import type { Request, Response, NextFunction } from "express"
import jwt from 'jsonwebtoken';
import { config } from "../utils/config";
import { errorHandler } from "../utils/ApiError";

export const verifyRefreshToken = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { refreshToken } = req.cookies;


        if (!refreshToken) {
            errorHandler({ statusCode: 403, message: 'Forbidden. Refresh Token not found.' }, req, res, next)
        }

        jwt.verify(refreshToken, config.jwt_secret, function (err, decoded) {

            if (err) {
                errorHandler({ statusCode: 403, message: 'Invalid or Expired Refresh Token.' }, req, res, next)
            } else {

            }
        })

    } catch (error) {

        res.status(403).json({
            status: '403',
            message: 'Forbidden. Refresh token not found'
        })

    }
}