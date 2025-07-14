import { Request, Response, NextFunction } from 'express'
import { z } from 'zod'
import BaseRequestValidator from './BaseRequestValidator'

/**
 * @class RegisterClientRequestValidator
 */
export default class RegisterClientRequestValidator extends BaseRequestValidator {
    /**
     * @private {ZodObject}
     */
    schema = z.object({
        name: z.string().optional(),
        ownerEmail: z.string().email().optional(),
        allowedOrigins: z.array(z.string()),
    }).strict()

    validate(req: Request, res: Response, next: NextFunction) {
        const bearer = req.headers['authorization']?.split(' ')[1]
        if (!bearer) {
            return res.status(401).json({ message: 'Missing Authorization header' })
        }

        if (bearer !== process.env.ADMIN_BEARER) {
            return res.status(403).json({ message: 'Forbidden' })
        }

        super.validate(req, res, next)
    }
}
