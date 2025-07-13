import { createClient } from 'redis'
import logger from '../utils/logger'

export const client = createClient({ url: process.env.REDIS_URL })

;(async () => {
    try {
        await client.connect()
        logger.info('Redis connection established successfully')
    } catch (err) {
        logger.error(err, 'Something went wrong while connecting to Redis')
    }
})()
