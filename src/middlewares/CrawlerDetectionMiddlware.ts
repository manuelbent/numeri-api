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
        const userAgent = req.headers['user-agent'] || ''

        // allow postman requests
        if (userAgent.toLowerCase().includes('postman')) {
            return next()
        }

        // block all known bots
        if (isbot(userAgent)) {
            return res.status(403).json({ error: 'Thou shalt not pass, bot!' })
        }

        next()
    }
}
