import { z } from 'zod'
import BaseRequestValidator from './BaseRequestValidator'

/**
 * @class TrackRequestValidator
 */
export default class TrackRequestValidator extends BaseRequestValidator {
    /**
     * @private {string[]}
     */
    readonlyFields = []

    /**
     * @private {ZodObject}
     */
    schema = z.object({
        event: z.string(),
        properties: z.object({}).passthrough(),
        timestamp: z.string().datetime({ offset: true }).optional(),
    })
}
