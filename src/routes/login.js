import express from 'express'

import middlewares from '../auth/middlewares.js'
import loginHelper from '../helpers/loginHelper.js'

const router = express.Router()

router.post('/', async (req, res) => {
    let email = req.body.email
    let password = req.body.password

    try {
        let userValidation = await loginHelper.verifyCredentials(email, password)

        if (userValidation.status === 400 || userValidation.status === 401) {
            res.status(userValidation.status).send({ msg: userValidation.msg })
            return;
        }

        let token = await middlewares.createToken(userValidation.user)

        if (token) {
            res.setHeader('token', token)
            req.session.token = token

            res.status(userValidation.status).send({ token: token, msg: userValidation.msg })
            return;
        }

        return res.status(500).send({ msg: 'Error creating token' })
    } catch (err) {
        res.status(400).send({ error: err.message })
    }
})

export default router
