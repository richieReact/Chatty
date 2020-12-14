import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import ScrollToBottom, { useScrollToBottom } from 'react-scroll-to-bottom';

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
      setYourID(id)
    })
    console.log("socket connection worked")
    socketRef.current.on("message", (message) => {
    recievedMessage(message);
    })
    // Gets the messages from the database and sets my messages with them. Peep the concat.
    fetch("/api/messages", {
      method: "GET",
    }).then((res) => {
      return res.json()
    }).then((resJSON) => {
      console.log(resJSON)
      setMessages(resJSON.concat())
    }).catch((err) => {
      console.log(err)
    });
  }, []);

    function recievedMessage(message) {
      setMessages(oldMsgs => [...oldMsgs, message])
    }
      
    function sendMessage(e) {
      e.preventDefault();
      // Props on this guy match up with the schema.
      const messageObject = {
          body: message,
          username: username,
          id: yourID
    };
      setMessage("")
      socketRef.current.emit("send message", messageObject);
      // Sends the message to the database on submit. Uses the messageObject
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
      <ScrollToBottom className="Container">
        {messages.map((message, index) => {
          if (message.id === yourID) {
            return (
              <div className="MyRow" key={index}>
                <ScrollToBottom className="MyMessage" >
                  {message.body}
                </ScrollToBottom>
              </div>
            )
          }
          return (
            <div key={index} style={{ justifyContent: 'flex-start' }} >
              <ScrollToBottom className="PartnerMessage" id="DbMsgs">
                {message.username}:  {message.body}
              </ScrollToBottom>
            </div>
            )
          })}
        </ScrollToBottom>
      </div>

            <span className="Entry">
                <form onSubmit={sendMessage}>
                    <input 
                    value={message} 
                    onChange={handleChange} 
                    placeholder="Say something..." />
                    <button className="Button" />
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