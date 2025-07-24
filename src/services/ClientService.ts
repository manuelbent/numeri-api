import crypto from 'crypto'
import { Client, ClientRepositoryInterface } from 'numeri-core'
import ClientServiceInterface from '../interfaces/ClientServiceInterface'

/**
 * @class ClientService
 */
export default class ClientService implements ClientServiceInterface {
    /**
     * @constructor
     * @param {ClientRepositoryInterface} repository
     */
    constructor(private repository: ClientRepositoryInterface) {}

    /**
     * Hashes the client secret using SHA-256.
     * @param {string} secret
     * @returns {string}
     */
    private hash(secret: string): string {
        return crypto.createHash('sha256').update(secret).digest('hex')
    }

    /**
     * Registers a new client.
     * The returned object contains the created client and the plain secret.
     * @param {object} payload
     * @returns {Promise<[Client|string]>}
     */
    async register(payload: object): Promise<[Client, string]> {
        const secret = crypto.randomBytes(32).toString('hex')
        const client = await this.repository.create({
            apiKey: crypto.randomUUID(),
            secretHash: this.hash(secret),
            ...payload,
        })
        return [client, secret]
    }

    /**
     * Retrieves clients based on the provided query.
     * @param {object} query
     * @returns {Promise<Client[]>}
     */
    async getBy(query: object): Promise<Client[]> {
        return this.repository.find({ ...query })
    }

    /**
     * Retrieves a client by its API key.
     * @param {string} secret
     * @return {Promise<Client|null>}
     */
    async getBySecret(secret: string): Promise<Client|null> {
        const secretHash = this.hash(secret)
        const [client] = await this.repository.find({ secretHash })
        return client
    }
}
