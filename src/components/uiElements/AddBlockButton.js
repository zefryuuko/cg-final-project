import React, { Component } from 'react'

class AddBlockButton extends Component {
    render() {
        return (
            <button className="btnAddBlock" onClick={this.props.onClick}>+</button>
        )
    }
}

export default AddBlockButton
