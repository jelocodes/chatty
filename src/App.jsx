import React, { Component } from "react";
import Nav from "./Nav.jsx";
import Message from "./Message.jsx";
import MessageList from "./Messagelist.jsx";
import ChatBar from "./ChatBar.jsx";

class App extends Component {
  constructor() {
    super()
    this.state = {
      currentUser: {name: "Micodes"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [], //messages from the server will now be stored here as they arrive
      socket: new WebSocket('http://localhost:3001'.replace(/^http(s)?/, "ws$1"))
    }
  }

  generateRandomString = () => {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
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
  }

  handleNotification = (newNotification) => {
    const messages = this.state.messages.concat(newNotification);
    this.setState({messages: messages});
  }

  handleMessage = (newMessage) => {
    // const messages = this.state.messages.concat(newMessage);
    // this.setState({messages: messages});
    this.state.socket.send(JSON.stringify(newMessage));
    this.state.socket.onmessage = (event) => {
      let receivedData = JSON.parse(event.data);
      if (!!receivedData.content) {
       const messages = this.state.messages.concat(receivedData);
        this.setState({messages: messages});
      } else if (!!receivedData.type) {
        this.handleNotification(receivedData);
      } else {
        this.setState({currentUser: receivedData.data});
        this.state.socket.send(JSON.stringify({type: "postNotification", content: `${this.state.currentUser.name} has changed their name to ${receivedData.data.name}`}));
      }
    };
  }



  render() {
    return (
      <div>
        <Nav />
        <MessageList messages={this.state.messages} />
        <div className="message system">
          Anonymous1 changed their name to nomnom.
        </div>
        <ChatBar currentUser={this.state.currentUser.name} generateRandomString={this.generateRandomString} handleMessage={this.handleMessage} />
      </div>
    );
  }
}

export default App;
