import TrackingEvent from '../models/TrackingEvent'

export default interface TrackingEventServiceInterface {
    enqueue(payload: object): Promise<TrackingEvent>
}
