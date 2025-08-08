import { Request, Response, NextFunction } from 'express'
import { z } from 'zod'
import ClientServiceInterface from '../interfaces/ClientServiceInterface'
import OneTimeCodeServiceInterface from '../interfaces/OneTimeCodeServiceInterface'

/**
 * @class RegisterClientRequestValidator
 */
export default class RegisterClientRequestValidator {
    /**
     * @private {ZodObject}
     */
    schema = z.object({
        name: z.string(),
        ownerEmail: z.string().email(),
        allowedOrigins: z.array(z.string()),
    }).strict()

    /**
     * @constructor
     * @param {ClientServiceInterface} clientService
     * @param {OneTimeCodeServiceInterface} oneTimeCodeService
     */
    constructor(private clientService: ClientServiceInterface, private oneTimeCodeService: OneTimeCodeServiceInterface) {}

    /**
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     */
    async validate(req: Request, res: Response, next: NextFunction) {
        const { code } = req.query
        if (!code) {
            return res.status(400).json({ error: 'Missing registration code.' })
        }

        // validate the one-time code
        const oneTimeCode = await this.oneTimeCodeService.getByCode(code as string)
        if (!oneTimeCode) {
            return res.status(400).json({ error: 'Invalid registration code.' })
        }
        if (oneTimeCode.expiresAt < new Date()) {
            return res.status(400).json({ error: 'Registration code has expired.' })
        }
        if (oneTimeCode.usedAt) {
            return res.status(400).json({ error: 'Registration code has already been used.' })
        }

        // validate the request body
        this.schema.parse(req.body)

        const client = await this.clientService.getBy({ name: req.body.name, ownerEmail: req.body.ownerEmail })
        if (client.length) {
            return res.status(409).json({ error: 'Client already exists.' })
        }

        next()
    }
}
