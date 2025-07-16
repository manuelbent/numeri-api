import { AnalyticsEvent } from 'numeri-core'

/**
 * @interface AnalyticsEventServiceInterface
 */
export default interface AnalyticsEventServiceInterface {
    getBy(query: object): Promise<AnalyticsEvent[]>
}
