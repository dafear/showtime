import React from 'react';

import './capture.css';



class Form extends Component {
  handleSubmitClick = () => {
    const name = this._capture.value;
    // do something with `name`
  }

  render() {
    return (
      <div>
        <input type="text" ref={input => this._name = input} />
        <button onClick={this.handleSubmitClick}>Sign up</button>
      </div>
    );
  }
}
