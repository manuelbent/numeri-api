import crypto from 'crypto'
import { OneTimeCode, OneTimeCodeRepository } from 'numeri-core'
import OneTimeCodeServiceInterface from '../interfaces/OneTimeCodeServiceInterface'

/**
 * @class OneTimeCodeService
 */
export default class OneTimeCodeService implements OneTimeCodeServiceInterface {
    /**
     * @constructor
     * @param {OneTimeCodeServiceInterface} repository
     */
    constructor(private repository: OneTimeCodeRepository) {}

    /**
     * Creates a unique one-time code.
     * @returns {Promise<OneTimeCode>}
     */
    async create(): Promise<OneTimeCode> {
        let code: string
        do {
            code = crypto.randomBytes(64).toString('hex')
        } while ((await this.repository.count({ code })) > 0)

        return await this.repository.create({
            code,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 100)
        })
    }
}
