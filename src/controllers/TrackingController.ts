import { Request, Response } from 'express'
import TrackingEventServiceInterface from '../interfaces/TrackingEventServiceInterface'
import { client as RedisClient } from '../config/redis'

/**
 * Ingests tracking events and publishes them to Redis for further processing.
 * @class TrackingController
 */
export default class TrackingController {
    /**
     * @constructor
     * @param {TrackingEventServiceInterface} trackingEventService
     */
    constructor(private trackingEventService: TrackingEventServiceInterface) {}

    /**
     * @param {Request} req
     * @param {Response} res
     * @returns {Promise<void>}
     */
    public async track(req: Request, res: Response): Promise<void> {
        // build the tracking event and enqueue it for processing
        const { id, uuid } = await this.trackingEventService.enqueue({
            ...req.body,
            $ip: req.ip || req.headers['x-forwarded-for'],
            $site: req.headers.origin || req.headers.referer || 'unknown-site'
        })

        // async publish the tracking event to Redis
        RedisClient.publish('tracking-events', JSON.stringify({ id })).then()

        // respond with the tracking event uuid
        res.status(200).json({ uuid, message: 'Event tracked successfully' })
    }
}
