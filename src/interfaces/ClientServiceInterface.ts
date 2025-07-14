import Client from '../models/Client'

export default interface ClientServiceInterface {
    register(payload: object): Promise<Client>
}
