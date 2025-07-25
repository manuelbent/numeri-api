import { Request, Response } from 'express'
import { logger } from 'numeri-core'
import ClientServiceInterface from '../interfaces/ClientServiceInterface'

/**
 * Handles requests related to analytics events.
 * @class ClientController
 */
export default class ClientController {
    /**
     * @constructor
     * @param {ClientServiceInterface} clientService
     */
    constructor(private clientService: ClientServiceInterface) {}

    /**
     * Registers a new client and returns the API key and secret.
     * @param {Request} req
     * @param {Response} res
     * @returns {Promise<void>}
     */
    async register(req: Request, res: Response): Promise<void> {
        const [apiKey, secret] = await this.clientService.register(req.body)
        logger.info(`Client registered with API key: ${apiKey}`)
        res.status(200).json({ apiKey, secret })
    }
}
