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

const equipment = require('./router/Requipment.js')
const registrasi =  require('./router/Rregistrasi.js')
const login =  require('./router/Rlogin.js')
const formulir = require('./router/Rformulir.js')
const pembayaran = require('./router/Rpembayaran.js')
const transaksi = require('./router/Rtransaksi.js')
const soal = require('./router/Rsoal.js')

app.use('/v1/equipment', equipment)
app.use('/v1/registrasi', registrasi)
app.use('/v1/login', login)
app.use('/v1/formulir', formulir)
app.use('/v1/pembayaran', pembayaran)
app.use('/v1/transaksi', transaksi)
app.use('/v1/soal', soal)

app.listen(3001, (req, res) => {
    console.log(`APP IS RUNNING`)
})
