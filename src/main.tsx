import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store.ts';
import SettingsForm from './components/SettingsForm.tsx';
import App from './App.tsx';
import './index.css';

function MainComponent() {
  const [currentPage, setCurrentPage] = useState<'app' | 'settings'>('app');

  const renderPage = () => {
    if (currentPage === 'app') {
      return <App />;
    } else if (currentPage === 'settings') {
      return <SettingsForm />;
    }
  };

  return (
    <div className='main-container'>
      <nav className="nav-bar">
        <img src="../assets/see-tickets.png" alt="logo" className="nav-logo" />
        <div className="nav-buttons">
          <button className="nav-button" onClick={() => setCurrentPage('app')}>Event List</button>
          <button className="nav-button" onClick={() => setCurrentPage('settings')}>Edit Settings</button>
        </div>
      </nav>
      <div className="content">
        {renderPage()}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <MainComponent />
    </Provider>
  </React.StrictMode>,
);