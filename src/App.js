import React, { Component } from 'react';
import './App.css';

import { Route, BrowserRouter as Router } from 'react-router-dom';

import LandingPage from './pages/LandingPage/LandingPage';
import GamePage from './pages/GamePage/GamePage';
import LeaderBoard from './pages/LeaderBoard/LeaderBoard';

class App extends Component {

  formatTime (seconds) {
    let mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    let secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
}

  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" render={ props =>
            <LandingPage {...props} />
          }/>
          <Route exact path="/play" render={ props =>
            <GamePage 
              formatTime={this.formatTime}
              {...props} 
            />
          }/>
          <Route exact path="/leaderboard" render={ props =>
            <LeaderBoard 
              formatTime={this.formatTime}
              {...props} 
            />
          }/>
        </div>
      </Router>
    );
  }
}

export default App;
