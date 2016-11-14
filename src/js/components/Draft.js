import React, { Component } from 'react'
import { Editor, EditorState } from 'draft-js'

export default class Home extends Component {
    constructor() {
        super()
        this.state = {
            editorState: EditorState.createEmpty()
        }
    }

    updateEditorState(editorState) {
        this.setState({editorState})
    }

    render() {
        return (
            <Editor editorState={this.state.editorState}
                    onChange={this.updateEditorState.bind(this)}
            />
        )
    }
}
