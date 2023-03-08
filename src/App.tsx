import React from 'react';
import './App.css';
import { serviceContainer } from './services/service-container';
import { ServicesContextProvider } from './contexts/ServicesContext';
import { UserContextProvider } from './contexts/UserContext';
import {FauxRouter} from './components/FauxRouter';

function App() {

  return (
    <ServicesContextProvider container={serviceContainer}>
      <UserContextProvider>
        <FauxRouter></FauxRouter>
      </UserContextProvider>
    </ServicesContextProvider>
  );
}

export default App;
