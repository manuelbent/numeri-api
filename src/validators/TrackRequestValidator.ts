import { Request, Response, NextFunction } from 'express'
import { z } from 'zod'

/**
 * Validates the request body for track events.
 * It ensures the body contains the expected fields.
 * If the validation fails, an error will be thrown and handled by the ValidationErrorMiddleware.
 * @class TrackRequestValidator
 */
export default class TrackRequestValidator {
    /**
     * Schema for validating track request bodies.
     * @private {ZodObject}
     */
    private schema = z.object({
        event: z.string(),
        properties: z.object({}).passthrough(),
        timestamp: z.string().datetime({ offset: true }).optional(),
    })

    /**
     * @param {Request} req
     * @param {Response} _
     * @param {NextFunction} next
     */
    public validate(req: Request, _: Response, next: NextFunction) {
        this.schema.parse(req.body)
        next()
    }
}
