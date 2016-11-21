import React, { Component } from 'react'
import '../../css/Draft.css'
import Title from './Title'
import Body from './Body'

export default class Post extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: this.props.title || '',
            body: this.props.body || '',
            showSaveButton: false,
            isNew: this.props.isNew
        }
    }

    savePost(e) {
        const postObject = {
            title: this.state.title,
            body: this.state.body
        }

        this.prepareForAdding(e)
            .then(e => this.props.store(postObject))
    }

    prepareForAdding(e) {
        return new Promise((resolve, reject) => {
            this.setState({isNew: false})
            resolve()
        })
    }

    setTitle(newTitle) {
        this.setState({title: newTitle})
    }

    setBody(newBody) {
        this.setState({body: newBody})
    }

    toggleSave() {
        const toggle = this.state.showSaveButton ? false : true
        this.setState({showSaveButton: toggle})
    }

    getButton() {
        return this.state.isNew
        ? <button className='save' onClick={this.savePost.bind(this)}>SAVE</button>
        : null
    }

    getBody() {
        return <Body readOnly={this.state.isNew} body={this.state.body} sendBodyToPost={this.setBody.bind(this)} />
    }

    getTitle() {
        return <Title sendTitleToPost={this.setTitle.bind(this)} title={this.state.title} isNew={this.props.isNew} />
    }

    deleteThisPost(e) {
        this.props.delete(this.props.id)
    }

    getDeleteButton() {
        return <div className='delete' onClick={this.deleteThisPost.bind(this)}></div>
    }

    render() {
        return (
            <div className='editor-container' key={this.props.highestKey}>
                {this.getDeleteButton()}
                {this.getTitle()}
                {this.getBody()}
                {this.getButton()}
            </div>
        )
    }
}
