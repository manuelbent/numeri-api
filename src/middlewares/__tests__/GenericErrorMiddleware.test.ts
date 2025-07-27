import express, { Request, Response, NextFunction } from 'express'
import { describe, expect, it } from 'vitest'
import request from 'supertest'
import GenericErrorMiddleware from '../GenericErrorMiddleware'

describe('GenericErrorMiddleware', () => {
    const app = express()
    const genericErrorMiddleware = new GenericErrorMiddleware()
    const uuid = crypto.randomUUID()

    app.use((req, _, next) => {
        (req as Request&{ id: string }).id = uuid
        next()
    })

    app.get('/error', () => {
        throw new Error('💥')
    })

    app.use((err: any, req: Request, res: Response, _: NextFunction) => genericErrorMiddleware.handle(err, req, res))

    it('must return 500 with message and uuid', async () => {
        const res = await request(app).get('/error')
        expect(res.status).toBe(500)
        expect(res.body).toHaveProperty('message', 'An unexpected error occurred')
        expect(res.body).toHaveProperty('uuid', uuid)
    })
})
