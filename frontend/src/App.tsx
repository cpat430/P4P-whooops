import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import './App.css';
import { EnvironmentProvider } from './contexts/EnvironmentContext';
import { UserProvider } from './contexts/UserContext';
import { ControlPage } from './pages/ControlPage';
import { HomePage } from './pages/HomePage';
import MapPage from './pages/MapPage';

function App(): JSX.Element {
  return (
    <Router>
      <Switch>
        <Route path="/app/*">
          <UserProvider>
            <EnvironmentProvider>
              <Switch>
                <Route exact path="/app">
                  <HomePage />
                </Route>
                <Route path="/app/map">
                  <MapPage />
                </Route>
              </Switch>
            </EnvironmentProvider>
          </UserProvider>
        </Route>
        <Route path="/control">
          <ControlPage />
        </Route>
        <Redirect from="*" to="/app" />
      </Switch>
    </Router>
  );
}

export default App;
