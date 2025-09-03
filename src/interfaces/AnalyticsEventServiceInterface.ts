import { ProcessedEvent } from 'numeri-core'

/**
 * @interface ProcessedEventServiceInterface
 */
export default interface ProcessedEventServiceInterface {
    create(data: object): Promise<ProcessedEvent>
    loadByClient(id: number, query: object): Promise<ProcessedEvent[]>
}
