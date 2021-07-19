import React from 'react';
import './App.css';
import UserContext from './contexts/UserContext';
import MapPage from './pages/MapPage';

function App(): JSX.Element {
  return (
    <UserContext.Provider value={{ name: 'Provider default', interests: [] }}>
      <div className="App">
        <MapPage />
      </div>
    </UserContext.Provider>
  );
}

export default App;
