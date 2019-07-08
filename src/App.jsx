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

    this.state.socket.onopen = function(event) {
      console.log('Connected to server');
    };
    this.state.socket.onmessage = (event) => {
      let receivedData = parseInt(event.data);
      if (!!receivedData && typeof receivedData === 'number') {
        this.updateUsers(receivedData);
      }
    }
  }

  // helper methods
  handleNotification = (newNotification) => {
    const messages = this.state.messages.concat(newNotification);
    this.setState({messages: messages});
  }

  updateUsers = (usersOnline) => {
    this.setState({usersOnline: usersOnline})
  }

  updateUserName = (name) => {
    this.setState({currentUser: {name: name}})
  }

  broadcastMessage = (message) => {
    const messages = this.state.messages.concat(message);
    this.setState({messages: messages});
  }

  handleData = (newData, cb) => {
    // sending the message to serverside socket connection
    this.state.socket.send(JSON.stringify(newData));
    // catching the message on the client-side after the server socket parses the data and decides to broadcast it or not
    this.state.socket.onmessage = (event) => {
      let receivedData = JSON.parse(event.data); //converting to js object
      if (!!receivedData.content) {
        this.broadcastMessage(receivedData); //if the data has a content property, meaning it's a message, broadcast the message
      } else if (!!receivedData.status) { //if the data is a status notification, broadcast it
        this.handleNotification(receivedData);
      } else if (typeof receivedData === 'number') { //if the data is a number, update the user count
        this.updateUsers(receivedData);
      } else if (!!receivedData.name) { //if the data is a username, update the individual client's username
        this.updateUserName(receivedData.name)
      }
    };

    cb; //call the callback method if there is one (when the user wants to do more than one thing (i.e. send a message and change their username))
  }


  render() {
    return (
      <div>
        <Nav usersOnline={this.state.usersOnline} />
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser.name} handleMessage={this.handleData} />
      </div>
    );
  }
}

export default App;
