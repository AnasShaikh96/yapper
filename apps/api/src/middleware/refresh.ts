
import type { Request, Response, NextFunction } from "express"
import jwt from 'jsonwebtoken';
import { config } from "../utils/config";
import { ApiError } from "../utils/ApiError";
import { generateToken } from "../utils/auth";
import { getUserByIdService } from "../models/userModel";
import type { User } from "../schema/user";


export const verifyRefreshToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { refreshToken } = req.cookies ?? {};

        if (!refreshToken) {
            return next(new ApiError(403, 'Forbidden. Refresh token not found.'));
        }

        jwt.verify(refreshToken, config.jwt_secret, async (err: jwt.VerifyErrors | null, decoded: string | jwt.JwtPayload | undefined) => {
            if (err || !decoded) {
                return next(new ApiError(403, 'Invalid or expired refresh token.'));
            }

            const decodedUser = decoded as unknown as Partial<User> & { id?: string };
            if (!decodedUser?.id) {
                return next(new ApiError(401, 'Invalid token payload.'));
            }

            const userRecords = await getUserByIdService(decodedUser.id);
            if (!userRecords || userRecords.length === 0) {
                return next(new ApiError(401, 'User no longer exists.'));
            }

            const user = userRecords[0];

            const { accessToken, refreshToken: rotatedRefreshToken } = generateToken(user as User);

            const isProd = process.env.NODE_ENV === 'production';
            const baseCookie = { ...config.cookieOptions, secure: isProd, sameSite: 'lax' as const, path: '/' };

            res
                .cookie('accessToken', accessToken, { ...baseCookie, maxAge: 24 * 60 * 60 * 1000 })
                .cookie('refreshToken', rotatedRefreshToken, { ...baseCookie, maxAge: 365 * 24 * 60 * 60 * 1000 });

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (req as any).user = user;

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (req as any).rotatedTokens = { accessToken, refreshToken: rotatedRefreshToken };

            return next();
        });

    } catch (error) {
        return next(new ApiError(403, 'Forbidden. Unable to refresh token.'));
    }
}