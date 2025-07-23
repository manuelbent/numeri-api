import { Client } from 'numeri-core'

/**
 * @interface ClientServiceInterface
 */
export default interface ClientServiceInterface {
    register(payload: object): Promise<[Client, string]>
    getBy(query: object): Promise<Client[]>
    getByApiKey(apiKey: string): Promise<Client|null>
}
