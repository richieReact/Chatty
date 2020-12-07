import React from 'react';
import { Link } from 'react-router-dom';

import './welcome.css';

const Welcome = () => {
    return (
        <React.Fragment>
        <div className="Welcome">
            <form>
                <input placeholder="Email"/>                
            </form>
            <form>
                <input placeholder="Password"/>
            </form>
            <button>
                <Link to="/Chatty" style={{ textDecoration: 'none' }} >Sign In</Link>   
            </button>
            <button>
                <Link to="/Register" style={{ textDecoration: 'none' }} >Register</Link>
            </button>
        </div>
        </React.Fragment>
    )
}

export default Welcome;