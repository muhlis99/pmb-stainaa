const express =  require('express')
const cors =  require('cors')
const bodyparser = require('body-parser')
const fileUpload = require('express-fileupload')
const session = require('express-session')
const sequelizeStore = require('connect-session-sequelize')
const db = require('./config/database.js')

const app =  express()
const sessionStore = sequelizeStore(session.Store)
const store = new sessionStore({
    db: db
})
app.use(cors({
    credentials : true,
    origin : "http://localhost:3000"
}))
app.use(session({
    secret: "abcdefghijklmnopqrstuvwxyz123456789",
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto'
    }
}))
app.use(fileUpload())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))

const registrasi =  require('./router/Rregistrasi.js')
const login =  require('./router/Rlogin.js')

app.use('/v1/registrasi', registrasi)
app.use('/v1/login', login)

app.listen(3001, (req, res) => {
    console.log(`APP IS RUNNING`)
})
