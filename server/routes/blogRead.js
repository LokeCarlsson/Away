import express from 'express'
import Blog from '../models/blog'
import cors from 'cors'
const router = express.Router()

export default router.get('/blog/read', (req, res) => {
    Blog.find({})
        .then(allPosts => res.send(allPosts))
        .catch(err => console.log(err))
})
