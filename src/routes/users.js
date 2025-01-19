import express from 'express'

import middlewares from '../auth/middlewares.js'
import userHelper from '../helpers/userHelper.js'


const router = express.Router()

router.post('/registration', middlewares.admCreationToken,async (req,res) => {
    let email = req.body.email
    let password = req.body.password
    let admin = req.admin
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

router.get('/:id', middlewares.verifyToken,async (req,res) => {
    try{
        if(req.admin === true){
            let user = await userHelper.listUser(parseInt(req.params.id))
            return res.status(user.status).send({msg: user.msg, user: user.user})
        } 
    
        let user = await userHelper.listUser(req.userId)
        if(parseInt(req.params.id) === parseInt(req.userId)){
            return res.status(200).send({user: user.user})
        }
        console.log('User tried to list another User, {"User can list only its own data"}')
        return res.status(300).send({msg:"User can list only it's own data", user: user.user})
    }catch(err){
        return res.status(400).send({error: err.message})
    }
})

router.delete('/:id', middlewares.verifyToken, async(req,res) => {
    try{
        if(req.admin === true){
            let user = await userHelper.removeUser(parseInt(req.params.id))
            return res.status(user.status).send({msg: user.msg})
        } 

        if(parseInt(req.params.id) === parseInt(req.userId)){
            let user = await userHelper.removeUser(req.userId)
            return res.status(user.status).send({msg: user.msg})
        }
        console.log('User tried to delete another User, {"User cannot delete another User"}')
        return res.status(300).send({msg:"User cannot delete another User!"})

    }catch(err){
        return res.status(400).send({error: err.message})
    }
})

export default router