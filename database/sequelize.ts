import { Sequelize } from 'sequelize'

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database/numeri.sqlite',
    logging: false,
})

export default sequelize
