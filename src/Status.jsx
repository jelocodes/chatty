import React, {Component} from 'react';

class Status extends Component {
  render() {
    return (
      <div className="message system">
        {this.props.message.content}
      </div>
    );
  }
}

export default Status;

