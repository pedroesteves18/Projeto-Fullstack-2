import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router";

import App from './App';
import Authenticator from './components/Authenticator';

import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Authenticator>
      <App />
    </Authenticator>
  </BrowserRouter>
);
