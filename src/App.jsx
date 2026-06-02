import React, { useContext } from 'react';
import { AppProvider, AppContext } from './context/AppContext';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import MapComponent from './components/MapComponent';
import './index.css'; // Make sure styles are loaded

const MainApp = () => {
  const { isAuthenticated } = useContext(AppContext);

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <div className="app-container">
      <Sidebar />
      <MapComponent />
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}

export default App;
