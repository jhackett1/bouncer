const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const email = require('@sendgrid/mail')
const passwordless = require('passwordless')
const MongoStore = require('passwordless-mongostore')
const mongoose = require('mongoose')

const config = require("./config.json")

// Get routes
const authRoutes = require("./routes/authRoutes")
const agendaRoutes = require("./routes/agendaRoutes")

// Get models
const Attendee = require("./models/Attendee")
const Agendum = require("./models/Agendum")

// Config sendgrid
email.setApiKey(process.env.SENDGRID_API_KEY)

// Config database and connect
const url = process.env.MONGO_STRING
mongoose.connect(url, { 
    useNewUrlParser: true,
    dbName: process.env.DATABASE
 }, function(err, db) {
    if (err) throw err
    console.log("✅  Database connection open")
})

// Config auth
passwordless.init(new MongoStore(url),{ 
    allowTokenReuse: true 
})

passwordless.addDelivery(
    function(tokenToSend, uidToSend, recipient, callback) {
        email.send({
            to: recipient,
            from: config.replyTo,
            subject: config.subject,
            text: `${config.message} \n\nhttp://${config.redirectTo}/?token=${tokenToSend}&uid=${encodeURIComponent(uidToSend)}`,
        }, function(err, message) { 
            if(err) {
                console.log(err)
            }
            callback(err)
        })
})

// Config express
const server = express()
server.use(logger('dev'))
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended: false}))
server.use(cookieParser())
server.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}))
server.use(passwordless.sessionSupport())

// Every route will accept and attempt to validate a token
server.use(passwordless.acceptToken())

// Bind routes to URLs
server.use('/auth', authRoutes)
server.use(passwordless.restricted())
server.use('/agenda', agendaRoutes)

// Error handler
server.use((req, res)=>{
    res.status(404).json({
        message: "Route not found"
    })
})

// Listen for requests
const port = process.env.PORT || 4000
server.listen(port, ()=>{
    console.log(`✅  Server listening on port ${port}`)
})