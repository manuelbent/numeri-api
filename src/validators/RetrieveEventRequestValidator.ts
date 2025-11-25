import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'
import { Client } from '@manuelbent/numeri-core'
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
    private params = new Set(['visitorId', 'type', 'countryCode', 'site', 'from_date', 'to_date', 'fields', 'page', 'limit'])

    /**
     * @description Allowed fields to be returned.
     * @private
     */
    private fields = ['visitorId', 'type', 'site', 'geolocation', 'countryCode', 'timestamp', 'properties'] as const

    /**
     * @param {string} key
     * @returns {boolean}
     * @private
     */
    private isKeySupported(key: string): boolean {
        return this.params.has(key) ||
            key.startsWith('properties.') ||
            key.startsWith('geolocation.')
    }

    /**
     * @private {ZodObject}
     */
    schema = z.object({
        visitorId: z.string().optional(),
        type: z.string().optional(),
        countryCode: z.string().length(2).toUpperCase().optional(),
        site: z.string().optional(),
        fields: z.string().transform(s => s.split(',')).pipe(z.array(z.enum(this.fields))).optional(),
        from_date: z.coerce.date().optional(),
        to_date: z.coerce.date().optional(),
        page: z.string().default(String(DEFAULT_PAGE)),
        limit: z.string().default(String(DEFAULT_LIMIT)),
    }).passthrough().refine((obj) => {
        for (const key in obj) {
            if (!this.isKeySupported(key)) {
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

        const { fields, ...query } = this.schema.parse(req.query)

        {
            (req as Request&{ args: RequestArgs }).args = { fields, query }
        }

        next()
    }
}
