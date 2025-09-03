import { ProcessedEvent, RawEvent, RawEventRepositoryInterface } from 'numeri-core'
import EventServiceInterface from '../interfaces/EventServiceInterface'

/**
 * @class EventService
 */
export default class EventService implements EventServiceInterface {
    /**
     * @constructor
     * @param {RawEventRepositoryInterface} repository
     */
    constructor(private repository: RawEventRepositoryInterface) {}

    /**
     * Enqueues a new tracking event.
     * @param {object} data
     * @returns {Promise<RawEvent>}
     */
    async enqueue(data: object): Promise<RawEvent> {
        return this.repository.create(data)
    }

    /**
     * Retrieves tracking events based on the provided id.
     * @param {number} id
     * @returns {Promise<RawEvent|null>}
     */
    async getById(id: number): Promise<RawEvent|null> {
        return this.repository.findById(id)
    }

    /**
     * Retrieves all failed tracking events that have not exceeded the retry limit.
     * @return {Promise<RawEvent[]>}
     */
    async getFailed(): Promise<RawEvent[]> {
        return this.repository.find({ status: 'failed', retries: { $lt: 3 } })
    }

    /**
     * Updates a tracking event by its id.
     * @param {number} id
     * @param {Partial<RawEvent>} data
     * @returns {Promise<void>}
     */
    async update(id: number, data: Partial<RawEvent>): Promise<void> {
        await this.repository.update(id, data)
    }

    /**
     * Retrieves ProcessedEvents based on the client ID and query.
     * @param {number} id
     * @param {object} query
     * @return {Promise<ProcessedEvent[]>}
     */
    async loadByClientId(id: number, {
        page,
        limit,
        ...where
    }: Record<string, string|number>): Promise<ProcessedEvent[]> {
        return this.repository.loadByClient(
            id,
            where,
            {
                limit,
                offset: (+page - 1) * +limit
            },
            {
                exclude: ['id', 'rawEventId']
            },
            [['timestamp', 'DESC']])
    }
}
