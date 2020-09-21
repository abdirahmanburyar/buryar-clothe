import React from 'react';
import './App.css';
import Header from './components/layouts/Navbar';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import SignIn from './container/Singin';
import SignUp from './container/SignUp';
import Home from './container/Home'
function App() {
  return (
    <div className="App">
      <Router>
      <Header /> 
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
