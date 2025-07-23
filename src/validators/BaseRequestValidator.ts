import { z } from 'zod'
import { Request, Response, NextFunction } from 'express'

/**
 * @class BaseRequestValidator
 */
export default class BaseRequestValidator {
    /**
     * Schema for validating track request bodies.
     * @private {ZodObject}
     */
    protected schema: z.ZodObject<{}> = z.object({}).strict()

    /**
     * @param {Request} req
     * @param {Response} _
     * @param {NextFunction} next
     */
    public validate(req: Request, _: Response, next: NextFunction) {
        // determine if the request is a GET or POST and get the payload accordingly
        const payload = req.method === 'GET' ? req.query : req.body
        // validate the payload against the schema
        this.schema.parse(payload)
        next()
    }
}
