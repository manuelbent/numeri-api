import { createClient } from 'redis'
import { logger } from '@manuelbent/numeri-core'

export const client = createClient({ url: process.env.REDIS_URL })

export const connect = async (pid: number) => {
    try {
        await client.connect()
        logger.info(`Redis connection established successfully by process ${pid}`)
    } catch (err) {
        logger.error(err, `Something went wrong while connecting to Redis by process ${pid}`)
    }
}
