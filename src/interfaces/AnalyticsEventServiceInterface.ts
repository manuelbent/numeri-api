import AnalyticsEvent from '../models/AnalyticsEvent'

export default interface AnalyticsEventServiceInterface {
    getBy(query: object): Promise<AnalyticsEvent[]>
}
