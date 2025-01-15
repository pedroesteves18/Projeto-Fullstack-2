import UserModel from "./UserModel.js"
import bcrypt from 'bcrypt'
import dotenv from 'dotenv';
dotenv.config();

export default class UserBuilder extends UserModel {
    constructor(){
        super()
        this.user = new UserModel()
    }

    setEmail(email){
        this.user.email = email
        return this
    }

    async setPassword(password){
        this.user.password = await (bcrypt.hash(password, parseInt(process.env.ROUNDS)))
        return this
    }
    build(){
        return this.user
    }
}