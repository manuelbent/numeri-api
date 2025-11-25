import 'dotenv/config'

import { logger } from '@manuelbent/numeri-core'

import app from './app'
import { connect } from './config/redis'

const port = Number(process.env.PORT) || 3000

// connect to redis
connect(process.pid).catch(logger.error)

app.listen(port, () => {
    logger.info(`Server running on port ${port}...`)
})
