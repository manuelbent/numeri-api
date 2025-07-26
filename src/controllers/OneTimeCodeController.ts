import { Request, Response } from 'express'
import OneTimeCodeServiceInterface from '../interfaces/OneTimeCodeServiceInterface'

/**
 * Handles requests related to one-time codes.
 * @class OneTimeCodeController
 */
export default class OneTimeCodeController {
    /**
     * @constructor
     * @param {OneTimeCodeServiceInterface} oneTimeCodeService
     */
    constructor(private oneTimeCodeService: OneTimeCodeServiceInterface) {}

    /**
     * @param {Request} _
     * @param {Response} res
     * @returns {Promise<void>}
     */
    async create(_: Request, res: Response): Promise<void> {
        // generate a unique one-time code
        const { code, expiresAt } = await this.oneTimeCodeService.create()
        // generate a url for the client registration
        const url = `${process.env.ROOT_URL}/clients/register?code=${code}`
        // respond with the code, url, and expiration date
        res.status(200).json({ code, url, expiresAt })
    }
}
