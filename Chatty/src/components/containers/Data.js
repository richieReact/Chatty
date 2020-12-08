import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { animateScroll } from 'react-scroll';

import './Data.css';

const Data = () => {

  const [yourID, setYourID] = useState();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState([]);
  const [username, setUsername] = useState([]);

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect('/');   
    // Sets your ID on connection
    socketRef.current.on("your id", id => {
      setYourID(id);
    })
    console.log("socket connection worked")
    socketRef.current.on("message", (message) => {
    recievedMessage(message);
    })
    // Getting the json successfully but gotta find out how to display it (the body and the username). 
    fetch("/api/messages", {
      method: "GET",
    }).then((res) => {
      return res.json();
    }).then((resJSON) => {
      console.log(resJSON)
      setMessages(resJSON.concat())
      console.log({message})
      scrollToBottom()
    }).catch((err) => {
      console.log(err);
    });
  }, []);

    function recievedMessage(message) {
      setMessages(oldMsgs => [...oldMsgs, message]);
    }
      
    function sendMessage(e) {
      e.preventDefault();
      const messageObject = {
          body: message,
          username: username,
          id: yourID
    };
      setMessage("")
      socketRef.current.emit("send message", messageObject);
      // this took so much for me to find. I big win for me.
      fetch("/api/messages", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(messageObject)
      }).then((res) => {
          return res.json();
      }).catch((err) => {
          console.log(err);
      });
    }
    
    function scrollToBottom() {
      const chatWindow = document.getElementById("DbMsgs");
      chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    function handleChange(e) {
      setMessage(e.target.value);
    }

    function handleChangeUsername(e) {
      setUsername(e.target.value);
    }

  return (
    //Send down the info, render the chat shit
    <React.Fragment>
    <div className="Page">
      <div className="Container">
        {messages.map((message, index) => {
          if (message.id === yourID) {
            return (
              <div className="MyRow" key={index}>
                <div className="MyMessage" >
                  {message.body}
                </div>
              </div>
            )
          }
          return (
            <div key={index} style={{ justifyContent: 'flex-start' }} >
              <div className="PartnerMessage" id='DbMsgs'>
                {message.username}:  {message.body}
              </div>
            </div>
            )
          })}
        </div>
      </div>

            <span className="Entry">
                <form onSubmit={sendMessage}>
                    <input 
                    value={message} 
                    onChange={handleChange} placeholder="Say something..." />
                    <button className="Button">
                    </button>
                </form>
            </span>

            <span className="UserEntry">
              <form onSubmit={sendMessage}>
                <input
                    value={username}
                    onChange={handleChangeUsername}
                    placeholder="Your name..." />
              </form>
            </span>
        </React.Fragment>
    )
}  

export default Data;