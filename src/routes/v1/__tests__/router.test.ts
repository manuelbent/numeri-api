import { beforeEach, describe, expect, it } from 'vitest'
import request from 'supertest'
import app from '../../../app'
import { limiter } from '../../../config/rateLimit'

describe('/codes', () => {
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
})
