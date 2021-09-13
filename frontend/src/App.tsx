import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import './App.css';
import { AppEventProvider } from './contexts/AppEventContext';
import { EnvironmentProvider } from './contexts/EnvironmentContext';
import { UserProvider } from './contexts/UserContext';
import { HomePage } from './pages/HomePage';
import MapPage from './pages/MapPage';

function App(): JSX.Element {
  return (
    <UserProvider>
      <AppEventProvider>
        <EnvironmentProvider>
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
        </EnvironmentProvider>
      </AppEventProvider>
    </UserProvider>
  );
}

export default App;
