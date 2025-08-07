import 'dotenv/config'

import { beforeAll, beforeEach, describe, expect, it } from 'vitest'
import request from 'supertest'
import { OneTimeCode } from 'numeri-core'
import app from '../../../app'
import ioc from '../../../config/ioc'
import { limiter } from '../../../config/rateLimit'
import OneTimeCodeController from '../../../controllers/OneTimeCodeController'
import OneTimeCodeServiceInterface from '../../../interfaces/OneTimeCodeServiceInterface'

describe('/codes', () => {
    const code = 'some-code'
    const expiresAt = 'some-expires-at'

    beforeAll(() => {
        ioc.oneTimeCodeController = new OneTimeCodeController({
            create: () => ({ code, expiresAt }) as unknown as Partial<OneTimeCode>,
        } as OneTimeCodeServiceInterface)
    })

    beforeEach(() => {
        limiter.resetKey('::ffff:127.0.0.1')
    })

    it('must block unauthorized requests', async () => {
        const res = await request(app).post('/v1/codes').send({})
        expect(res.status).toBe(401)
    })

    it('must block forbidden requests', async () => {
        const res = await request(app).post('/v1/codes').set('Authorization', 'Bearer invalid').send({})
        expect(res.status).toBe(403)
    })

    it('must rate limit requests', async () => {
        for (let i = 0; i < 100; i++) {
            const res = await request(app).post('/v1/codes').send({})
            expect(res.status).toBe(401) // no auth, but not rate-limited
        }
        const res = await request(app).post('/v1/codes').send({})
        expect(res.text).toBe('Too many requests, please try again later.')
        expect(res.status).toBe(429) // rate-limited
    })

    it('must return a one time code', async () => {
        const res = await request(app).post('/v1/codes').set('Authorization', `Bearer ${process.env.ADMIN_BEARER}`).send({})
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('code', code)
        expect(res.body).toHaveProperty('url', `${process.env.ROOT_URL}/v1/clients/register?code=${code}`)
        expect(res.body).toHaveProperty('expiresAt', expiresAt)
    })
})
