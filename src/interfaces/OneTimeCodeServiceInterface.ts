import { OneTimeCode } from 'numeri-core'

/**
 * @interface OneTimeCodeServiceInterface
 */
export default interface OneTimeCodeServiceInterface {
    create(): Promise<OneTimeCode>
}
