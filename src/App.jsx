import React, { Component } from "react";
import Nav from "./Nav.jsx";
import Message from "./Message.jsx";
import MessageList from "./Messagelist.jsx";
import ChatBar from "./ChatBar.jsx";

class App extends Component {
  constructor() {
    super()
    this.state = {
      currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [], //messages from the server will now be stored here as they arrive
      socket: new WebSocket('http://localhost:3001'.replace(/^http(s)?/, "ws$1")),
      usersOnline: 0
    }
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);

    //this.socket = new WebSocket('http://localhost:3001'.replace(/^http(s)?/, "ws$1")); //replace http with ws
    this.state.socket.onopen = function(event) {
      console.log('Connected to server');
    };
    this.state.socket.onmessage = (event) => {
      console.log(event);
      let receivedData = parseInt(event.data);
      console.log(receivedData)
      if (!!receivedData && typeof receivedData === 'number') {
        this.updateUsers(receivedData);
      }
    }
  }

  handleNotification = (newNotification) => {
    const messages = this.state.messages.concat(newNotification);
    this.setState({messages: messages});
  }

  updateUsers = (usersOnline) => {
    this.setState({usersOnline: usersOnline})
  }

// only activates on handlemessage
  handleMessage = (newMessage) => {
    // const messages = this.state.messages.concat(newMessage);
    // this.setState({messages: messages});
    this.state.socket.send(JSON.stringify(newMessage));
    this.state.socket.onmessage = (event) => {
      console.log(JSON.parse(event.data))
      let receivedData = JSON.parse(event.data);
      if (!!receivedData.content) {
       const messages = this.state.messages.concat(receivedData);
        this.setState({messages: messages});
      } else if (!!receivedData.type && typeof receivedData !== 'number') {
        this.handleNotification(receivedData);
      } else if (typeof receivedData === 'number') {
        this.updateUsers(receivedData);
      } else {
        this.state.socket.send(JSON.stringify({type: "postNotification", content: `${this.state.currentUser.name} changed their name to ${receivedData.data.name}`}));
        this.setState({currentUser: receivedData.data});
      }
    };
  }



  render() {
    return (
      <div>
        <Nav usersOnline={this.state.usersOnline} />
        <MessageList messages={this.state.messages} />
        <div className="message system">
          Anonymous1 changed their name to nomnom.
        </div>
        <ChatBar currentUser={this.state.currentUser.name} handleMessage={this.handleMessage} />
      </div>
    );
  }
}

export default App;
