import React, {Component} from 'react';

class ChatBar extends Component {
    handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        if (e.target.matches('.chatbar-message')) {
          this.props.handleMessage({username: this.props.currentUser, content: e.target.value});
        } else if (e.target.matches('.chatbar-username')) {
          this.props.handleMessage({data: {name: e.target.value}});
        }
        e.target.value = '';
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