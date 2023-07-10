import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../il18n';



import React, { useState, useEffect } from 'react';
import Login from "components/login";



const Home = () => {
  const [firstTimeUser, setFirstTimeUser] = useState(true);

  useEffect(() => {
    
    // Verifica se l'utente ha effettuato il login con successo in precedenza
    const hasLoggedInBefore = localStorage.getItem('hasLoggedInBefore');
    if (hasLoggedInBefore) {
      setFirstTimeUser(false);
    }
  }, []);
  
  return (
    <I18nextProvider i18n={i18n}>
    <div>
      {firstTimeUser ? <Login /> : <h2>Welcome to the App</h2>}
      {/* Altri contenuti della pagina */}
    </div>
    </I18nextProvider>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}
