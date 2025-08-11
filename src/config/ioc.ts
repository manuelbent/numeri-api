// common resources
import {
    ClientRepository,
    TrackingEventRepository,
    AnalyticsEventRepository,
    OneTimeCodeRepository,
    ClientRepositoryInterface,
    TrackingEventRepositoryInterface,
    AnalyticsEventRepositoryInterface
} from 'numeri-core'
// interfaces
import OneTimeCodeRepositoryInterface from 'numeri-core/dist/src/interfaces/OneTimeCodeRepositoryInterface'
import OneTimeCodeServiceInterface from '../interfaces/OneTimeCodeServiceInterface'
import ClientServiceInterface from '../interfaces/ClientServiceInterface'
import TrackingEventServiceInterface from '../interfaces/TrackingEventServiceInterface'
import AnalyticsEventServiceInterface from '../interfaces/AnalyticsEventServiceInterface'
// controllers
import SystemController from '../controllers/SystemController'
import TrackingController from '../controllers/TrackingController'
import AnalyticsController from '../controllers/AnalyticsController'
import ClientController from '../controllers/ClientController'
import OneTimeCodeController from '../controllers/OneTimeCodeController'
// services
import TrackingEventService from '../services/TrackingEventService'
import AnalyticsEventService from '../services/AnalyticsEventService'
import ClientService from '../services/ClientService'
import OneTimeCodeService from '../services/OneTimeCodeService'
// validators
import GetAnalyticsValidator from '../validators/GetAnalyticsValidator'
import TrackRequestValidator from '../validators/TrackRequestValidator'
import RegisterClientRequestValidator from '../validators/RegisterClientRequestValidator'
import CreateOneTimeCodeRequestValidator from '../validators/CreateOneTimeCodeRequestValidator'
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
    private _systemController?: SystemController
    private _validationErrorMiddleware?: ValidationErrorMiddleware
    private _malformedDataMiddleware?: MalformedDataMiddleware
    private _requestIdMiddleware?: RequestIdMiddleware
    private _genericErrorMiddleware?: GenericErrorMiddleware
    private _trackingEventRepository?: TrackingEventRepositoryInterface
    private _trackingEventService?: TrackingEventServiceInterface
    private _trackingController?: TrackingController
    private _analyticsEventRepository?: AnalyticsEventRepositoryInterface
    private _analyticsEventService?: AnalyticsEventServiceInterface
    private _analyticsController?: AnalyticsController
    private _clientRepository?: ClientRepositoryInterface
    private _clientService?: ClientServiceInterface
    private _clientController?: ClientController
    private _getAnalyticsValidator?: GetAnalyticsValidator
    private _trackRequestValidator?: TrackRequestValidator
    private _createOneTimeCodeRequestValidator?: CreateOneTimeCodeRequestValidator
    private _oneTimeCodeRepository?: OneTimeCodeRepositoryInterface
    private _oneTimeCodeService?: OneTimeCodeServiceInterface
    private _oneTimeCodeController?: OneTimeCodeController
    private _registerClientRequestValidator?: RegisterClientRequestValidator

    public get systemController(): SystemController {
        return this._systemController ??= new SystemController()
    }

    public get validationErrorMiddleware(): ValidationErrorMiddleware {
        return this._validationErrorMiddleware ??= new ValidationErrorMiddleware()
    }

    public get malformedDataMiddleware(): MalformedDataMiddleware {
        return this._malformedDataMiddleware ??= new MalformedDataMiddleware()
    }

    public get requestIdMiddleware(): RequestIdMiddleware {
        return this._requestIdMiddleware ??= new RequestIdMiddleware()
    }

    public get genericErrorMiddleware(): GenericErrorMiddleware {
        return this._genericErrorMiddleware ??= new GenericErrorMiddleware()
    }

    public get trackingEventRepository(): TrackingEventRepositoryInterface {
        return this._trackingEventRepository ??= new TrackingEventRepository()
    }

    public get trackingEventService(): TrackingEventServiceInterface {
        return this._trackingEventService ??= new TrackingEventService(this.trackingEventRepository)
    }

    public get trackingController(): TrackingController {
        return this._trackingController ??= new TrackingController(this.trackingEventService)
    }

    public get analyticsEventRepository(): AnalyticsEventRepositoryInterface {
        return this._analyticsEventRepository ??= new AnalyticsEventRepository()
    }

    public get analyticsEventService(): AnalyticsEventServiceInterface {
        return this._analyticsEventService ??= new AnalyticsEventService(this.analyticsEventRepository)
    }

    public get analyticsController(): AnalyticsController {
        return this._analyticsController ??= new AnalyticsController(this.analyticsEventService)
    }

    public get clientRepository(): ClientRepositoryInterface {
        return this._clientRepository ??= new ClientRepository()
    }

    public get clientService(): ClientServiceInterface {
        return this._clientService ??= new ClientService(this.clientRepository)
    }

    public get clientController(): ClientController {
        return this._clientController ??= new ClientController(this.clientService)
    }

    public get getAnalyticsValidator(): GetAnalyticsValidator {
        return this._getAnalyticsValidator ??= new GetAnalyticsValidator(this.clientService)
    }

    public get trackRequestValidator(): TrackRequestValidator {
        return this._trackRequestValidator ??= new TrackRequestValidator(this.clientService)
    }

    public get createOneTimeCodeRequestValidator(): CreateOneTimeCodeRequestValidator {
        return this._createOneTimeCodeRequestValidator ??= new CreateOneTimeCodeRequestValidator()
    }

    public get oneTimeCodeRepository(): OneTimeCodeRepositoryInterface {
        return this._oneTimeCodeRepository ??= new OneTimeCodeRepository()
    }

    public get oneTimeCodeService(): OneTimeCodeServiceInterface {
        return this._oneTimeCodeService ??= new OneTimeCodeService(this.oneTimeCodeRepository)
    }

    public get oneTimeCodeController(): OneTimeCodeController {
        return this._oneTimeCodeController ??= new OneTimeCodeController(this.oneTimeCodeService)
    }

    public get registerClientRequestValidator(): RegisterClientRequestValidator {
        return this._registerClientRequestValidator ??= new RegisterClientRequestValidator(this.clientService, this.oneTimeCodeService)
    }

    // setter to allow mocking in tests
    public set oneTimeCodeRepository(repository: OneTimeCodeRepositoryInterface) {
        this._oneTimeCodeRepository = repository
    }

    // setter to allow mocking in tests
    public set clientRepository(repository: ClientRepositoryInterface) {
        this._clientRepository = repository
    }

    // setter to allow mocking in tests
    public set trackingEventRepository(repository: TrackingEventRepositoryInterface) {
        this._trackingEventRepository = repository
    }
}

export default new Container()
