import { Model, DataTypes } from 'sequelize'
import sequelize from '../../database/sequelize'

/**
 * Represents a client in the system.
 * @class Client
 * @extends {Model}
 * @property {number} id The unique identifier for the client.
 * @property {string} clientId The unique client ID.
 * @property {string} clientSecretHash The hashed secret for the client.
 * @property {string} name The name of the client.
 * @property {string} ownerEmail The email of the client owner.
 * @property {object} allowedOrigins The list of allowed origins for the client.
 * @property {Date} createdAt The date when the client was created.
 * @property {Date} lastUsedAt The date when the client was last used.
 * @property {boolean} isRevoked Indicates if the client is revoked.
 * @property {Date} revokedAt The date when the client was revoked.
 */
export default class Client extends Model {
    public id!: number
    public clientId!: string
    public clientSecretHash!: string
    public name: string|undefined
    public ownerEmail: string|undefined
    public allowedOrigins!: object
    public createdAt!: Date
    public lastUsedAt: Date|undefined
    public isRevoked!: boolean
    public revokedAt: Date|undefined
}

Client.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    clientId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: 'client_id',
    },
    clientSecretHash: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'client_secret_hash',
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ownerEmail: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'owner_email',
    },
    allowedOrigins: {
        type: DataTypes.JSON,
        allowNull: false,
        field: 'allowed_origins',
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: 'created_at',
    },
    lastUsedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'last_used_at',
    },
    isRevoked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: 'is_revoked',
    },
    revokedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'revoked_at',
    }
}, {
    sequelize,
    modelName: 'Client',
    tableName: 'clients',
    timestamps: false,
    indexes: [
        {
            fields: ['client_id'],
        }
    ]
})
