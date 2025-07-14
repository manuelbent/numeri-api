import { Request, Response } from 'express'
import AuthServiceInterface from '../interfaces/AuthServiceInterface'

/**
 * Handles requests related to analytics events.
 * @class AuthController
 */
export default class AuthController {
    /**
     * @constructor
     * @param {AuthServiceInterface} authServiceInterface
     */
    constructor(private authServiceInterface: AuthServiceInterface) {}

    /**
     * Retrieves analytics events.
     * @param {Request} req
     * @param {Response} res
     * @returns {Promise<void>}
     */
    async signup(req: Request, res: Response): Promise<void> {
        res.send('signup')
    }
}
