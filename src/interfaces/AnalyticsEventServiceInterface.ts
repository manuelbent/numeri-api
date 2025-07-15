import { AnalyticsEvent } from 'numeri-core'

export default interface AnalyticsEventServiceInterface {
    getBy(query: object): Promise<AnalyticsEvent[]>
}
