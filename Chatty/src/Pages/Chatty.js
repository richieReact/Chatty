import React from 'react';

import './Chatty.css';

// getting props from Data.js
const Chatty = props => {
    //Socket.io for the messaging
    console.log(props);

    return (
        <React.Fragment>
            <div className="Chatty">
                <header>
                    {props.age} 
                </header>
                <p>
                    Socket.io ting in here
                </p>
                <p>{props.message}</p>
                <button onClick={props.upper} >upppy</button>
                <form onSubmit={props.nameHandler}>
                    <input type="text" name="name" placeholder="New Name" onChange={props.changy}/>                  
                    <button type="submit">
                        Submit
                    </button>
                </form>
            </div>
        </React.Fragment>
    )
}

export default Chatty;