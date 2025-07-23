import { TrackingEvent } from 'numeri-core'

/**
 * @interface TrackingEventServiceInterface
 */
export default interface TrackingEventServiceInterface {
    enqueue(data: object): Promise<TrackingEvent>
}
