import { TrackingEvent } from 'numeri-core'
import TrackingEventServiceInterface from '../interfaces/TrackingEventServiceInterface'
import RepositoryInterface from '../interfaces/RepositoryInterface'

export default class TrackingEventService implements TrackingEventServiceInterface {
    constructor(private repository: RepositoryInterface<TrackingEvent>) {}

    async enqueue(payload: object): Promise<TrackingEvent> {
        return this.repository.create({ payload })
    }

    async getById(id: number): Promise<TrackingEvent|null> {
        return this.repository.findById(id)
    }

    async getFailed(): Promise<TrackingEvent[]> {
        return this.repository.find({ status: 'failed', retries: { $lt: 3 } })
    }

    async update(id: number, data: Partial<TrackingEvent>): Promise<void> {
        await this.repository.update(id, data)
    }
}
