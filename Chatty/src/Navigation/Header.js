import React from 'react';
import { Link } from 'react-router-dom';

import './header.css';

const Header = () => {
  
    return (
        <React.Fragment>
            
            <div className="Header">
                <button className="main-navigation__menu-btn">
                    <span />
                    <span />
                    <span />
                </button>
                <div className="Title">
                    <Link to="/" style={{  textDecoration: 'none' }} >Chatty</Link>
                </div>
            </div>
           
        </React.Fragment>
    )
}

export default Header;