import { NextFunction, Request, Response } from 'express'
import { Client } from 'numeri-core'
import ClientServiceInterface from '../interfaces/ClientServiceInterface'

/**
 * @class RetrieveInsightRequestValidator
 */
export default class RetrieveInsightRequestValidator {
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

        next()
    }
}

