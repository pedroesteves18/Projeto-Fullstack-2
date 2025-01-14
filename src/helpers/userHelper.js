
import UserBuilder from "../models/User/UserBuilder";
import User from "../models/User";
import bcrypt from 'bcrypt'

export default {
    verifyCredentials: async function(email,password){
        if(!email || !password){
            return { status: 400, msg: 'Email and password are required!' };
        } else {
            let users = await User.findAll()
            let result = null
            for(const user of users){
                result = await bcrypt.compare(password, user.password)
                if(result) {
                    break
                }
            }
            result = await User.findOne({where: {id:id}})
            if(result){
                return {status: 400, msg: 'Credentials have already been used!'}
            }
            return null
        }
    },
    createUser: async function (email,password) {
        let builder = new UserBuilder()
        builder.setEmail(email).setPassword(password).build();
        let CreatedUser = await User.create({email:email,password:password})
        if(CreatedUser){
            return {status:200, msg:'User created!'}
        } else {
            return { status:400, msg:'User not created!' }
        }
    }
}