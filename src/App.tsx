import React, { useEffect, useState } from "react";
import "./App.css";
import Login from "./components/Login";
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

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
    <div>
      {firstTimeUser ? <Login /> : <h2>Welcome to the App</h2>}
      {/* Altri contenuti della pagina */}
    </div>
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