import { TrackingEvent } from 'numeri-core'

/**
 * @interface TrackingEventServiceInterface
 */
export default interface TrackingEventServiceInterface {
    enqueue(payload: object): Promise<TrackingEvent>
}
