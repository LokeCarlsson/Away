import React, { Component } from 'react'
import Post from '../components/Post'

export default class Home extends Component {
    constructor() {
        super()
        this.state = {
            blogPostArray: [],
            newPost: false
        }
        this.generateExistingPosts()
    }

    deleteComponent(key) {
        const removedComponent = this.state.blogPostArray.filter((component) => key !== component.key)
        this.setState({
            blogPostArray: removedComponent
        })
    }

    updateComponent(key) {
        const removedComponent = this.state.blogPostArray.filter((component) => key !== component.key)
        this.setState({
            blogPostArray: removedComponent
        })
    }

    generateExistingPosts() {
        fetch('http://localhost:3001/blog/read', {
            headers: {'Content-Type': 'application/json'}
        })
        .then(blogPosts => blogPosts.json())
        .then(blogObjects => {
            const orderByDate = (b, a) => {
                return a.props.date - b.props.date
            }

            const blogArray = []
            for (let i = 0; i < blogObjects.length; i++) {
                blogArray.push(this.createNewPost(blogObjects[i]))
            }

            blogArray.sort(orderByDate)

            return blogArray
        })
        .then((posts) => {
            this.setState({
                blogPostArray: posts
            })
        })
    }

    createNewPost(postObject) {
        const keyValue = postObject._id
        return <Post title={postObject.title}
                     body={postObject.body}
                     key={keyValue}
                     delete={this.deleteComponent.bind(this)}
                     update={this.newPost.bind(this)}
                     id={keyValue}
                     date={postObject.date}
                />
    }

    addNewPostToArray(newPost) {
        const post = this.createNewPost(newPost)

        this.setState({
            blogPostArray: [
                post,
                ...this.state.blogPostArray
            ]
        })
        this.createNew()
    }

    createNew() {
        const toggle = this.state.newPost ? false : true
        this.setState({newPost: toggle})
    }

    newPost() {
        return this.state.newPost
            ? <Post saveDraft={this.addNewPostToArray.bind(this)}
                isNew={this.state.newPost}
                highestKey={this.state.blogPostArray.length}
                key={this.state.blogPostArray.length}
                store={this.addNewPostToArray.bind(this)}
            />
            : null
    }

    render() {
        return (
            <div>
                <div className='create' onClick={this.createNew.bind(this)}></div>
                {this.newPost()}
                {this.state.blogPostArray}
            </div>
        )
    }
}
