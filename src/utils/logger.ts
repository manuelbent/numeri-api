import pino from 'pino'

const logger = pino({
    level: process.env.LOG_LEVEL ? process.env.LOG_LEVEL : 'info',
    timestamp: pino.stdTimeFunctions.isoTime,
    transport: process.env.ENV === 'dev' ? undefined : {
        target: 'pino/file',
        options: {
            destination: './app.log'
        }
    }
})

export default logger
