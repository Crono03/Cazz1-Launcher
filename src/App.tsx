import HomePage from './pages/Homepage';
import React, { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ChangeLog from './components/ChangeLog';
import SignUpPage from './pages/SignUpPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route index element={<Login />} />
        <Route path='signup' element={<SignUpPage />} />
        <Route path="homepage" element={<HomePage />} >
            <Route path="changelog" element={<ChangeLog />}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
