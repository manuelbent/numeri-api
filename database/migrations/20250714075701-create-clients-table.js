'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('clients', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            client_id: {
                type: Sequelize.STRING(64),
                allowNull: false,
                unique: true
            },
            name: {
                type: Sequelize.STRING(255),
                allowNull: true
            },
            owner_email: {
                type: Sequelize.STRING(255),
                allowNull: true
            },
            allowed_origins: {
                type: Sequelize.JSON,
                allowNull: true
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
            last_used_at: {
                type: Sequelize.DATE,
                allowNull: true
            },
            is_revoked: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            revoked_at: {
                type: Sequelize.DATE,
                allowNull: true
            }
        })
    },

    async down(queryInterface) {
        await queryInterface.dropTable('clients')
    }
}
