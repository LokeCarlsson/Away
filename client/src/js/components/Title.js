import React, { Component } from 'react'

export default class Title extends Component {
    updateTitle(e) {
        this.props.sendTitleToPost(e.target.value)
    }

    getTitle() {
        return this.props.isNew ? <input onChange={this.updateTitle.bind(this)} defaultValue={this.props.title} type='text'/> : <h1>{this.props.title}</h1>
    }

    render() {
        return (
            this.getTitle()
        )
    }
}
