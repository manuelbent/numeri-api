import { AnalyticsEvent, AnalyticsEventRepositoryInterface } from 'numeri-core'
import AnalyticsEventServiceInterface from '../interfaces/AnalyticsEventServiceInterface'

/**
 * @class AnalyticsEventService
 */
export default class AnalyticsEventService implements AnalyticsEventServiceInterface {
    /**
     * @constructor
     * @param {AnalyticsEventRepositoryInterface} repository
     */
    constructor(private repository: AnalyticsEventRepositoryInterface) {}

    /**
     * Creates a new AnalyticsEvent.
     * @param {object} data
     */
    async create(data: object): Promise<AnalyticsEvent> {
        return this.repository.create(data)
    }

    /**
     * Retrieves AnalyticsEvents based on the client ID and query.
     * @param {number} id
     * @param {object} query
     * @return {Promise<AnalyticsEvent[]>}
     */
    async loadByClient(id: number, query: object): Promise<AnalyticsEvent[]> {
        return this.repository.loadByClient(id, query)
    }
}
