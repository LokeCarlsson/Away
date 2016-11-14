import React, { Component } from 'react'
import { Editor, EditorState, RichUtils } from 'draft-js'

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

    handleKeyCommand(command) {
        const newState = RichUtils.handleKeyCommand(this.state.editorState, command)
        if (newState) {
            this.updateEditorState(newState)
        }
    }

    render() {
        return (
            <Editor editorState={this.state.editorState}
                    onChange={this.updateEditorState.bind(this)}
                    handleKeyCommand={this.handleKeyCommand.bind(this)}
            />
        )
    }
}
