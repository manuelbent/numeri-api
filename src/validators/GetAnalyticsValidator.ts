import { NextFunction, Request, Response } from 'express'
import { LRUCache } from 'lru-cache'
import { z } from 'zod'
import { Client } from 'numeri-core'
import ClientServiceInterface from '../interfaces/ClientServiceInterface'

/**
 * @class GetAnalyticsValidator
 */
export default class GetAnalyticsValidator {
    /**
     * @private {ZodObject}
     */
    schema = z.object({
        eventType: z.string(),
        //
    }).strict()

    /**
     * @private {LRUCache}
     */
    private cache = new LRUCache<string, Client>({ max: 100 })

    /**
     * @constructor
     * @param {ClientServiceInterface} clientService
     */
    constructor(private clientService: ClientServiceInterface) {}

    /**
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     */
    async validate(req: Request, res: Response, next: NextFunction) {
        const secret = req.get('x-secret-key')
        if (!secret) {
            return res.status(400).json({ error: 'Missing secret key.' })
        }

        if (!this.cache.has(secret)) {
            const client = await this.clientService.getBySecret(secret)
            if (!client) {
                return res.status(404).json({ error: 'Client not found' })
            }

            this.cache.set(secret, client)
        }

        (req as Request&{ client: Client }).client = this.cache.get(secret)!

        this.schema.parse(req.query)

        next()
    }
}
