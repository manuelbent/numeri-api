import express from 'express'
import cors from 'cors'

import './config/redis'
import ioc from './config/ioc'
import routes from './routes'

const app = express()

app.use(cors())
app.use(express.json())

app.use(ioc.requestIdMiddleware.handle)
app.use(ioc.malformedDataMiddleware.handle)

app.use('/', routes)

app.use(ioc.validationErrorMiddleware.handle)
app.use(ioc.genericErrorMiddleware.handle)

export default app
