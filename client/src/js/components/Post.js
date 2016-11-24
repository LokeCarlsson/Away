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
            date: this.props.date,
            showSaveButton: false,
            isNew: this.props.isNew
        }
    }

    updatePost(e) {
        this.setState({isNew: true})
    }

    saveUpdate(postObject) {
        fetch('http://localhost:3001/blog/update/' + this.props.id, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(postObject),
            date: Date.now()
        })
        .then((res) => res.json())
        .then((newDate) => {
            this.setState({date: newDate.date})
            return this.setState({isNew: false})
        })
    }

    generatePostObject() {
        return {
            author: 'logged in user',
            title: this.state.title,
            body: JSON.stringify(this.state.body),
            date: Date.now()
        }
    }

    saveOrUpdatePost(e) {
        const postObject = this.generatePostObject()

        if (this.props.id) {
            return this.saveUpdate(postObject)
        }

        fetch('http://localhost:3001/blog/create', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(postObject)
            })
            .then((mongoId) => mongoId.json())
            .then((idValue) => {
                postObject['_id'] = idValue
                this.setState({isNew: false})
                this.props.store(postObject)
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

    getSaveButton() {
        return this.state.isNew
        ? <button className='save' onClick={this.saveOrUpdatePost.bind(this)}>SAVE</button>
        : null
    }

    getUpdateButton() {
        return this.state.isNew
        ? null
        : <button className='update' onClick={this.updatePost.bind(this)}>UPDATE</button>
    }

    getBody() {
        return <Body readOnly={this.state.isNew} body={this.state.body} sendBodyToPost={this.setBody.bind(this)} defaultValue={this.props.info}/>
    }

    getTitle() {
        return <Title sendTitleToPost={this.setTitle.bind(this)} title={this.state.title} isNew={this.state.isNew} />
    }

    deleteThisPost(e) {
        fetch('http://localhost:3001/blog/delete/' + this.props.id, {
            method: 'DELETE'
        })
        .then(() => {
            this.props.delete(this.props.id)
        })
    }

    getDeleteButton() {
        return this.props.isNew ? null : <div className='delete' onClick={this.deleteThisPost.bind(this)}></div>
    }

    render() {
        return (
            <div className='editor-container' key={this.props.highestKey}>
                {this.getDeleteButton()}
                {this.getTitle()}
                {this.getBody()}
                {this.state.date}
                {this.getSaveButton()}
                {this.getUpdateButton()}
            </div>
        )
    }
}
