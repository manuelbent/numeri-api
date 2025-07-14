import { z } from 'zod'
import BaseRequestValidator from './BaseRequestValidator'

/**
 * Validates the request body for client registration.
 * @class RegisterClientRequestValidator
 */
export default class RegisterClientRequestValidator extends BaseRequestValidator {
    /**
     * Schema for validating track request bodies.
     * @private {ZodObject}
     */
    schema = z.object({
        name: z.string().optional(),
        owner_email: z.string().email().optional(),
        allowed_origins: z.array(z.string()),
    })
}
