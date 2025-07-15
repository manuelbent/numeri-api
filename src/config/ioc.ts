import {
    Client,
    ClientRepository,
    TrackingEvent,
    TrackingEventRepository,
    AnalyticsEvent,
    AnalyticsEventRepository
} from 'numeri-core'
import SystemController from '../controllers/SystemController'
import TrackRequestValidator from '../validators/TrackRequestValidator'
import ValidationErrorMiddleware from '../middlewares/ValidationErrorMiddleware'
import MalformedDataMiddleware from '../middlewares/MalformedDataMiddleware'
import RequestIdMiddleware from '../middlewares/RequestIdMiddleware'
import GenericErrorMiddleware from '../middlewares/GenericErrorMiddleware'
import TrackingEventService from '../services/TrackingEventService'
import TrackingController from '../controllers/TrackingController'
import AnalyticsEventService from '../services/AnalyticsEventService'
import AnalyticsController from '../controllers/AnalyticsController'
import ClientService from '../services/ClientService'
import ClientController from '../controllers/ClientController'
import RegisterClientRequestValidator from '../validators/RegisterClientRequestValidator'

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
