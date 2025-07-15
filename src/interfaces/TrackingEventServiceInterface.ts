import {TrackingEvent} from 'numeri-core'

export default interface TrackingEventServiceInterface {
    enqueue(payload: object): Promise<TrackingEvent>
}
