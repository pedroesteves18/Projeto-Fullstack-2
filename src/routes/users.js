import express from 'express'

import middlewares from '../auth/middlewares.js'
import userHelper from '../helpers/userHelper.js'

const router = express.Router()

router.post('/registration', async (err,res) => {
    let email = req.body.email
    let password = req.body.password
    try{

        let notValid = await userHelper.verifyCredentials(email,password)
        if(notValid != null){
            return res.status(notValid.status).send({msg:notValid.msg})
        }
        let response = await userHelper.createUser(email,password)
        return res.status(response.status).send({msg:response.msg})
    } catch(err){
        res.status(400).send({error: err})
    }
})