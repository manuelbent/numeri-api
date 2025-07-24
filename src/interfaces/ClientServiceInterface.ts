import { Client } from 'numeri-core'

/**
 * @interface ClientServiceInterface
 */
export default interface ClientServiceInterface {
    register(payload: object): Promise<[Client, string]>
    getBy(query: object): Promise<Client[]>
    getBySecret(secret: string): Promise<Client|null>
}
