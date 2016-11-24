import express from 'express'
import Blog from '../models/blog'
import cors from 'cors'
const router = express.Router()

router.post('/create', cors(), (req, res) => {
    const blog = new Blog({
        author: req.body.author,
        title: req.body.title,
        body: req.body.body,
        date: req.body.date
    })

    blog.save()
        .then((postCreated) => res.send(postCreated._id))
        .catch((err) => console.log(err))
})

router.get('/read', (req, res) => {
    Blog.find({})
        .then(allPosts => res.send(allPosts))
        .catch(err => console.log(err))
})

router.put('/update/:id', cors(), (req, res) => {
    Blog.findOneAndUpdate(req.params.id, req.body)
        .then(l => res.send('updated'))
})

router.delete('/delete/:id', cors(), (req, res) => {
    Blog.findByIdAndRemove(req.params.id)
        .then(allPosts => console.log('deleted'))
        .catch(err => console.log(err))
    res.send(true)
})

export default router
