import { Request, Response, NextFunction } from 'express'
import crypto from 'node:crypto'
import { logger } from 'numeri-core'

/**
 * @class GenericErrorMiddleware
 */
export default class GenericErrorMiddleware {
    /**
     * Handles generic errors that occur in the application.
     * @param {any} err
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} _
     * @returns {void}
     */
    handle(err: any, req: Request, res: Response, _: NextFunction): void {
        const uuid = (req as Request&{ id: crypto.UUID }).id
        logger.error({ err, uuid }, err.message)
        res.status(500).json({ message: 'An unexpected error occurred', uuid })
    }
}
