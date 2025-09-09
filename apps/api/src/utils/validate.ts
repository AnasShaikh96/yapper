
import type { Request, Response, NextFunction } from 'express'
import { sendResponse } from './response';
import status from 'http-status';
import { ZodType } from 'zod';

export const validateBody = (schema: ZodType<any>) => {
    return (req: Request, res: Response, next: NextFunction) => {

        const value = schema.safeParse({ body: req.body });

        if (value.error) {
            console.log('zod error', value.error);
            sendResponse(res, 404, 'Zod Error in Validate.ts', value.error.message)
        }

        req.body = value;
        next()
    }
}

export const validateParams = (schema: ZodType<any>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const value = schema.parse(req.params);
            req.params = value;
            next();
        } catch (error) {
            sendResponse(res, status.UNAUTHORIZED, 'User Id not found', null)
        }

    }
}


