import { Router, Request, Response, NextFunction } from 'express'
import ioc from '../../config/ioc'

const router = Router()

// one-time codes routes
router.post('/codes',
    (req: Request, res: Response, next: NextFunction) => ioc.createOneTimeCodeRequestValidator.validate(req, res, next),
    (req: Request, res: Response) => ioc.oneTimeCodeController.create(req, res)
)

// clients routes
router.post('/clients/register',
    (req: Request, res: Response, next: NextFunction) => ioc.registerClientRequestValidator.validate(req, res, next),
    (req: Request, res: Response) => ioc.clientController.register(req, res)
)

// tracking events routes
router.post('/track',
    (req: Request, res: Response, next: NextFunction) => ioc.trackRequestValidator.validate(req, res, next),
    (req: Request, res: Response) => ioc.trackingController.track(req, res)
)

// analytics routes
router.get('/analytics',
    (req: Request, res: Response, next: NextFunction) => ioc.getAnalyticsValidator.validate(req, res, next),
    (req: Request, res: Response) => ioc.analyticsController.get(req, res)
)

export default router
