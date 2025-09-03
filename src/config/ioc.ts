// common resources
import {
    ClientRepository,
    RawEventRepository,
    ProcessedEventRepository,
    OneTimeCodeRepository,
    ClientRepositoryInterface,
    RawEventRepositoryInterface,
    ProcessedEventRepositoryInterface
} from 'numeri-core'
// interfaces
import OneTimeCodeRepositoryInterface from 'numeri-core/dist/src/interfaces/OneTimeCodeRepositoryInterface'
import OneTimeCodeServiceInterface from '../interfaces/OneTimeCodeServiceInterface'
import ClientServiceInterface from '../interfaces/ClientServiceInterface'
import RawEventServiceInterface from '../interfaces/RawEventServiceInterface'
import ProcessedEventServiceInterface from '../interfaces/ProcessedEventServiceInterface'
import RedisServiceInterface from '../interfaces/RedisServiceInterface'
// controllers
import SystemController from '../controllers/SystemController'
import EventController from '../controllers/EventController'
import ClientController from '../controllers/ClientController'
import OneTimeCodeController from '../controllers/OneTimeCodeController'
// services
import EventService from '../services/EventService'
import ProcessedEventService from '../services/ProcessedEventService'
import ClientService from '../services/ClientService'
import OneTimeCodeService from '../services/OneTimeCodeService'
import RedisService from '../services/RedisService'
// validators
import RetrieveEventRequestValidator from '../validators/RetrieveEventRequestValidator'
import CreateEventRequestValidator from '../validators/CreateEventRequestValidator'
import RegisterClientRequestValidator from '../validators/RegisterClientRequestValidator'
import CreateOneTimeCodeRequestValidator from '../validators/CreateOneTimeCodeRequestValidator'
// middlewares
import RequestIdMiddleware from '../middlewares/RequestIdMiddleware'
import ValidationErrorMiddleware from '../middlewares/ValidationErrorMiddleware'
import MalformedDataMiddleware from '../middlewares/MalformedDataMiddleware'
import GenericErrorMiddleware from '../middlewares/GenericErrorMiddleware'
import CrawlerDetectionMiddleware from '../middlewares/CrawlerDetectionMiddlware'

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
    private _crawlerDetectionMiddleware?: CrawlerDetectionMiddleware
    private _eventController?: EventController
    private _rawEventRepository?: RawEventRepositoryInterface
    private _rawEventService?: RawEventServiceInterface
    private _processedEventRepository?: ProcessedEventRepositoryInterface
    private _processedEventService?: ProcessedEventServiceInterface
    private _clientRepository?: ClientRepositoryInterface
    private _clientService?: ClientServiceInterface
    private _clientController?: ClientController
    private _retrieveEventRequestValidator?: RetrieveEventRequestValidator
    private _createEventRequestValidator?: CreateEventRequestValidator
    private _createOneTimeCodeRequestValidator?: CreateOneTimeCodeRequestValidator
    private _oneTimeCodeRepository?: OneTimeCodeRepositoryInterface
    private _oneTimeCodeService?: OneTimeCodeServiceInterface
    private _oneTimeCodeController?: OneTimeCodeController
    private _registerClientRequestValidator?: RegisterClientRequestValidator
    private _redisService?: RedisServiceInterface

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

    public get crawlerDetectionMiddleware(): CrawlerDetectionMiddleware {
        return this._crawlerDetectionMiddleware ??= new CrawlerDetectionMiddleware()
    }
    
    public get eventController(): EventController {
        return this._eventController ??= new EventController(this.rawEventService, this.redisService)
    }

    public get rawEventRepository(): RawEventRepositoryInterface {
        return this._rawEventRepository ??= new RawEventRepository()
    }

    public get rawEventService(): RawEventServiceInterface {
        return this._rawEventService ??= new EventService(this.rawEventRepository)
    }

    public get processedEventRepository(): ProcessedEventRepositoryInterface {
        return this._processedEventRepository ??= new ProcessedEventRepository()
    }

    public get processedEventService(): ProcessedEventServiceInterface {
        return this._processedEventService ??= new ProcessedEventService(this.processedEventRepository)
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

    public get retrieveEventRequestValidator(): RetrieveEventRequestValidator {
        return this._retrieveEventRequestValidator ??= new RetrieveEventRequestValidator(this.clientService)
    }

    public get createEventRequestValidator(): CreateEventRequestValidator {
        return this._createEventRequestValidator ??= new CreateEventRequestValidator(this.clientService)
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

    public get redisService(): RedisServiceInterface {
        return this._redisService ??= new RedisService()
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
    public set rawEventRepository(repository: RawEventRepositoryInterface) {
        this._rawEventRepository = repository
    }

    // setter to allow mocking in tests
    public set redisService(service: RedisServiceInterface) {
        this._redisService = service
    }
}

export default new Container()
