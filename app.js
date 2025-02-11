import dotenv from 'dotenv'
import express from 'express'
import bodyParser from 'body-parser'
import session from 'express-session'

import login from './src/routes/login.js'
import users from './src/routes/users.js'
import cities from './src/routes/cities.js'
import database from './src/config/database.js'
import installation from './src/routes/installation.js'
import bcrypt from 'bcrypt'
import User from './src/models/User.js'
dotenv.config()

const app = express()
const port = 5000

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 3600000
    }
}))

database.sync({ force: true })

app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/installation', installation)
app.use('/api/login', login)
app.use('/api/users', users)
app.use('/api/cities', cities)
app.get('/api', (req, res) => {
    res.status(200).send({ msg: 'OK!' })
})

app.listen(port, async () => {
    const AdminPassword = "senhaAdmin1"
    const crypt = await bcrypt.hash(AdminPassword, parseInt(process.env.ROUNDS))
    const AdmCreated = await User.create({
        email: 'admin@admin.com',
        password: crypt.toString(),
        admin: true
    })
    console.log("Application running on port " + port)
})

export default app
