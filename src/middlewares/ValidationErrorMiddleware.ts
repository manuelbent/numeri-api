import { Request, Response, NextFunction } from 'express'
import { ZodError } from 'zod'

export default class ValidationErrorMiddleware {
    public handle(err: unknown, _: Request, res: Response, next: NextFunction) {
        if (err instanceof ZodError) {
            res.status(400).json({ error: 'Invalid request data', details: err.errors })
        } else {
            next(err)
        }
    }
}
