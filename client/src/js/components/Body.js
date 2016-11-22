import React, { Component } from 'react'
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js'
import '../../css/Draft.css'

export default class Draft extends Component {
    constructor(props) {
        super(props)
        let body;
        console.log(this.props.body);
        if (this.props.body !== "") {
            const content = convertFromRaw(JSON.parse(this.props.body))
            body = EditorState.createWithContent(content)
        } else {
            body = EditorState.createEmpty()
        }

        this.state = {
            editorState: body
        }
    }

    updateEditorState(editorState) {
        this.setState({editorState})
        this.convertToJson(editorState)
    }

    convertToJson(editorState) {
        const raw = convertToRaw(editorState.getCurrentContent())
        this.props.sendBodyToPost(raw)
    }

    handleKeyCommand(command) {
        const newState = RichUtils.handleKeyCommand(this.state.editorState, command)
        if (newState) {
            this.updateEditorState(newState)
        }
    }

    getEditor() {
        return <Editor readOnly={!this.props.readOnly}
                    key={this.props.index}
                    editorState={this.state.editorState}
                    onChange={this.updateEditorState.bind(this)}
                    handleKeyCommand={this.handleKeyCommand.bind(this)}
                />
    }

    render() {
        return (
            this.getEditor()
        )
    }
}
