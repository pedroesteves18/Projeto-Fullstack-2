import express from 'express'

import middlewares from '../auth/middlewares.js'
import citiesHelpers from '../helpers/citiesHelper.js'
import client from '../config/cache.js'

const router = express.Router()

router.get('/', middlewares.verifyToken, async (req, res) => {
    try {
        let response = await citiesHelpers.listCities()
        res.status(response.status).send({ msg: response.msg, cities: response.cities })
    } catch (err) {
        res.status(400).send({ error: err.message })
    }
})

router.get('/:city', middlewares.verifyToken, async (req, res) => {
    try {
        let response = await citiesHelpers.listCity((req.params.city).toString())
        res.status(response.status).send({ msg: response.msg })
    } catch (err) {
        res.status(400).send({ error: err.message })
    }
})

router.post('/', middlewares.verifyAdmin, async (req, res) => {
    try {
        let city = req.body

        if (citiesHelpers.verifyCity(city)) {
            let response = await citiesHelpers.creatCity(city, client)
            res.status(response.status).send({ msg: response.msg, })
            return
        }

        res.status(400).send({ msg: 'The values were not valid!' })
    } catch (err) {
        res.status(500).send({ error: err.message })
    }
})

router.delete('/:id', middlewares.verifyAdmin, async (req, res) => {
    try {
        let id = req.params.id
        let response = await citiesHelpers.deleteCity(id)
        res.status(response.status).send({ msg: response.msg })
    } catch (err) {
        res.status(500).send({ error: err.message })
    }
})

export default router