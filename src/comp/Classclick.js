import React, { Component } from 'react'

class Classclick extends Component {
    clickHandler(){
        console.log('clicked the button')
    }
  render() {
    return (
      <div>
        <button onClick={this.clickHandler}>
            Click me
        </button>
      </div>
    )
  }
}

export default Classclick