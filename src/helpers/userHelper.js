
import UserBuilder from "../models/User/UserBuilder.js";
import User from "../models/User.js";
import bcrypt from 'bcrypt'
import cache from '../config/cache.js'
import sanitizer from "../auth/sanitizer.js";

export default {
    verifyCredentials: async function(email,password){
        if(!email || !password){
            console.log('Failed to create a user, {"Email and password are required!"}')
            return { status: 400, msg: 'Email and password are required!' };
        } else {
            let sanitized = sanitizer.sanitize({email,password})
            email = sanitized.email
            password = sanitized.password
            if(sanitized.msg !== undefined && sanitized.msg !== null){
                console.log(sanitized.msg)
            }
            
            let users = await User.findAll()
            let result = null
            for(const user of users){
                result = await bcrypt.compare(password, user.password)
                if(result) {
                    console.log('Failed to create a user, {"Credentials have already been used, Same password!"}')
                    return {status: 400, msg: 'Credentials have already been used!'}
                }
            }
            result = await User.findOne({where: {email:email}})
            if(result){
                console.log('Failed to create a user, {"Credentials have already been used, same email!"}')
                return {status: 400, msg: 'Credentials have already been used!'}
            }
            return null
        }
    },
    createUser: async function (email,password,admin) {
        let sanitized = sanitizer.sanitize({email,password})
        email = sanitized.email
        password = sanitized.password
        if(sanitized.msg !== undefined && sanitized.msg !== null){
            console.log(sanitized.msg)
        }

        let builder = new UserBuilder()
        await builder.setEmail(email).setPassword(password)
        let user = builder.build()

        let CreatedUser = await User.create({email:user.email,password:user.password,admin:admin})
        if(CreatedUser){
            cache.del('users_cache')
            let Users = await User.findAll()
            Users = Users.map(user => user.toJSON())
            cache.set('users_cache',Users)


            return {status:200, msg:'User created!'}
        } else {
            return { status:400, msg:'User not created!' }
        }
    },
    listUsers: async function(){
        let Users = cache.get('users_cache')
        if(Users){
            return {status:200, msg:'Users listed!', users: Users}
        } else {
            return {status:400, msg:'An error ocurred!'}
        }
    },
    listUser: async function(id){
        let Users = cache.get('users_cache')
        let user

        let sanitized = sanitizer.sanitize({id})
        id = sanitized.id
        if(sanitized.msg !== undefined && sanitized.msg !== null){
            console.log(sanitized.msg)
        }

        for(const user1 of Users){
            if(user1.id === id){
                user = user1
            }
        }
        if(user){
            user.password = '******'
            return {status:200, msg:'User listed!', user: user}
        } else {
            return {status:400, msg:'An error ocurred!'}
        }
    },
    removeUser: async function(id){
        let sanitized = sanitizer.sanitize({id})
        id = sanitized.id
        if(sanitized.msg !== undefined && sanitized.msg !== null){
            console.log(sanitized.msg)
        }
        let user = await User.findOne({where: {id:id}})
        if(user){
            let RemovedUser = await User.destroy({where: {id:id}})
            if(RemovedUser){
                cache.del('users_cache')
                let Users = await User.findAll()
                Users = Users.map(user => user.toJSON())
                cache.set('users_cache',Users)
                return {status:200, msg:'User removed!'}
            } else {
                return {status: 400, msg:'An error ocurred!'}
            }
        }
        return {status:400, msg:'Any User was find with this ID'}
    }
}