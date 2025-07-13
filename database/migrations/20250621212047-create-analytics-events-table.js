'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('analytics_events', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            tracking_event_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'tracking_events',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            event_type: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            site: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            geolocation: {
                type: Sequelize.JSON,
                allowNull: true,
            },
            country_code: {
                type: Sequelize.STRING(2),
                allowNull: true,
            },
            timestamp: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
            meta: {
                type: Sequelize.JSON,
                allowNull: true,
            },
        })
    },

    async down(queryInterface) {
        await queryInterface.dropTable('analytics_events')
    }
}
