import express from 'express'
import bodyParser from 'body-parser'
import blogApi from '../routes/blogApi.js'
import cors from 'cors'
import secret from './secret/session_secret'
const app = express()
const PORT = 3001

export default () => {
    app.use(cors())

    app.use(bodyParser.json())

    app.use('/blog', blogApi)

    app.use('*', (req, res) => {
        return res.send('Not valid')
    })

    app.listen(PORT, () => {
        console.log('Express up. ' + PORT)
    })
}
