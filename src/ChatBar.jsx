import React, {Component} from 'react';

class ChatBar extends Component {
    handleKeyPress = (e) => {
      // console.log(e.target.matches('.chatbar-username'));
      if (e.key === 'Enter') {
        if (e.target.matches('.chatbar-message')) {
          this.props.handleMessage({id: this.props.generateRandomString(), username: this.props.currentUser, content: e.target.value});
        } else if (e.target.matches('.chatbar-username')) {
          this.props.handleMessage({type: 'postNotification', data: {name: e.target.value}});
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

// refactor with classes and do a functional programming type example too