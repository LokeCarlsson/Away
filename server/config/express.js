import express from 'express'
import api from '../routes/api'
import secret from './secret/session_secret'
const app = express()
const PORT = 3001

export default () => {

    app.use((req, res, next) => {
        res.locals.user = req.session.user || false
        next()
    })

    app.use('/', api)

    app.use('*', (req, res) => {
        return res.redirect('/')
    })

    app.listen(PORT, () => {
        console.log('Express up. ' + PORT)
    })

}
