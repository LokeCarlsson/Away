import express from 'express'
import Blog from '../models/blog'
import cors from 'cors'
const router = express.Router()

export default router.get('/', (req, res) => {
    Blog.find({})
    .then(allPosts => res.send(allPosts))
    .catch(err => console.log(err))
})
.post('/', cors(), (req, res) => {
    const blog = new Blog({
        author: req.body.author,
        title: req.body.title,
        body: JSON.stringify(req.body.body)
    })

    blog.save()
    .then(() => {
        console.log('done')
    })


})
