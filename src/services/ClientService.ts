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
}
