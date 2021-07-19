import React from 'react';
import './App.css';
import { UserProvider } from './contexts/UserContext';
import MapPage from './pages/MapPage';

function App(): JSX.Element {
  return (
    <UserProvider>
      <div className="App">
        <MapPage />
      </div>
    </UserProvider>
  );
}

export default App;
