import { Request, Response, NextFunction } from 'express'

export default class MalformedDataMiddleware {
    public handle(err: unknown, _: Request, res: Response, next: NextFunction) {
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
