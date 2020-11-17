import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

import './Data.css';

const Data = props => {

    //Database Stuff here
    const [yourID, setYourID] = useState();
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState([]);

    const socketRef = useRef();

    useEffect(() => {
       socketRef.current = io.connect('/');
       
       socketRef.current.on("your id", id => {
           setYourID(id);
       })
       console.log("socket connection worked")
       socketRef.current.on("message", (message) => {
        recievedMessage(message);
       })
    }, []);

    function recievedMessage(message) {
        setMessages(oldMsgs => [...oldMsgs, message]);
    }

    function sendMessage(e) {
        e.preventDefault();
        const messageObject = {
            body: message,
            id: yourID,
        };
        setMessage("")
        socketRef.current.emit("send message", messageObject);
    }

    function handleChange(e) {
        setMessage(e.target.value);
    }

    return (
    //Send down the info, render the chat shit
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
                                <div className="PartnerMessage" >
                                    {message.body}
                                </div>
                            </div>
                        )
                    })}
                </div>
                <form onSubmit={sendMessage}>
                    <input style={{ width: '100%' }} value={message} onChange={handleChange} placeholder="Say something..." />
                    <button className="Button">
                        Submit
                    </button>
                </form>
            </div>
    )
}

export default Data;