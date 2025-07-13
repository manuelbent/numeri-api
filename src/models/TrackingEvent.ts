import { Model, DataTypes } from 'sequelize'
import sequelize from '../../../database/sequelize'

interface Payload {
    readonly $ip?: string
    readonly $site: string
    readonly event: string
    readonly properties: object
    readonly timestamp?: Date
}

/**
 * Represents an analytics event in the system.
 * @class TrackingEvent
 * @extends {Model}
 * @property {number} id Unique identifier for the tracking event.
 * @property {string} uuid Universally unique identifier for the tracking event.
 * @property {Payload} payload The data associated with the tracking event.
 * @property {'pending'|'processing'|'processed'|'failed'} status The current status of the tracking event.
 * @property {number} retries The number of times the event has been retried.
 * @property {string|null} errorMessage The error message if the event processing failed, null otherwise.
 * @property {Date} processedAt The date and time when the event was processed.
 * @property {Date} createdAt The date and time when the event was created.
 */
export default class TrackingEvent extends Model {
    public id!: number
    public uuid!: string
    public payload!: Payload
    public status!: 'pending'|'processing'|'processed'|'failed'
    public retries!: number
    public errorMessage!: string|null
    public processedAt!: Date
    public createdAt!: Date
}

TrackingEvent.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true
    },
    payload: {
        type: DataTypes.JSON,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('pending', 'processing', 'processed', 'failed'),
        allowNull: false,
        defaultValue: 'pending'
    },
    retries: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    errorMessage: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'error_message'
    },
    processedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'processed_at'
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: 'created_at'
    },
}, {
    sequelize,
    modelName: 'TrackingEvent',
    tableName: 'tracking_events',
    timestamps: false,
})
