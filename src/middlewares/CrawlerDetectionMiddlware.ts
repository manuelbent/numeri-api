import { Request, Response, NextFunction } from 'express'
import { isbot } from 'isbot'

/**
 * @class CrawlerDetectionMiddleware
 */
export default class CrawlerDetectionMiddleware {
    /**
     * @description Detect and handle web crawlers.
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction }next
     */
    public async handle(req: Request, res: Response, next: NextFunction) {
        if (process.env.NODE_ENV !== 'dev' && isbot(req.get('user-agent'))) {
            res.status(403).json({ error: 'Thou shalt not pass, bot!' })
        } else {
            next()
        }
    }
}
