/**
 * @interface RedisServiceInterface
 */
export default interface RedisServiceInterface {
    publish(channel: string, message: string): Promise<number>
}
