import express from 'express'
import cors from 'cors'
import { logger } from 'numeri-core'

import ioc from './config/ioc'
import routes from './routes/router'
import { connect } from './config/redis'

// connect to redis
connect().catch(logger.error)

const app = express()
app.set('trust proxy', true)

app.use(cors())
app.use(express.json())

app.use(ioc.requestIdMiddleware.handle)
app.use(ioc.malformedDataMiddleware.handle)

app.use('/', routes)

app.use(ioc.validationErrorMiddleware.handle)
app.use(ioc.genericErrorMiddleware.handle)

export default app
