import 'dotenv/config'

import os from 'os'
import cluster from 'cluster'
import { logger } from 'numeri-core'
import { connect } from './config/redis'

import app from './app'

const port = Number(process.env.PORT) || 3000

if (cluster.isPrimary) {
    logger.info('Master process is running...')
    logger.info(`Forking ${os.cpus().length} workers...`)
    for (let i = 0; i < os.cpus().length; i++) {
        cluster.fork()
    }

    cluster.on('exit', (worker, code, signal) => {
        logger.warn(`Worker ${worker.process.pid} died (code: ${code}, signal: ${signal})`)
        logger.info('Starting a new worker...')
        cluster.fork()
    })
} else {
    // connect to redis
    connect().catch(logger.error)
    // start the server
    app.listen(port, () => {
        logger.info(`Worker ${process.pid} running on port ${port}...`)
    })
}
