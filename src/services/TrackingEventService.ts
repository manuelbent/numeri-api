import { TrackingEvent } from 'numeri-core'
import TrackingEventServiceInterface from '../interfaces/TrackingEventServiceInterface'
import RepositoryInterface from '../interfaces/RepositoryInterface'

/**
 * @class TrackingEventService
 */
export default class TrackingEventService implements TrackingEventServiceInterface {
    /**
     * @constructor
     * @param {RepositoryInterface} repository
     */
    constructor(private repository: RepositoryInterface<TrackingEvent>) {}

    /**
     * Enqueues a new tracking event.
     * @param {object} payload - The payload of the tracking event.
     * @returns {Promise<TrackingEvent>} - The created tracking event.
     */
    async enqueue(payload: object): Promise<TrackingEvent> {
        return this.repository.create({ payload })
    }

    /**
     * Retrieves tracking events based on the provided id.
     * @param {number} id
     * @returns {Promise<TrackingEvent|null>}
     */
    async getById(id: number): Promise<TrackingEvent|null> {
        return this.repository.findById(id)
    }

    /**
     * Retrieves all failed tracking events that have not exceeded the retry limit.
     * @return {Promise<TrackingEvent[]>}
     */
    async getFailed(): Promise<TrackingEvent[]> {
        return this.repository.find({ status: 'failed', retries: { $lt: 3 } })
    }

    /**
     * Updates a tracking event by its id.
     * @param {number} id
     * @param {Partial<TrackingEvent>} data
     * @returns {Promise<void>}
     */
    async update(id: number, data: Partial<TrackingEvent>): Promise<void> {
        await this.repository.update(id, data)
    }
}
