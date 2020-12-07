import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import './App.css';
import Welcome from './Pages/welcome';
import Register from './Pages/Register';
import Header from './Navigation/header';
import Data from './components/containers/Data';

const App = () => {
  return (
    <React.Fragment>   
      <Router>
      <Header />    
        <Switch>
          <Route exact path="/">
            <Welcome />
          </Route>
          <Route path="/Register">
            <Register />
          </Route>
          <Route path="/Chatty">
            <Data />
          </Route>
          <Redirect to="/" />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;