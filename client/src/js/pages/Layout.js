import React, { Component } from 'react'

export default class Layout extends Component {
    render() {
        return (
            <div className='body-wrapper'>
                {this.props.children}
            </div>
        )
    }
}
