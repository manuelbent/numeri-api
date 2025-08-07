import { NextFunction, Request, Response } from 'express'
import { LRUCache } from 'lru-cache'
import { z } from 'zod'
import { Client } from 'numeri-core'
import ClientServiceInterface from '../interfaces/ClientServiceInterface'

/**
 * @class TrackRequestValidator
 */
export default class TrackRequestValidator {
    /**
     * @private {ZodObject}
     */
    schema = z.object({
        event: z.string(),
        properties: z.object({}).passthrough(),
        timestamp: z.string().datetime({ offset: true }).optional(),
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
            return res.status(400).json({ error: 'Missing API key.' })
        }

        const origin = req.get('origin')
        if (!origin) {
            return res.status(400).json({ error: 'Missing Origin header.' })
        }

        if (!this.cache.has(apiKey)) {
            const [client] = await this.clientService.getBy({ apiKey })
            if (!client) {
                return res.status(404).json({ error: 'Client not found.' })
            }

            this.cache.set(apiKey, client)
        }

        const client = this.cache.get(apiKey)!
        if (!(client.allowedOrigins as string[]).includes(origin)) {
            return res.status(403).json({ error: 'Origin not allowed.' })
        }

        (req as Request&{ client: Client }).client = client

        this.schema.parse(req.body)

        next()
    }
}
