import express from 'express'
import Blog from '../models/blog'
import cors from 'cors'
const router = express.Router()

export default router.post('/blog/update', cors(), (req, res) => {

    res.send('update')

})
