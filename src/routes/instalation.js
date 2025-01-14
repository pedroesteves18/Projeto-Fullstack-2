import express from 'express'
import database from '../config/database.js'
import cities from './cities.json' assert {type:"json"}
import users from './users.json' assert {type:"json"}
import instalationHelper from '../helpers/instalationHelper.js'
import City from '../models/City.js'
import User from '../models/User.js'


const router = express.Router()

router.get('/', async (req,res) => {
    if(instalationHelper.instalationGet() === 0){

        await instalationHelper.insertCities(cities,database,City)
        await instalationHelper.insertUsers(users,database,User)
        res.status(200).send({mensagem: 'Instalation done'})
    } else {
        res.status(300).send({mensagem: 'Instalation declined'})
    }

})

export default router