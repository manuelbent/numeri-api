import { Router, Request, Response, NextFunction } from 'express'
import { limiter } from '../../config/rateLimit'
import ioc from '../../config/ioc'

const router = Router()

// one-time codes routes
router.post('/codes',
    limiter,
    (req: Request, res: Response, next: NextFunction) => ioc.createOneTimeCodeRequestValidator.validate(req, res, next),
    (req: Request, res: Response) => ioc.oneTimeCodeController.create(req, res)
)

// clients routes
router.post('/clients/register',
    limiter,
    (req: Request, res: Response, next: NextFunction) => ioc.registerClientRequestValidator.validate(req, res, next),
    (req: Request, res: Response) => ioc.clientController.register(req, res)
)

// tracking events routes
router.post('/events',
    (req: Request, res: Response, next: NextFunction) => ioc.crawlerDetectionMiddleware.handle(req, res, next),
    (req: Request, res: Response, next: NextFunction) => ioc.createEventRequestValidator.validate(req, res, next),
    (req: Request, res: Response) => ioc.eventController.track(req, res)
)

// analytics routes
router.get('/events',
    (req: Request, res: Response, next: NextFunction) => ioc.retrieveEventRequestValidator.validate(req, res, next),
    (req: Request, res: Response) => ioc.eventController.retrieve(req, res)
)

export default router
