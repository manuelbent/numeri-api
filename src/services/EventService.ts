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
     * @return {Promise<ProcessedEvent[]>}
     */
    async loadByClientId(id: number, {
        page,
        limit,
        ...where
    }: Record<string, string|number>): Promise<ProcessedEvent[]> {
        return this.processedEventRepository.getByClientId(
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
