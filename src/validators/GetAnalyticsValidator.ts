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
        const apiKey = req.get('x-api-key')
        if (!apiKey) {
            return res.status(400).json({ error: 'Missing API key' })
        }

        if (!this.cache.has(apiKey)) {
            const client = await this.clientService.getByApiKey(apiKey)
            if (!client) {
                return res.status(404).json({ error: 'Client not found' })
            }

            this.cache.set(apiKey, client)
        }

        (req as Request&{ client: Client }).client = this.cache.get(apiKey)!

        this.schema.parse(req.query)

        next()
    }
}
