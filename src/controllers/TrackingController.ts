import { Request, Response } from 'express'
import { Client } from 'numeri-core'
import TrackingEventServiceInterface from '../interfaces/TrackingEventServiceInterface'
import RedisServiceInterface from '../interfaces/RedisServiceInterface'

/**
 * @class TrackingController
 * @description Ingests tracking events and publishes them to Redis for further processing.
 */
export default class TrackingController {
    /**
     * @constructor
     * @param {TrackingEventServiceInterface} trackingEventService
     * @param {RedisServiceInterface} redisService
     */
    constructor(private trackingEventService: TrackingEventServiceInterface, private redisService: RedisServiceInterface) {}

    /**
     * @param {Request} req
     * @param {Response} res
     * @returns {Promise<void>}
     */
    public async track(req: Request, res: Response): Promise<void> {
        // build the tracking event and enqueue it for processing
        const { id, uuid } = await this.trackingEventService.enqueue({
            clientId: (req as Request&{ client: Client }).client.id,
            payload: {
                ...req.body,
                timestamp: req.body.timestamp ?? new Date().toISOString(),
                $ip: req.ip || req.headers['x-forwarded-for'],
                $site: req.headers.origin || req.headers.referer || 'unknown-site',
                $visitorId: req.headers['x-visitor-id'] || 'anonymous',
            }
        })

        // publish the tracking event to Redis
        await this.redisService.publish('tracking-events', JSON.stringify({ id }))

        // respond with the tracking event uuid
        res.status(200).json({ uuid, message: 'Event tracked successfully.' })
    }
}
