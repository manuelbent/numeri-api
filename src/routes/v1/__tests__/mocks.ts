import { vi } from 'vitest'
import { Client, OneTimeCode } from 'numeri-core'
import RepositoryInterface from 'numeri-core/dist/src/interfaces/RepositoryInterface'

class MockRepository<T> implements RepositoryInterface<T> {
    protected items: T[] = []

    clear(): void {
        this.items = []
    }

    async create(data: object): Promise<T> {
        const item = data as T
        this.items.push(item)
        return vi.fn(() => item)()
    }

    async update(id: string|number|any, data: object): Promise<void> {
        throw new Error('Method not implemented.')
    }

    async delete(id: string|number): Promise<void> {
        throw new Error('Method not implemented.')
    }

    async findById(id: string|number): Promise<T|null> {
        throw new Error('Method not implemented.')
    }

    async find(where: object): Promise<T[]> {
        return this.items.filter(item => {
            return Object.keys(where).every(key => item[key as keyof T] === where[key as keyof typeof where])
        })
    }

    async count(where: object): Promise<number> {
        return this.items.filter(item => {
            return Object.keys(where).every(key => item[key as keyof T] === where[key as keyof typeof where])
        }).length
    }
}

export class MockOneTimeCodeRepository extends MockRepository<OneTimeCode> {
    expire(code: string): void {
        const index = this.items.findIndex(i => i.code === code)
        this.items[index].expiresAt = new Date(Date.now() - 1000)
    }

    use(code: string): void {
        const index = this.items.findIndex(i => i.code === code)
        this.items[index].usedAt = new Date(Date.now() - 1000)
    }
}

export class MockClientRepository extends MockRepository<Client> {}
