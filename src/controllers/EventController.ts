import { Request, Response } from 'express'
import { Client } from 'numeri-core'
import EventServiceInterface from '../interfaces/EventServiceInterface'
import RedisServiceInterface from '../interfaces/RedisServiceInterface'

/**
 * @class EventController
 */
export default class EventController {
    /**
     * @constructor
     * @param {EventServiceInterface} eventService
     * @param {RedisServiceInterface} redisService
     */
    constructor(private eventService: EventServiceInterface, private redisService: RedisServiceInterface) {}

    /**
     * @param {Request} req
     * @param {Response} res
     * @returns {Promise<void>}
     */
    public async track(req: Request, res: Response): Promise<void> {
        // build the tracking event and enqueue it for processing
        const { id, uuid } = await this.eventService.enqueue({
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

    /**
     * Retrieves analytics events.
     * @param {Request} req
     * @param {Response} res
     * @returns {Promise<void>}
     */
    async retrieve(req: Request, res: Response): Promise<void> {
        const { id } = (req as Request&{ client: Client }).client
        const { pq } = req as Request&{ pq: Record<string, string|number> }
        const events = await this.eventService.loadByClientId(id, pq)
        res.status(200).json(events)
    }
}
