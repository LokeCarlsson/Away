'use strict'

const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const app = express()
const PORT = 3001
const secret = require('./secret/session_secret.js')

module.exports = () => {

    app.use(session({
        name: secret.NAME,
        secret: secret.SECRET,
        saveUninitialized: false,
        resave: false,
        httpOnly: true,
        cookie: {
            secure: false
        }
    }))

    app.use(bodyParser.json())

    app.use((req, res, next) => {
        res.locals.user = req.session.user || false
        next()
    })

    app.use('*', (req, res) => {
        return res.redirect('/')
    })

    app.listen(PORT, function () {
        console.log('Express up. ' + PORT)
    })

}
