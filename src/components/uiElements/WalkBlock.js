import React, { Component } from 'react'

class WalkBlock extends Component {
    onDeleteButtonClicked = () => {

    }

    render = () => {
        return (
            <div className="block function" index={this.props.index}>
                Walk
            </div>
        )
    }
}

export default WalkBlock
