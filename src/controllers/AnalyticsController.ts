import { Request, Response } from 'express'
import { Client } from 'numeri-core'
import AnalyticsEventServiceInterface from '../interfaces/AnalyticsEventServiceInterface'

/**
 * Handles requests related to analytics events.
 * @class AnalyticsController
 */
export default class AnalyticsController {
    /**
     * @constructor
     * @param {AnalyticsEventServiceInterface} analyticsEventService
     */
    constructor(private analyticsEventService: AnalyticsEventServiceInterface) {}

    /**
     * Retrieves analytics events.
     * @param {Request} req
     * @param {Response} res
     * @returns {Promise<void>}
     */
    async get(req: Request, res: Response): Promise<void> {
        const id = (req as Request&{ client: Client}).client.id
        const analyticsEvents = await this.analyticsEventService.loadByClient(id, req.query)
        res.status(200).json(analyticsEvents)
    }
}
