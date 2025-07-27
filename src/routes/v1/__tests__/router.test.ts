import { describe, expect, it } from 'vitest'
import request from 'supertest'
import app from '../../../app'

describe('/codes', () => {
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
