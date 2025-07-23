import { AnalyticsEvent, RepositoryInterface } from 'numeri-core'
import AnalyticsEventServiceInterface from '../interfaces/AnalyticsEventServiceInterface'

/**
 * @class AnalyticsEventService
 */
export default class AnalyticsEventService implements AnalyticsEventServiceInterface {
    /**
     * @constructor
     * @param {RepositoryInterface<AnalyticsEvent>} repository
     */
    constructor(private repository: RepositoryInterface<AnalyticsEvent>) {}

    /**
     * Creates a new AnalyticsEvent.
     * @param {object} data
     */
    async create(data: object): Promise<AnalyticsEvent> {
        return this.repository.create({ ...data })
    }

    /**
     * Filters AnalyticsEvents by the given query.
     * @param {object} query
     */
    async getBy(query: object): Promise<AnalyticsEvent[]> {
        return this.repository.find({ ...query })
    }
}
