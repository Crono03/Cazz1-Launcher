import HomePage from './pages/Homepage';
import React, { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ChangeLog from './components/ChangeLog';

const LoginPage = () => {
  const [firstTimeUser, setFirstTimeUser] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [guestView, setGuestView] = useState(false);
  
  const handleContinueAsGuest = (guestViewValue: boolean) => {
    setGuestView(guestViewValue);
  };


  const handleLogin = (usernameEmail: string, password: string) => {
    // Esegui la logica di autenticazione o gestione dei dati dell'utente
    // Puoi aggiungere qui la logica per verificare le credenziali e gestire il login

    // Esempio di login di successo
    localStorage.setItem('hasLoggedInBefore', 'true');
    setFirstTimeUser(false);
    setLoggedIn(true);
  };

  return (
        <Login onLogin={handleLogin} />
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route index element={<LoginPage />} />
        <Route path="homepage" element={<HomePage />} >
            <Route path="changelog" element={<ChangeLog />}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
