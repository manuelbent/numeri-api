import { Model, DataTypes } from 'sequelize'
import sequelize from '../../database/sequelize'

/**
 * Represents an analytics event in the system.
 * @class AnalyticsEvent
 * @extends {Model}
 * @property {number} id The unique identifier for the event.
 * @property {number} trackingEventId The ID of the associated tracking event.
 * @property {string} eventType The type of the event (e.g., 'page_view', 'click').
 * @property {string} site The site where the event occurred.
 * @property {object|undefined} geolocation The geolocation data associated with the event.
 * @property {string|undefined} countryCode The country code associated with the event.
 * @property {Date|undefined} timestamp The timestamp when the event occurred.
 * @property {object} meta Additional metadata related to the event.
 */
export default class AnalyticsEvent extends Model {
    public id!: number
    public trackingEventId!: number
    public eventType!: string
    public site!: string
    public geolocation: Geolocation|undefined
    public countryCode: string|undefined
    public timestamp: Date|undefined
    public meta!: object
}

AnalyticsEvent.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    trackingEventId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'tracking_events',
            key: 'id'
        },
        onDelete: 'CASCADE',
        field: 'tracking_event_id',
    },
    eventType: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'event_type',
    },
    site: {
        type: DataTypes.STRING,
        allowNull: true
    },
    geolocation: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    countryCode: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'country_code',
    },
    timestamp: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    meta: {
        type: DataTypes.JSON,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'AnalyticsEvent',
    tableName: 'analytics_events',
    timestamps: false,
    indexes: [
        {
            fields: ['event_type', 'site', 'country_code'],
        }
    ]
})
