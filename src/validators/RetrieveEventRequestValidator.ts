import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'
import { Client } from 'numeri-core'
import { DEFAULT_LIMIT, DEFAULT_PAGE } from '../config/constants'
import ClientServiceInterface from '../interfaces/ClientServiceInterface'

/**
 * @class RetrieveEventRequestValidator
 */
export default class RetrieveEventRequestValidator {
    /**
     * @description Allowed query parameters.
     * @private
     */
    private params = new Set(['visitorId', 'eventType', 'countryCode', 'site', 'page', 'limit'])

    /**
     * @private {ZodObject}
     */
    schema = z.object({
        visitorId: z.string().optional(),
        eventType: z.string().optional(),
        countryCode: z.string().length(2).toUpperCase().optional(),
        site: z.string().optional(),
        page: z.string().default(String(DEFAULT_PAGE)),
        limit: z.string().default(String(DEFAULT_LIMIT)),
    }).passthrough().refine((obj) => {
        for (const key in obj) {
            if (!this.params.has(key) && !key.startsWith('properties.')) {
                throw new z.ZodError([{
                    code: z.ZodIssueCode.unrecognized_keys,
                    keys: [key],
                    path: [],
                    message: `Unrecognized key(s) in object: '${key}'`
                }])
            }
        }
        return true
    })

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
                pq: { page: string, limit: string }
            }).pq = this.schema.parse(req.query)
        }

        next()
    }
}
