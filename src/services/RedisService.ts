import { client } from '../config/redis'
import RedisServiceInterface from '../interfaces/RedisServiceInterface'

/**
 * @description Redis service implementation for publishing messages and other Redis operations.
 * @class RedisService
 */
export default class RedisService implements RedisServiceInterface {
    /**
     * @description Publishes a message to a Redis channel.
     * @param {string} channel
     * @param {string} message
     * @returns {Promise<number>}
     */
    public async publish(channel: string, message: string): Promise<number> {
        return await client.publish(channel, message)
    }
}
