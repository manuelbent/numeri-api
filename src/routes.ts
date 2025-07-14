import { Request, Response, NextFunction, Router } from 'express'
import ioc from './config/ioc'

const router = Router()

// landing route
router.get('/', ioc.systemController.home)

// auth routes
router.post('/auth/signup',
    (req: Request, res: Response, next: NextFunction) => ioc.authController.signup(req, res)
)

// tracking events routes
router.post('/track',
    (req: Request, res: Response, next: NextFunction) => ioc.trackRequestValidator.validate(req, res, next),
    (req: Request, res: Response) => ioc.trackingController.track(req, res)
)

// analytics routes
router.get('/analytics',
    (req: Request, res: Response) => ioc.analyticsController.get(req, res)
)

// healthcheck route
router.get('/healthcheck', ioc.systemController.healthcheck)

export default router
