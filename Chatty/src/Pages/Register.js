import React from 'react';
import { Link } from 'react-router-dom';

import './Register.css';

const Register = () => { 
    return (
        <React.Fragment>
        <div className="Register">
            <form>
                <input placeholder="Email" type="email"/>                
            </form>
            <form>
                <input placeholder="Password" type="password"/>
            </form>
            <button>
                <Link to="/Chatty" style={{ textDecoration: 'none' }} >Register</Link>   
            </button>
        </div>
        </React.Fragment>
    )
}

export default Register;