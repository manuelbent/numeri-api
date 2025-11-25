import { OneTimeCode } from '@manuelbent/numeri-core'

/**
 * @interface OneTimeCodeServiceInterface
 */
export default interface OneTimeCodeServiceInterface {
    create(): Promise<OneTimeCode>
    getByCode(code: string): Promise<OneTimeCode>
}
