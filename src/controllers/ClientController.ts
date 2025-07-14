import { Request, Response } from 'express'
import ClientServiceInterface from '../interfaces/ClientServiceInterface'

/**
 * Handles requests related to analytics events.
 * @class ClientController
 */
export default class ClientController {
    /**
     * @constructor
     * @param {ClientServiceInterface} clientServiceInterface
     */
    constructor(private clientServiceInterface: ClientServiceInterface) {}

    /**
     * Retrieves analytics events.
     * @param {Request} req
     * @param {Response} res
     * @returns {Promise<void>}
     */
    async register(req: Request, res: Response): Promise<void> {
        res.send('register')
    }
}
