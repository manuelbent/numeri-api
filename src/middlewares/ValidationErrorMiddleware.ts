import { Request, Response, NextFunction } from 'express'
import { ZodError } from 'zod'

/**
 * @class ValidationErrorMiddleware
 */
export default class ValidationErrorMiddleware {
    /**
     * Handles validation errors thrown by Zod schemas.
     * @param {unknown} err
     * @param {Request} _
     * @param {Response} res
     * @param {NextFunction} next
     * @returns {void}
     */
    public handle(err: unknown, _: Request, res: Response, next: NextFunction): void {
        if (err instanceof ZodError) {
            res.status(400).json({ error: 'Invalid request data.', details: err.errors })
        } else {
            next(err)
        }
    }
}
