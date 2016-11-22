import express from 'express'
import bodyParser from 'body-parser'
import api from '../routes/api'
import cors from 'cors'
import secret from './secret/session_secret'
const app = express()
const PORT = 3001

export default () => {
    app.use(cors())

    app.use(bodyParser.json())

    app.use('/', api)

    app.use('*', (req, res) => {
        return res.send('Not valid')
    })

    app.listen(PORT, () => {
        console.log('Express up. ' + PORT)
    })

}
