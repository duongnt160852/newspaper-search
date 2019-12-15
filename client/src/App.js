import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home"
import Newspaper from "./pages/Newspaper"

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/' exact component={Home}/>
          <Route path="/newspaper/:id" component={Newspaper} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
