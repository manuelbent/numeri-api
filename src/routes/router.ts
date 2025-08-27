import { Router } from 'express'
import ioc from '../config/ioc'
import v1 from './v1/router'

const router = Router()

// root route
router.get('/', ioc.systemController.root)

// v1 API routes
router.use('/v1', v1)

// 404 Not Found route
router.use(ioc.systemController.notFound)

export default router
