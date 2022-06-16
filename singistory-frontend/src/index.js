import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import ErrorContextProvider from './context/ErrorContext';
import AuthContextProvider from './context/AuthContext';
import FinishContextProvider from './context/FinishContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ErrorContextProvider>
        <AuthContextProvider>
          <FinishContextProvider>
            <App />
          </FinishContextProvider>
        </AuthContextProvider>
      </ErrorContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
