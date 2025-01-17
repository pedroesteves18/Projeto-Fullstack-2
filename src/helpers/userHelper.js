
import UserBuilder from "../models/User/UserBuilder.js";
import User from "../models/User.js";
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
                    return {status: 400, msg: 'Credentials have already been used!'}
                }
            }
            result = await User.findOne({where: {email:email}})
            if(result){
                return {status: 400, msg: 'Credentials have already been used!'}
            }
            return null
        }
    },
    createUser: async function (email,password,admin) {
        let builder = new UserBuilder()
        await builder.setEmail(email).setPassword(password)
        let user = builder.build()

        let CreatedUser = await User.create({email:user.email,password:user.password,admin:admin})
        if(CreatedUser){
            return {status:200, msg:'User created!'}
        } else {
            return { status:400, msg:'User not created!' }
        }
    },
    listUsers: async function(){
        let Users = await User.findAll()
        if(Users){
            return {status:200, msg:'Users listed!', users: Users}
        } else {
            return {status:400, msg:'An error ocurred!'}
        }
    },
    listUser: async function(id){
        let user = await User.findOne({where: {id:id}})
        if(user){
            user.password = '******'
            return {status:200, msg:'User listed!', user: user}
        } else {
            return {status:400, msg:'An error ocurred!'}
        }
    }
}