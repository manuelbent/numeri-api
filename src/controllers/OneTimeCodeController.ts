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
        const { code, expiresAt } = await this.oneTimeCodeService.create()
        res.status(200).json({ code, expiresAt })
    }
}
