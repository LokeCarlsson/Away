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
        this.drafts.push(newDraft)
        this.toggleCreate()
    }

    toggleCreate() {
        let toggle = this.state.createNew ? false : true
        this.setState({createNew: toggle})
    }

    getDraftTemplate() {
        const draftIndex = this.drafts.length
        return this.state.createNew
            ? <Draft index={draftIndex}
                     save={this.addDraftToCollection.bind(this)}
            />
            : null
    }
    render() {
        return (
            <div>
                <h1>Welcome</h1>
                <button onClick={this.toggleCreate.bind(this)}>NEW</button>
                {this.getDraftTemplate()}
                {this.drafts}
            </div>
        )
    }
}
