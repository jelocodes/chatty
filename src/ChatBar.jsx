import React, {Component} from 'react';

class ChatBar extends Component {
    handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        console.log(e.target.value)
        this.props.handleMessage({id: this.props.generateRandomString(), username: this.props.currentUser, content: e.target.value});
      }
    }
    render(){
      return (
        <footer className="chatbar">
            <input className="chatbar-username" placeholder={this.props.currentUser} onKeyUp={this.handleKeyPress} />
            <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyUp={this.handleKeyPress} />
        </footer>
      );
    }
}

export default ChatBar;