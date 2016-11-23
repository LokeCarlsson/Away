import express from 'express'
import Blog from '../models/blog'
import cors from 'cors'
const router = express.Router()

export default router.post('/blog/create', cors(), (req, res) => {
    const blog = new Blog({
        author: req.body.author,
        title: req.body.title,
        body: req.body.body
    })

    blog.save()
    .then(() => {
        console.log('done')
    })

})
