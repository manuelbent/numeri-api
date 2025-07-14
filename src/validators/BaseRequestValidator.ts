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
        // validate the request body against the schema
        this.schema.parse(req.body)
        next()
    }
}
