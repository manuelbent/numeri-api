import AnalyticsEvent from '../models/AnalyticsEvent'

export default interface AnalyticsEventServiceInterface {
    load(query: object): Promise<AnalyticsEvent[]>
}
