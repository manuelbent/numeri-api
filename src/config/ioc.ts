// common resources
import {
    Client,
    ClientRepository,
    TrackingEvent,
    TrackingEventRepository,
    AnalyticsEvent,
    AnalyticsEventRepository
} from 'numeri-core'
// controllers
import SystemController from '../controllers/SystemController'
import TrackingController from '../controllers/TrackingController'
import AnalyticsController from '../controllers/AnalyticsController'
import ClientController from '../controllers/ClientController'
// services
import TrackingEventService from '../services/TrackingEventService'
import AnalyticsEventService from '../services/AnalyticsEventService'
import ClientService from '../services/ClientService'
// validators
import TrackRequestValidator from '../validators/TrackRequestValidator'
import RegisterClientRequestValidator from '../validators/RegisterClientRequestValidator'
// middlewares
import RequestIdMiddleware from '../middlewares/RequestIdMiddleware'
import ValidationErrorMiddleware from '../middlewares/ValidationErrorMiddleware'
import MalformedDataMiddleware from '../middlewares/MalformedDataMiddleware'
import GenericErrorMiddleware from '../middlewares/GenericErrorMiddleware'

/**
 * Dependency Injection Container.
 * @class Container
 */
class Container {
    public systemController: SystemController = new SystemController()
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
    private clientRepository: ClientRepository = new ClientRepository(Client)
    public clientService: ClientService = new ClientService(this.clientRepository)
    public clientController: ClientController = new ClientController(this.clientService)
    public trackRequestValidator: TrackRequestValidator = new TrackRequestValidator(this.clientService)
    public registerClientRequestValidator: RegisterClientRequestValidator = new RegisterClientRequestValidator(this.clientService)
}

export default new Container()
