import React, { Component } from 'react'
import Post from '../components/Post'

export default class Home extends Component {
    constructor() {
        super()
        this.state = {
            blogPostArray: [],
            newPost: false
        }
        this.generatePosts()
    }

    deleteComponent(key) {
        const radix = 10
        const removedComponent = this.state.blogPostArray.filter((component) => key !== parseInt(component.key, radix))
        this.setState({
            blogPostArray: removedComponent
        })
    }

    generatePosts() {
        for (let i = 0; i < 3; i++) {
            this.state.blogPostArray.push(<Post delete={this.deleteComponent.bind(this)} id={this.state.blogPostArray.length} key={this.state.blogPostArray.length}/>)
        }
    }

    addNewPostToArray(newPost) {
        const post = <Post title={newPost.title}
                           body={newPost.body}
                           key={this.state.blogPostArray.length}
                           delete={this.deleteComponent.bind(this)}
                           id={this.state.blogPostArray.length}
                    />

        this.setState({
            blogPostArray: [
                ...this.state.blogPostArray,
                post
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
                store={this.addNewPostToArray.bind(this)}/>
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
