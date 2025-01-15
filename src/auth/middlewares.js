import  jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();


async function verifyToken(req,res,next){
    try{
        const token = req.session.token
        if(!token){
            return res.status(401).send({ msg: 'Token not given' });
        }

        jwt.verify(token,process.env.SECRET_KEY, (err,decoded) => {
            if(err){
                return res.status(401).send({msg:'Token invalid!'})
            }
            req.userId = decoded.id
            req.admin = decoded.admin
            next()
        })
    }catch(err){
        return res.status(404).send({err: err.message})
    }
}


async function createToken(user){
    try{

        let token = jwt.sign({id:user.id, admin:user.admin}, process.env.SECRET_KEY, {expiresIn: process.env.JWT_EXPIRATION})
        return token

    }catch(err){
        return {status: 404, msg: 'Error ocurred while creating a token: '}
    }
}
async function verifyAdmin(req,res,next){
    try{
        await verifyToken(req,res, () => {
            if (req.admin != true) {
                return res.status(403).send({ msg: 'Admin privileges required' });
            }
            next()
        })
        
    }catch(err){
        return res.status(500).send({err: 'Error while verifying admin privileges', msg:err.message})
    }
}

export default {verifyToken,verifyAdmin,createToken}