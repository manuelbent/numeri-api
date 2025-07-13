import 'dotenv/config'
import 'module-alias/register'

import app from './app'
import logger from './utils/logger'

const port = Number(process.env.PORT) || 3000

app.listen(port, () => {
    logger.info(`Server running on port ${port}...`)
})
