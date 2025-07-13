import { Request, Response, NextFunction } from 'express'
import * as crypto from 'node:crypto'

export default class RequestIdMiddleware {
    handle(req: Request, _: Response, next: NextFunction) {
        (req as Request&{ id: crypto.UUID }).id = crypto.randomUUID()
        next()
    }
}
