import RepositoryInterface from '../interfaces/RepositoryInterface'
import AuthServiceInterface from '../interfaces/AuthServiceInterface'
import Client from '../models/Client'

/**
 * @class AuthService
 */
export default class AuthService implements AuthServiceInterface {
    /**
     * @constructor
     * @param {RepositoryInterface} repository
     */
    constructor(private repository: RepositoryInterface<Client>) {}
}
