import 'dotenv/config'

import { logger } from 'numeri-core'
import app from './app'


const port = Number(process.env.PORT) || 3000

app.listen(port, () => {
    logger.info(`Server running on port ${port}...`)
})
