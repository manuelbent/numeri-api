'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('tracking_events', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            uuid: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
                unique: true
            },
            payload: {
                type: Sequelize.JSON,
                allowNull: false,
            },
            status: {
                type: Sequelize.ENUM,
                values: ['pending', 'processing', 'processed', 'failed'],
                defaultValue: 'pending',
                allowNull: false
            },
            retries: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
                allowNull: false
            },
            error_message: {
                type: Sequelize.STRING,
                allowNull: true
            },
            processed_at: {
                type: Sequelize.DATE,
                allowNull: true
            },
            created_at: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW,
                allowNull: false
            },
        })
    },

    async down(queryInterface) {
        await queryInterface.dropTable('tracking_events')
    }
}
