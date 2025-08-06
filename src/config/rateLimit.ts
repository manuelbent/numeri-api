import { Request } from 'express'
import rateLimit from 'express-rate-limit'

export const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    keyGenerator: (req: Request) => req.ip ?? '::1',
    message: 'Too many requests, please try again later.',
})
