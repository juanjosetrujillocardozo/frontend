import React from 'react';
import ReactDOM from 'react-dom/client';
import './global.css';
import './components/Cars.css';
import './components/Home.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
