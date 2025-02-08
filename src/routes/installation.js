import express from 'express'
import instalationHelper from '../helpers/instalationHelper.js'

import users from './users.json' with {type: "json"}
import cities from './cities.json' with {type: "json"}

const router = express.Router()

router.get('/', async (req, res) => {
    if (instalationHelper.instalationGet() === 0) {
        await instalationHelper.insertCities(cities)
        await instalationHelper.insertUsers(users)
        res.status(200).send({ mensagem: 'Instalation done' })
    } else {
        res.status(300).send({ mensagem: 'Instalation declined' })
    }

})

export default router
