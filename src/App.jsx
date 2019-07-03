import React, { Component } from "react";
import Nav from "./Nav.jsx";
import Message from "./Message.jsx";
import MessageList from "./Messagelist.jsx";
import ChatBar from "./ChatBar.jsx";

generateRandomString = () => {
  let result = '';
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let charactersLength = characters.length;
  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

class App extends Component {
  constructor() {
    super()
    this.state = {
      currentUser: {name: "Micodes"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          id: generateRandomString(),
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          id: generateRandomString(),
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    }
  }

  render() {
    return (
      <div>
        <Nav />
        <MessageList messages={this.state.messages} />
        <div className="message system">
          Anonymous1 changed their name to nomnom.
        </div>
        <ChatBar currentUser={this.state.currentUser.name} />
      </div>
    );
  }
}

export default App;
