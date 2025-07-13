import { Request, Response } from 'express'
import TrackingEventServiceInterface from '../interfaces/TrackingEventServiceInterface'

export default class TrackingController {
    constructor(private trackingEventService: TrackingEventServiceInterface) {}

    public async track(req: Request, res: Response) {
        // build the tracking event and enqueue it for processing
        const { id, uuid } = await this.trackingEventService.enqueue({
            ...req.body,
            $ip: req.ip || req.headers['x-forwarded-for'],
            $site: req.headers.origin || req.headers.referer || 'unknown-site'
        })

        // todo: post to redis queue for processing

        // respond with the tracking event uuid
        res.status(200).json({ uuid, message: 'Event tracked successfully' })
    }
}
