import { AnalyticsEvent } from 'numeri-core'

/**
 * @interface AnalyticsEventServiceInterface
 */
export default interface AnalyticsEventServiceInterface {
    create(data: object): Promise<AnalyticsEvent>
    loadByClientId(clientId: number, query: object): Promise<AnalyticsEvent[]>
}
