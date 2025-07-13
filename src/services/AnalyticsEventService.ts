import AnalyticsEvent from '../models/AnalyticsEvent'
import RepositoryInterface from '../interfaces/RepositoryInterface'
import AnalyticsEventServiceInterface from '../interfaces/AnalyticsEventServiceInterface'

export default class AnalyticsEventService implements AnalyticsEventServiceInterface {
    constructor(private repository: RepositoryInterface<AnalyticsEvent>) {}

    async create(data: object): Promise<AnalyticsEvent> {
        return this.repository.create({ ...data })
    }

    async load(query: object): Promise<AnalyticsEvent[]> {
        return this.repository.find({ ...query })
    }
}
