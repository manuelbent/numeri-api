import { z } from 'zod'
import BaseRequestValidator from './BaseRequestValidator'

/**
 * @class RegisterClientRequestValidator
 */
export default class RegisterClientRequestValidator extends BaseRequestValidator {
    /**
     * @private {string[]}
     */
    readonlyFields = [
        'id',
        'clientId',
        'clientSecretHash',
        'createdAt',
        'lastUsedAt',
        'isRevoked',
        'revokedAt'
    ]

    /**
     * @private {ZodObject}
     */
    schema = z.object({
        name: z.string().optional(),
        ownerEmail: z.string().email().optional(),
        allowedOrigins: z.array(z.string()),
    })
}
