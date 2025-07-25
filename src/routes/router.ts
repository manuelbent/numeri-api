import { Router } from 'express'
import ioc from '../config/ioc'
import v1 from './v1/router'

const router = Router()

// landing route
router.get('/', ioc.systemController.home)

// v1 API routes
router.use('/v1', v1)

// healthcheck route
router.get('/healthcheck', ioc.systemController.healthcheck)

// 404 Not Found route
router.use(ioc.systemController.notFound)

export default router
