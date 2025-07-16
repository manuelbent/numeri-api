import { Request, Response, NextFunction } from 'express'

/**
 * @class MalformedDataMiddleware
 */
export default class MalformedDataMiddleware {
    /**
     * Intercepts errors related to malformed JSON data in requests.
     * @param {unknown} err
     * @param {Request} _
     * @param {Response} res
     * @param {NextFunction} next
     * @returns {void}
     */
    public handle(err: unknown, _: Request, res: Response, next: NextFunction): void {
        if (err instanceof SyntaxError && 'body' in err) {
            res.status(400).json({
                error: 'Invalid JSON syntax',
                message: err.message,
            })
        } else {
            next(err)
        }
    }
}
