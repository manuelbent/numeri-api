// common resources
import {
    ClientRepository,
    ClientRepositoryInterface,
    RawEventRepository,
    RawEventRepositoryInterface,
    ProcessedEventRepository,
    ProcessedEventRepositoryInterface,
    OneTimeCodeRepository,
    OneTimeCodeRepositoryInterface
} from 'numeri-core'
// system components
import SystemController from '../controllers/SystemController'
import RedisServiceInterface from '../interfaces/RedisServiceInterface'
import RedisService from '../services/RedisService'
// one-time code components
import OneTimeCodeServiceInterface from '../interfaces/OneTimeCodeServiceInterface'
import OneTimeCodeController from '../controllers/OneTimeCodeController'
import OneTimeCodeService from '../services/OneTimeCodeService'
// client components
import ClientServiceInterface from '../interfaces/ClientServiceInterface'
import ClientService from '../services/ClientService'
import ClientController from '../controllers/ClientController'
// event components
import EventServiceInterface from '../interfaces/EventServiceInterface'
import EventService from '../services/EventService'
import EventController from '../controllers/EventController'
// middlewares
import CrawlerDetectionMiddleware from '../middlewares/CrawlerDetectionMiddlware'
import MalformedDataMiddleware from '../middlewares/MalformedDataMiddleware'
import ValidationErrorMiddleware from '../middlewares/ValidationErrorMiddleware'
import GenericErrorMiddleware from '../middlewares/GenericErrorMiddleware'
import RequestIdMiddleware from '../middlewares/RequestIdMiddleware'
// validators
import CreateOneTimeCodeRequestValidator from '../validators/CreateOneTimeCodeRequestValidator'
import RegisterClientRequestValidator from '../validators/RegisterClientRequestValidator'
import CreateEventRequestValidator from '../validators/CreateEventRequestValidator'
import RetrieveEventRequestValidator from '../validators/RetrieveEventRequestValidator'

/**
 * Dependency Injection Container.
 * @class Container
 */
class Container {
    // system components
    private _systemController?: SystemController
    private _redisService?: RedisServiceInterface
    // one-time code components
    private _oneTimeCodeRepository?: OneTimeCodeRepositoryInterface
    private _oneTimeCodeService?: OneTimeCodeServiceInterface
    private _oneTimeCodeController?: OneTimeCodeController
    // client components
    private _clientRepository?: ClientRepositoryInterface
    private _clientService?: ClientServiceInterface
    private _clientController?: ClientController
    // event components
    private _rawEventRepository?: RawEventRepositoryInterface
    private _processedEventRepository?: ProcessedEventRepositoryInterface
    private _eventService?: EventServiceInterface
    private _eventController?: EventController
    // middlewares
    private _crawlerDetectionMiddleware?: CrawlerDetectionMiddleware
    private _malformedDataMiddleware?: MalformedDataMiddleware
    private _validationErrorMiddleware?: ValidationErrorMiddleware
    private _genericErrorMiddleware?: GenericErrorMiddleware
    private _requestIdMiddleware?: RequestIdMiddleware
    // validators
    private _createOneTimeCodeRequestValidator?: CreateOneTimeCodeRequestValidator
    private _registerClientRequestValidator?: RegisterClientRequestValidator
    private _createEventRequestValidator?: CreateEventRequestValidator
    private _retrieveEventRequestValidator?: RetrieveEventRequestValidator

    public get systemController(): SystemController {
        return this._systemController ??= new SystemController()
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

    public get clientRepository(): ClientRepositoryInterface {
        return this._clientRepository ??= new ClientRepository()
    }

    public get clientService(): ClientServiceInterface {
        return this._clientService ??= new ClientService(this.clientRepository)
    }

    public get clientController(): ClientController {
        return this._clientController ??= new ClientController(this.clientService)
    }

    public get rawEventRepository(): RawEventRepositoryInterface {
        return this._rawEventRepository ??= new RawEventRepository()
    }

    public get processedEventRepository(): ProcessedEventRepositoryInterface {
        return this._processedEventRepository ??= new ProcessedEventRepository()
    }

    public get eventService(): EventServiceInterface {
        return this._eventService ??= new EventService(this.rawEventRepository, this.processedEventRepository)
    }

    public get eventController(): EventController {
        return this._eventController ??= new EventController(this.eventService, this.redisService)
    }

    public get crawlerDetectionMiddleware(): CrawlerDetectionMiddleware {
        return this._crawlerDetectionMiddleware ??= new CrawlerDetectionMiddleware()
    }

    public get malformedDataMiddleware(): MalformedDataMiddleware {
        return this._malformedDataMiddleware ??= new MalformedDataMiddleware()
    }

    public get validationErrorMiddleware(): ValidationErrorMiddleware {
        return this._validationErrorMiddleware ??= new ValidationErrorMiddleware()
    }

    public get genericErrorMiddleware(): GenericErrorMiddleware {
        return this._genericErrorMiddleware ??= new GenericErrorMiddleware()
    }

    public get requestIdMiddleware(): RequestIdMiddleware {
        return this._requestIdMiddleware ??= new RequestIdMiddleware()
    }

    public get createOneTimeCodeRequestValidator(): CreateOneTimeCodeRequestValidator {
        return this._createOneTimeCodeRequestValidator ??= new CreateOneTimeCodeRequestValidator()
    }

    public get registerClientRequestValidator(): RegisterClientRequestValidator {
        return this._registerClientRequestValidator ??= new RegisterClientRequestValidator(this.clientService, this.oneTimeCodeService)
    }

    public get createEventRequestValidator(): CreateEventRequestValidator {
        return this._createEventRequestValidator ??= new CreateEventRequestValidator(this.clientService)
    }

    public get retrieveEventRequestValidator(): RetrieveEventRequestValidator {
        return this._retrieveEventRequestValidator ??= new RetrieveEventRequestValidator(this.clientService)
    }

    public get redisService(): RedisServiceInterface {
        return this._redisService ??= new RedisService()
    }

    public set redisService(service: RedisServiceInterface) {
        this._redisService = service
    }

    public set oneTimeCodeRepository(repository: OneTimeCodeRepositoryInterface) {
        this._oneTimeCodeRepository = repository
    }

    public set clientRepository(repository: ClientRepositoryInterface) {
        this._clientRepository = repository
    }

    public set rawEventRepository(repository: RawEventRepositoryInterface) {
        this._rawEventRepository = repository
    }

    public set processedEventRepository(repository: ProcessedEventRepositoryInterface) {
        this._processedEventRepository = repository
    }
}

export default new Container()
