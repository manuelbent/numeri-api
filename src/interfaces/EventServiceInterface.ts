import { ProcessedEvent, RawEvent } from 'numeri-core'

/**
 * @interface EventServiceInterface
 */
export default interface EventServiceInterface {
    enqueue(data: object): Promise<RawEvent>
    loadByClientId(id: number, query: Query, fields?: Fields): Promise<ProcessedEvent[]>
}
