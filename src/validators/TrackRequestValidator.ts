import { NextFunction, Request, Response } from 'express'
import { LRUCache } from 'lru-cache'
import { z } from 'zod'
import ClientServiceInterface from '../interfaces/ClientServiceInterface'
import BaseRequestValidator from './BaseRequestValidator'
import Client from '../models/Client'

/**
 * @class TrackRequestValidator
 */
export default class TrackRequestValidator extends BaseRequestValidator {
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
    constructor(private clientService: ClientServiceInterface) {
        super()
    }

    /**
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     */
    async validate(req: Request, res: Response, next: NextFunction) {
        const clientId = req.get('x-client-id')
        if (!clientId) {
            return res.status(400).json({ error: 'x-client-id header is required' })
        }

        const origin = req.get('origin')
        if (!origin) {
            return res.status(400).json({ error: 'Origin header is required' })
        }

        if (!this.cache.has(clientId)) {
            const [client] = await this.clientService.getBy({ clientId })
            if (!client) {
                return res.status(404).json({ error: 'Client not found' })
            }

            this.cache.set(clientId, client)
        }

        const client = this.cache.get(clientId)!
        if (!(client.allowedOrigins as string[]).includes(origin)) {
            return res.status(403).json({ error: 'Origin not allowed' })
        }

        super.validate(req, res, next)
    }
}
