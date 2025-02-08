import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize'

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
    }
);

sequelize.authenticate().then(() => {
    console.log('Connection authorized')
}).catch((err) => {
    console.log('Error encountered, ', err)
})

export default sequelize
