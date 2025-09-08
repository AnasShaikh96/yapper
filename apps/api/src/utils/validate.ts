
import type { Request, Response, NextFunction } from 'express'
import { ZodSchema, ZodTypeDef } from 'zod/v3'
import { sendResponse } from './response';
import status from 'http-status';
import { ZodType } from 'zod';

export const validateBody = (schema: ZodType<any>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const value = schema.parse(req.body);
            req.body = value;
            next();
        } catch (error) {
            sendResponse(res, status.NOT_FOUND, 'Incomplete Data', null)
        }

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


