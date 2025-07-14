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
    protected schema: z.ZodObject<{}> = z.object({})

    /**
     * Fields to be sanitized from the request body.
     * @protected {string[]}
     */
    protected readonlyFields: string[] = []

    /**
     * Sanitizes the request body.
     * This method can be overridden by subclasses to implement custom sanitization logic.
     * @protected
     * @param {Request} request
     */
    protected sanitize(request: Request) {
        for (const field of this.readonlyFields) {
            if (request.body.hasOwnProperty(field)) {
                delete request.body[field]
            }
        }
    }

    /**
     * @param {Request} req
     * @param {Response} _
     * @param {NextFunction} next
     */
    public validate(req: Request, _: Response, next: NextFunction) {
        // sanitize the request body
        this.sanitize(req)
        // validate the request body against the schema
        this.schema.parse(req.body)
        next()
    }
}
