import { Request, Response } from 'express'
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
    async get({ query }: Request, res: Response): Promise<void> {
        const analyticsEvents = await this.analyticsEventService.load(query)
        res.status(200).json(analyticsEvents)
    }
}
