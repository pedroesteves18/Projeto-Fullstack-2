import {DataTypes} from 'sequelize'
import sequelize from '../config/database.js'

const City = sequelize.define('City', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false
    },
    latitude: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    longitude: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    population: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

export default City