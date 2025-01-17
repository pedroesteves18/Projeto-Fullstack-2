import express from 'express'
import dotenv from 'dotenv';
import bodyParser from 'body-parser'
import User from './src/models/User.js'
import City from './src/models/City.js'
import database from './src/config/database.js'
import instalation from './src/routes/instalation.js'
import login from './src/routes/login.js'
import users from './src/routes/users.js'
import cities from './src/routes/cities.js'


dotenv.config();
import session from 'express-session';
const app = express()
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
}))


database.sync({force: true})

app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))


app.use('/instalation', instalation)
app.use('/login', login)
app.use('/users', users)
app.use('/cities', cities)
app.get('/', (req,res) => {
    res.status(200).send({msg: 'OK!'})
})

app.listen(3000)

export default app