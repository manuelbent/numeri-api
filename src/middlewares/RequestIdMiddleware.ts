import { Request, Response, NextFunction } from 'express'
import * as crypto from 'node:crypto'

/**
 * @class RequestIdMiddleware
 */
export default class RequestIdMiddleware {
    /**
     * Middleware to add a unique request ID to each request.
     * @param {Request} req
     * @param {Response} _
     * @param {NextFunction} next
     * @return {void}
     */
    handle(req: Request, _: Response, next: NextFunction): void {
        (req as Request&{ id: crypto.UUID }).id = crypto.randomUUID()
        next()
    }
}
