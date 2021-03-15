import React from 'react';
import './App.css';
import Login from './Login';
import Home from './Home'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
        <Route path="/login">
            <Login/>
          </Route>
          <Route path="/">
            <Home/>
          </Route>          
        </Switch>
      </div>
    </Router>
    
  );
}

export default App;
