import express from 'express'
import installationHelper from '../helpers/installationHelper.js'

import users from './users.json' with {type: "json"}
import cities from './cities.json' with {type: "json"}

const router = express.Router()

router.get('/', async (req, res) => {
    if (installationHelper.installationGet() === 0) {
        await installationHelper.insertCities(cities)
        await installationHelper.insertUsers(users)
        res.status(200).send({ mensagem: 'Instalation done' })
    } else {
        res.status(300).send({ mensagem: 'Instalation declined' })
    }

})

export default router
