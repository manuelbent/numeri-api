import { Request, Response } from 'express'
import AnalyticsEventServiceInterface from '../interfaces/AnalyticsEventServiceInterface'

export default class AnalyticsController {
    constructor(private analyticsEventService: AnalyticsEventServiceInterface) {}

    async get({ query }: Request, res: Response): Promise<void> {
        const analyticsEvents = await this.analyticsEventService.load(query)
        res.status(200).json(analyticsEvents)
    }
}
