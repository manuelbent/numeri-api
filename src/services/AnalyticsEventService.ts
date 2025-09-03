import { ProcessedEvent, ProcessedEventRepositoryInterface } from 'numeri-core'
import ProcessedEventServiceInterface from '../interfaces/ProcessedEventServiceInterface'

/**
 * @class ProcessedEventService
 */
export default class ProcessedEventService implements ProcessedEventServiceInterface {
    /**
     * @constructor
     * @param {ProcessedEventRepositoryInterface} repository
     */
    constructor(private repository: ProcessedEventRepositoryInterface) {}

    /**
     * Creates a new ProcessedEvent.
     * @param {object} data
     */
    async create(data: object): Promise<ProcessedEvent> {
        return this.repository.create(data)
    }

    /**
     * Retrieves ProcessedEvents based on the client ID and query.
     * @param {number} id
     * @param {object} query
     * @return {Promise<ProcessedEvent[]>}
     */
    async loadByClient(id: number, {
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
