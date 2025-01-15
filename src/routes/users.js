import express from 'express'

import middlewares from '../auth/middlewares.js'
import userHelper from '../helpers/userHelper.js'

const router = express.Router()

router.post('/registration', async (req,res) => {
    let email = req.body.email
    let password = req.body.password
    let admin = req.body.admin
    try{

        let response = await userHelper.verifyCredentials(email,password)
        if(response === null){
            response = await userHelper.createUser(email,password,admin)
        }
        return res.status(response.status).send({msg:response.msg})
    } catch(err){
        res.status(400).send({error: err.message})
    }
})

router.get('/', middlewares.verifyAdmin,async (req,res) => {
    try{
        let users = await userHelper.listUsers()
        return res.status(users.status).send({msg: users.msg, users: users.users})
    }catch(err){
        return res.status(400).send({error:err.message})
    }


})

export default router