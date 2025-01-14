import  jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();
import User from '../models/User.js'
import bcrypt from 'bcrypt'

export default {
    createToken: async function(user){
        try{

            let token = jwt.sign({id:user.id, admin:user.admin}, process.env.SECRET_KEY, {expiresIn: process.env.JWT_EXPIRATION})
            return token

        }catch(err){
            return {status: 404, msg: 'Error ocurred while creating a token: ' + err}
        }
    },
    verifyToken: async function(req,res,next){
        try{
            const token = req.session.token
            if(!token){
                return {status: 401, msg: 'Token not given'}
            }

            jwt.verify(token,process.env.SECRET_KEY, (err,decoded) => {
                if(err){
                    return res.status(401).send({msg:'Token invalid!'})
                }
                req.userId = decoded.id
                next()
            })
        }catch(err){
            return res.status(404).send({err: err})
        }
    }
}