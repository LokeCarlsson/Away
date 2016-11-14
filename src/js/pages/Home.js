import React, { Component } from 'react'
import Draft from '../components/Draft'

export default class Home extends Component {
    constructor() {
        super()
        this.drafts = []
        this.state = {
            createNew: false
        }
    }

    addDraftToCollection(newDraft) {
        const draftIndex = this.drafts.length
        this.drafts.push(newDraft)
    }

    setCreate() {
        let toggle = this.state.createNew ? false : true
        this.setState({createNew: toggle})
    }

    getDraftTemplate() {
        return this.state.createNew ? <Draft /> : null
    }

    render() {
        return (
            <div>
                <h1>Welcome</h1>
                <button onClick={this.setCreate.bind(this)}>New</button>
                {this.getDraftTemplate()}
                {this.drafts}
            </div>
        )
    }
}
