import bcrypt from 'bcrypt'
import dotenv from 'dotenv';
dotenv.config();
import User from '../models/User.js';
import sanitizer from '../auth/sanitizer.js';

export default {

    verifyCredentials: async function(email,password){
        if(!email || !password){
            return { status: 400, msg: 'Email and password are required!' };
        } else {
            let sanitized = sanitizer.sanitize({email,password})
            email = sanitized.email
            password = sanitized.password
            if(sanitized.msg !== undefined && sanitized.msg !== null){
                console.log(sanitized.msg)
            }
            const UserFind = await User.findOne({where: {email: email}})
            if(UserFind){
                let result = await bcrypt.compare(password, UserFind.password)
                if(result){
                    return {status: 200,msg: 'User logged!', user: {id: UserFind.id,email,password,admin: UserFind.admin}}
                } else {
                    return {status: 401,msg: 'Invalid credentials'}
                }
            } else {
                return {status: 401,msg: 'Invalid credentials'}
            }
        }
    }

}