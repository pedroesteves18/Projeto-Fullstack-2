import express from 'express'
import cities from './cities.json' assert {type:"json"}
import users from './users.json' assert {type:"json"}
import instalationHelper from '../helpers/instalationHelper.js'


const router = express.Router()

router.get('/', async (req,res) => {
    if(instalationHelper.instalationGet() === 0){

        await instalationHelper.insertCities(cities)
        await instalationHelper.insertUsers(users)
        res.status(200).send({mensagem: 'Instalation done'})
    } else {
        res.status(300).send({mensagem: 'Instalation declined'})
    }

})

export default router