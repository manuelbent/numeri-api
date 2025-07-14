import crypto from 'crypto'
import RepositoryInterface from '../interfaces/RepositoryInterface'
import ClientServiceInterface from '../interfaces/ClientServiceInterface'
import Client from '../models/Client'

/**
 * @class ClientService
 */
export default class ClientService implements ClientServiceInterface {
    /**
     * @constructor
     * @param {RepositoryInterface} repository
     */
    constructor(private repository: RepositoryInterface<Client>) {}

    /**
     * Registers a new client.
     * @param {object} payload
     * @returns {Promise<Client>}
     */
    async register(payload: object): Promise<Client> {
        return this.repository.create({
            clientId: crypto.randomUUID(),
            ...payload,
        })
    }
}
