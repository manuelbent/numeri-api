import { Op, Attributes, CreationAttributes, Identifier, Model, ModelStatic, WhereAttributeHashValue, } from 'sequelize'
import RepositoryInterface from '../../interfaces/RepositoryInterface'

/**
 * Base repository class that implements common CRUD operations for Sequelize models.
 * @template T - The type of the model.
 */
export default class BaseRepository<T extends Model> implements RepositoryInterface<T> {
    model: ModelStatic<T>

    constructor(model: ModelStatic<T>) {
        this.model = model
    }

    private sequelizeQuery(query: any): any {
        if (Array.isArray(query)) {
            return query.map(this.sequelizeQuery)
        }

        if (query && typeof query === 'object') {
            const sequelized: any = {}
            for (const key in query) {
                if (key.startsWith('$')) {
                    const opKey = key.replace('$', '')
                    sequelized[Op[opKey as keyof typeof Op]] = this.sequelizeQuery(query[key])
                } else {
                    sequelized[key] = this.sequelizeQuery(query[key])
                }
            }
            return sequelized
        }

        return query
    }

    async create(data: CreationAttributes<T>) {
        return this.model.create(data)
    }

    async update(id: Identifier, data: CreationAttributes<T>) {
        await this.model.update(data, { where: { id: id as any } })
    }

    async delete(id: Identifier) {
        await this.model.destroy({ where: { id: id as any } })
    }

    async findById(id: Identifier) {
        return this.model.findByPk(id)
    }

    async find(where: WhereAttributeHashValue<Attributes<T>[string]>) {
        return this.model.findAll({ where: this.sequelizeQuery(where) })
    }
}
