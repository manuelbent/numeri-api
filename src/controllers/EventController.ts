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
        // build the raw event and enqueue it for processing
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

        // publish the raw event to Redis
        await this.redisService.publish('raw-events', JSON.stringify({ id }))

        // respond with the raw event uuid
        res.status(200).json({ uuid, message: 'Event tracked successfully.' })
    }

    /**
     * Retrieves processed events.
     * @param {Request} req
     * @param {Response} res
     * @returns {Promise<void>}
     */
    async retrieve(req: Request, res: Response): Promise<void> {
        const { id } = (req as Request&{ client: Client }).client
        const { fields, query } = (req as Request&{ args: RequestArgs }).args
        const events = await this.eventService.loadByClientId(id, query, fields)
        res.status(200).json(events)
    }
}
