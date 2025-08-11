import 'dotenv/config'
import { beforeAll, beforeEach, describe, expect, it } from 'vitest'
import request from 'supertest'
import {
    ClientRepositoryInterface,
    OneTimeCodeRepositoryInterface,
    TrackingEventRepositoryInterface
} from 'numeri-core'
import app from '../../../app'
import ioc from '../../../config/ioc'
import { limiter } from '../../../config/rateLimit'
import { MockClientRepository, MockOneTimeCodeRepository, MockTrackingEventRepository } from './mocks'

describe('router', () => {
    beforeAll(() => {
        // mock repositories
        ioc.oneTimeCodeRepository = new MockOneTimeCodeRepository()
        ioc.clientRepository = new MockClientRepository()
        ioc.trackingEventRepository = new MockTrackingEventRepository()
    })

    beforeEach(() => {
        limiter.resetKey('::/56') // local test ip
        ;(ioc.oneTimeCodeRepository as OneTimeCodeRepositoryInterface&{ clear: () => void }).clear()
        ;(ioc.clientRepository as ClientRepositoryInterface&{ clear: () => void }).clear()
        ;(ioc.trackingEventRepository as TrackingEventRepositoryInterface&{ clear: () => void }).clear()
    })

    describe('/codes', () => {
        it('must block unauthorized requests', async () => {
            const res = await request(app).post('/v1/codes').send({})
            expect(res.status).toBe(401)
            expect(res.body).toHaveProperty('error', 'Unauthorized.')
        })

        it('must block forbidden requests', async () => {
            const res = await request(app).post('/v1/codes').set('Authorization', 'Bearer invalid').send({})
            expect(res.status).toBe(403)
            expect(res.body).toHaveProperty('error', 'Forbidden.')
        })

        it('must rate limit requests', async () => {
            for (let i = 0; i < 100; i++) {
                const res = await request(app).post('/v1/codes').send({})
                expect(res.status).toBe(401)
            }
            const res = await request(app).post('/v1/codes').send({})
            expect(res.status).toBe(429)
            expect(res.text).toBe('Too many requests, please try again later.')
        })

        it('must return a one time code', async () => {
            const res = await request(app).post('/v1/codes').set('Authorization', `Bearer ${process.env.ADMIN_BEARER}`).send({})
            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty('code')
            expect(res.body).toHaveProperty('expiresAt')
            expect(res.body).toHaveProperty('url', `${process.env.ROOT_URL}/v1/clients/register?code=${res.body.code}`)
        })
    })

    describe('/clients/register', () => {
        it('must block requests with no code query parameter', async () => {
            const res = await request(app).post('/v1/clients/register').send({})
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty('error', 'Missing registration code.')
        })

        it('must block requests with an invalid registration code', async () => {
            const res = await request(app).post('/v1/clients/register?code=123').send({})
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty('error', 'Invalid registration code.')
        })

        it('must block requests with an expired registration code', async () => {
            const { body: { code } } = await request(app).post('/v1/codes').set('Authorization', `Bearer ${process.env.ADMIN_BEARER}`).send({})
                // simulate expiration by setting the code's expiresAt to a past date
            ;(ioc.oneTimeCodeRepository as OneTimeCodeRepositoryInterface&{ expire: (c: string) => void }).expire(code)
            const res = await request(app).post(`/v1/clients/register?code=${code}`).send({})
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty('error', 'Registration code has expired.')
        })

        it('must block requests with an already used registration code', async () => {
            const { body: { code } } = await request(app).post('/v1/codes').set('Authorization', `Bearer ${process.env.ADMIN_BEARER}`).send({})
                // simulate the code being used
            ;(ioc.oneTimeCodeRepository as OneTimeCodeRepositoryInterface&{ use: (c: string) => void }).use(code)
            const res = await request(app).post(`/v1/clients/register?code=${code}`).send({})
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty('error', 'Registration code has already been used.')
        })

        it('must create a new client', async () => {
            const payload = {
                name: 'test client',
                ownerEmail: 'test.client@example.com',
                allowedOrigins: ['example.com']
            }
            const { body: { code } } = await request(app).post('/v1/codes').set('Authorization', `Bearer ${process.env.ADMIN_BEARER}`).send({})
            const res = await request(app).post(`/v1/clients/register?code=${code}`).send(payload)
            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty('apiKey', expect.any(String))
            expect(res.body).toHaveProperty('secret', expect.any(String))
        })

        it('must block requests if the client already exists', async () => {
            const payload = {
                name: 'test client',
                ownerEmail: 'test.client@example.com',
                allowedOrigins: ['example.com']
            }
            {
                const { body: { code } } = await request(app).post('/v1/codes').set('Authorization', `Bearer ${process.env.ADMIN_BEARER}`).send({})
                await request(app).post(`/v1/clients/register?code=${code}`).send(payload)
            }
            {
                const { body: { code } } = await request(app).post('/v1/codes').set('Authorization', `Bearer ${process.env.ADMIN_BEARER}`).send({})
                const res = await request(app).post(`/v1/clients/register?code=${code}`).send(payload)
                expect(res.status).toBe(409)
                expect(res.body).toHaveProperty('error', 'Client already exists.')
            }
        })

        it('must rate limit requests', async () => {
            for (let i = 0; i < 100; i++) {
                const res = await request(app).post('/v1/clients/register').send({})
                expect(res.status).toBe(400)
            }
            const res = await request(app).post('/v1/clients/register').send({})
            expect(res.text).toBe('Too many requests, please try again later.')
            expect(res.status).toBe(429)
        })
    })

    describe('/track', () => {
        it('must block requests with no apiKey header', async () => {
            const res = await request(app).post('/v1/track').send({})
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty('error', 'Missing API key.')
        })

        it('must block requests with no Origin header', async () => {
            const res = await request(app).post('/v1/track').set('x-api-key', 'test').send({})
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty('error', 'Missing Origin header.')
        })

        it('must block requests with an invalid apiKey header', async () => {
            const res = await request(app).post('/v1/track')
                .set('Origin', 'example.com')
                .set('x-api-key', 'invalid')
                .send({})
            expect(res.status).toBe(404)
            expect(res.body).toHaveProperty('error', 'Client not found.')
        })

        it('must block requests with an invalid Origin header', async () => {
            const { body: { code } } = await request(app).post('/v1/codes').set('Authorization', `Bearer ${process.env.ADMIN_BEARER}`).send({})
            const { body: { apiKey } } = await request(app).post(`/v1/clients/register?code=${code}`).send({
                name: 'test client',
                ownerEmail: 'test.client@example.com',
                allowedOrigins: ['example.com']
            })
            const res = await request(app).post('/v1/track')
                .set('x-api-key', apiKey)
                .set('Origin', 'invalid.com')
                .send({ event: 'test_event' })
            expect(res.status).toBe(403)
            expect(res.body).toHaveProperty('error', 'Origin not allowed.')
        })

        it('must block requests with an invalid body', async () => {
            const { body: { code } } = await request(app).post('/v1/codes').set('Authorization', `Bearer ${process.env.ADMIN_BEARER}`).send({})
            const { body: { apiKey } } = await request(app).post(`/v1/clients/register?code=${code}`).send({
                name: 'test client',
                ownerEmail: 'test.client@example.com',
                allowedOrigins: ['example.com']
            })
            const res = await request(app).post('/v1/track')
                .set('Origin', 'example.com')
                .set('x-api-key', apiKey)
                .send({ invalid: 'body' })
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty('error', 'Invalid request data.')
            expect(res.body).toHaveProperty('details')
            expect(res.body.details.length).greaterThanOrEqual(1)
        })

        it.skip('must track an event', async () => {
            const { body: { code } } = await request(app).post('/v1/codes').set('Authorization', `Bearer ${process.env.ADMIN_BEARER}`).send({})
            const { body: { apiKey } } = await request(app).post(`/v1/clients/register?code=${code}`).send({
                name: 'test client',
                ownerEmail: 'test.client@example.com',
                allowedOrigins: ['example.com']
            })
            const res = await request(app).post('/v1/track')
                .set('Origin', 'example.com')
                .set('x-api-key', apiKey)
                .send({
                    event: 'click',
                    properties: {
                        page: 'home'
                    }
                })
            expect(res.status).toBe(200)
        })
    })
})
