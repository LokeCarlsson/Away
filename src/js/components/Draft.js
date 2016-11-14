import React, { Component } from 'react'
import { Editor, EditorState, RichUtils } from 'draft-js'
import '../../css/Draft.css'

export default class Draft extends Component {
    constructor(props) {
        super(props)
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

    save() {
        this.props.save(this.getEditor(true))
    }

    getEditor(readOnly = false) {
        return <Editor readOnly={readOnly}
                       key={this.props.index}
                       editorState={this.state.editorState}
                       onChange={this.updateEditorState.bind(this)}
                       handleKeyCommand={this.handleKeyCommand.bind(this)}
        />
    }

    render() {
        return (
            <div className='editor-container'>
                {this.getEditor()}
                <button className='save' onClick={this.save.bind(this)}>SAVE</button>
            </div>
        )
    }
}
