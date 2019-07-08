import React, {Component} from 'react';
import Message from "./Message.jsx";
import Status from "./Status.jsx";

class MessageList extends Component {
    render(){
        return (
    <main className="messages">
      {this.props.messages.map((message) => {
        return (
          (!!message.status) ? <Status key={message.id} message={message} /> : <Message key={message.id} message={message} />
          )
      })}
    </main>);
    }
}

export default MessageList;