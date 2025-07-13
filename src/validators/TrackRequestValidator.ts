import { Request, Response, NextFunction } from 'express'
import { z } from 'zod'

export default class TrackRequestValidator {
    private schema = z.object({
        event: z.string(),
        properties: z.object({}).passthrough(),
        timestamp: z.string().datetime({ offset: true }).optional(),
    })

    public validate(req: Request, res: Response, next: NextFunction) {
        this.schema.parse(req.body)
        next()
    }
}
