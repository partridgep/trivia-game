import React, { Component } from 'react';
import './App.css';

import { Route, Redirect, BrowserRouter as Router } from 'react-router-dom';

import LandingPage from './pages/LandingPage/LandingPage';
import GamePage from './pages/GamePage/GamePage';
import LeaderBoard from './pages/LeaderBoard/LeaderBoard';

class App extends Component {

  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" render={ props =>
            <LandingPage {...props} />
          }/>
          <Route exact path="/play" render={ props =>
            <GamePage {...props} />
          }/>
          <Route exact path="/leaderboard" render={ props =>
            <LeaderBoard {...props} />
          }/>
        </div>
      </Router>
    );
  }
}

export default App;
