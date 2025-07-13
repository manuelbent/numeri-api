export default interface RepositoryInterface<T> {
    create(data: object): Promise<T>

    update(id: string|number|any, data: object): Promise<void>

    delete(id: string|number): Promise<void>

    findById(id: string|number): Promise<T|null>

    find(where: object): Promise<T[]>
}
