import { z } from 'zod'
import BaseRequestValidator from './BaseRequestValidator'
import { NextFunction, Request, Response } from 'express'

/**
 * @class TrackRequestValidator
 */
export default class TrackRequestValidator extends BaseRequestValidator {
    /**
     * @private {ZodObject}
     */
    schema = z.object({
        event: z.string(),
        properties: z.object({}).passthrough(),
        timestamp: z.string().datetime({ offset: true }).optional(),
    }).strict()

    /**
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     */
    validate(req: Request, res: Response, next: NextFunction) {
        // retrieve the client id validate etc

        super.validate(req, res, next)
    }
}
