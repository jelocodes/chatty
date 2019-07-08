import React, {Component} from 'react';

class ChatBar extends Component {

    // helper methods
    formatMessageObject = (username, content) => {
      return ({username, content})
    }

    formatUserObject = (newName, currentUser) => {
      return ({newname: newName, status: `${currentUser} changed their name to ${newName}`})
    }

    handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        //if the message input box is changed
        if (e.target.matches('.chatbar-message')) {
          const chatBarValue = e.target.previousElementSibling.value.trim(); //getting the value of the username input
          //if the value of the username input is not blank and it's different from the current set username, this means the user wants to change the username along with sending a message
          if (!!chatBarValue && chatBarValue !== this.props.currentUser) {
            //so, broadcast the message to all clients and change only the individual client's username with a callback
            this.props.handleMessage(this.formatMessageObject(chatBarValue, e.target.value), this.props.handleMessage(this.formatUserObject(chatBarValue, this.props.currentUser)))
            //set the username input to be blank again
            e.target.previousElementSibling.value = '';
          } else {
            //if the value of the username input does not change, then just broadcast the message without changing the current user
            this.props.handleMessage(this.formatMessageObject(this.props.currentUser, e.target.value));
          }
        //if the user changes the username input directly
        } else if (e.target.matches('.chatbar-username')) {
          //change the individual client's username
          this.props.handleMessage(this.formatUserObject(e.target.value, this.props.currentUser))
        }
        //set the target input to be blank again
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