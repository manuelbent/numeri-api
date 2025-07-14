import { z } from 'zod'
import BaseRequestValidator from './BaseRequestValidator'

/**
 * Validates the request body for track events.
 * It ensures the body contains the expected fields.
 * If the validation fails, an error will be thrown and handled by the ValidationErrorMiddleware.
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
    })
}
