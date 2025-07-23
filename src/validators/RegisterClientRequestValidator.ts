import { Request, Response, NextFunction } from 'express'
import { z } from 'zod'
import ClientServiceInterface from '../interfaces/ClientServiceInterface'

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
     */
    constructor(private clientService: ClientServiceInterface) {}

    /**
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     */
    async validate(req: Request, res: Response, next: NextFunction) {
        const bearer = req.headers['authorization']?.split(' ')[1]
        if (!bearer) {
            return res.status(401).json({ message: 'Unauthorized' })
        }

        if (bearer !== process.env.ADMIN_BEARER) {
            return res.status(403).json({ message: 'Forbidden' })
        }

        // validate the request body
        this.schema.parse(req.body)

        const client = await this.clientService.getBy({ name: req.body.name, ownerEmail: req.body.ownerEmail })
        if (client.length) {
            return res.status(409).json({ error: 'Client already exists' })
        }

        next()
    }
}
