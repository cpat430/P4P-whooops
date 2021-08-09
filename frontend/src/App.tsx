import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import './App.css';
import { ChallengeProvider } from './contexts/ChallengeContext';
import { EventProvider } from './contexts/EventContext';
import { UserProvider } from './contexts/UserContext';
import { HomePage } from './pages/HomePage';
import MapPage from './pages/MapPage';

function App(): JSX.Element {
  return (
    <UserProvider>
      <EventProvider>
        <ChallengeProvider>
          <Router>
            <Switch>
              <Route path="/home">
                <HomePage />
              </Route>
              <Route path="/map">
                <MapPage />
              </Route>
              <Redirect from="*" to="/home" />
            </Switch>
          </Router>
        </ChallengeProvider>
      </EventProvider>
    </UserProvider>
  );
}

export default App;
