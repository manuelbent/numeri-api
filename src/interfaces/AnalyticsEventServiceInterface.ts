import { AnalyticsEvent } from 'numeri-core'

/**
 * @interface AnalyticsEventServiceInterface
 */
export default interface AnalyticsEventServiceInterface {
    create(data: object): Promise<AnalyticsEvent>
    loadByClient(id: number, query: object): Promise<AnalyticsEvent[]>
}
