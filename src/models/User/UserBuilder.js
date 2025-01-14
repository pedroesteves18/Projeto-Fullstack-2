import UserModel from "./UserModel.js"

export default class UserBuilder extends UserModel {
    constructor(){
        this.user = new UserModel()
    }

    setEmail(email){
        this.UserModel.email = email
        return this
    }

    setPassword(password){
        this.UserModel.password = password
        return this
    }
    build(){
        return this.user
    }
}