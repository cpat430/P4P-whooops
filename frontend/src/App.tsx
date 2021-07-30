import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import './App.css';
import { HomePage } from './components/HomePage';
import { UserProvider } from './contexts/UserContext';
import MapPage from './pages/MapPage';

function App(): JSX.Element {
  return (
    <UserProvider>
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
    </UserProvider>
  );
}

export default App;
