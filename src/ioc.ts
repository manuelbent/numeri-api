import SystemController from './controllers/SystemController'
import TrackRequestValidator from './validators/TrackRequestValidator'
import ValidationErrorMiddleware from './middlewares/ValidationErrorMiddleware'
import MalformedDataMiddleware from './middlewares/MalformedDataMiddleware'
import RequestIdMiddleware from './middlewares/RequestIdMiddleware'
import GenericErrorMiddleware from './middlewares/GenericErrorMiddleware'
import TrackingEvent from './models/TrackingEvent'
import TrackingEventRepository from './repositories/sequelize/TrackingEventRepository'
import TrackingEventService from './services/TrackingEventService'
import TrackingController from './controllers/TrackingController'
import AnalyticsEvent from './models/AnalyticsEvent'
import AnalyticsEventRepository from './repositories/sequelize/AnalyticsEventRepository'
import AnalyticsEventService from './services/AnalyticsEventService'
import AnalyticsController from './controllers/AnalyticsController'

// IoC Container to hold all the dependencies
class Container {
    public systemController: SystemController = new SystemController()
    public trackRequestValidator: TrackRequestValidator = new TrackRequestValidator()
    public validationErrorMiddleware: ValidationErrorMiddleware = new ValidationErrorMiddleware()
    public malformedDataMiddleware: MalformedDataMiddleware = new MalformedDataMiddleware()
    public requestIdMiddleware: RequestIdMiddleware = new RequestIdMiddleware()
    public genericErrorMiddleware: GenericErrorMiddleware = new GenericErrorMiddleware()
    private trackingEventRepository: TrackingEventRepository = new TrackingEventRepository(TrackingEvent)
    public trackingEventService: TrackingEventService = new TrackingEventService(this.trackingEventRepository)
    public trackingController: TrackingController = new TrackingController(this.trackingEventService)
    private analyticsEventRepository: AnalyticsEventRepository = new AnalyticsEventRepository(AnalyticsEvent)
    public analyticsEventService: AnalyticsEventService = new AnalyticsEventService(this.analyticsEventRepository)
    public analyticsController: AnalyticsController = new AnalyticsController(this.analyticsEventService)
}

export default new Container()
