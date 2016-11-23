import express from 'express'
import Blog from '../models/blog'
import cors from 'cors'
const router = express.Router()

router.post('/create', cors(), (req, res) => {
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

router.get('/read', (req, res) => {
    Blog.find({})
        .then(allPosts => res.send(allPosts))
        .catch(err => console.log(err))
})

router.post('/update', cors(), (req, res) => {
    res.send('update')
})

router.post('/delete', cors(), (req, res) => {
    res.send('delete')
})

export default router
