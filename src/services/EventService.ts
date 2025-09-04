import { ProcessedEvent, ProcessedEventRepositoryInterface, RawEvent, RawEventRepositoryInterface } from 'numeri-core'
import EventServiceInterface from '../interfaces/EventServiceInterface'

/**
 * @class EventService
 */
export default class EventService implements EventServiceInterface {
    /**
     * @constructor
     * @param {RawEventRepositoryInterface} rawEventRepository
     * @param {ProcessedEventRepositoryInterface} processedEventRepository
     */
    constructor(
        private rawEventRepository: RawEventRepositoryInterface,
        private processedEventRepository: ProcessedEventRepositoryInterface
    ) {}

    /**
     * Enqueues a new raw event.
     * @param {object} data
     * @returns {Promise<RawEvent>}
     */
    async enqueue(data: object): Promise<RawEvent> {
        return this.rawEventRepository.create(data)
    }

    /**
     * Retrieves ProcessedEvents based on the client ID and query.
     * @param {number} id
     * @param {object} query
     * @param {string[]} fields
     * @return {Promise<ProcessedEvent[]>}
     */
    async loadByClientId(id: number, query: Record<string, string|number|object>, fields?: string[]): Promise<ProcessedEvent[]> {
        const { page, limit, ...where } = query

        // handle nested JSON properties filters
        Object.keys(where).forEach(key => {
            if (key.includes('.')) {
                const column = key.split('.')[0]
                const path = key.replace(column, '$')
                const value = where[key]
                where.$json = { column, path, value }
                delete where[key]
            }
        })

        return this.processedEventRepository.getByClientId(
            id,
            where,
            {
                limit,
                offset: (+page - 1) * +limit
            },
            fields,
            [['timestamp', 'DESC']])
    }
}
