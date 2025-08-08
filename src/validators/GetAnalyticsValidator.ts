import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'
import { Client } from 'numeri-core'
import { DEFAULT_LIMIT, DEFAULT_PAGE } from '../config/constants'
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
        page: z.string().default(String(DEFAULT_PAGE)),
        limit: z.string().default(String(DEFAULT_LIMIT))
    }).strict()

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

        const client = await this.clientService.getBySecret(secret)
        if (!client) {
            return res.status(404).json({ error: 'Client not found.' })
        }

        {
            (req as Request&{ client: Client }).client = client
        }

        {
            // validate the query, define and set a parsed query (pq) property
            (req as Request&{
                pq: { eventType: string, page: string, limit: string }
            }).pq = this.schema.parse(req.query)
        }

        next()
    }
}
