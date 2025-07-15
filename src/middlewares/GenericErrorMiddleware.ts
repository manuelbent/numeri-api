import { Request, Response, NextFunction } from 'express'
import crypto from 'node:crypto'
import { logger } from 'numeri-core'

export default class GenericErrorMiddleware {
    handle(err: any, req: Request, res: Response, _: NextFunction) {
        const uuid = (req as Request&{ id: crypto.UUID }).id
        logger.error({ err, uuid }, err.message)
        res.status(500).json({ message: 'An unexpected error occurred', uuid })
    }
}
