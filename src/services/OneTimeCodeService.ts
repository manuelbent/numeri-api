import crypto from 'crypto'
import { OneTimeCode } from '@manuelbent/numeri-core'
import OneTimeCodeServiceInterface from '../interfaces/OneTimeCodeServiceInterface'
import OneTimeCodeRepositoryInterface from '@manuelbent/numeri-core/dist/src/interfaces/OneTimeCodeRepositoryInterface'

/**
 * @class OneTimeCodeService
 */
export default class OneTimeCodeService implements OneTimeCodeServiceInterface {
    /**
     * @constructor
     * @param {OneTimeCodeServiceInterface} repository
     */
    constructor(private repository: OneTimeCodeRepositoryInterface) {}

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
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        })
    }

    /**
     * @param {string} code
     * @returns {Promise<OneTimeCode>}
     */
    async getByCode(code: string): Promise<OneTimeCode> {
        const [oneTimeCode] = await this.repository.find({ code })
        return oneTimeCode
    }
}
