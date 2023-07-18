import HomePage from './pages/Homepage';
import React, { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ChangeLog from './components/ChangeLog';
import SignUpPage from './pages/SignUpPage';
import Loading from './components/Loading';
import OfflinePage from './pages/OfflinePage';
import Minecraft from './components/Minecraft';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route index element={<Loading />} />
                <Route path="login" element={<Login />} />
                <Route path="offline" element={<OfflinePage />} />
                <Route path='signup' element={<SignUpPage />} />
                <Route path="homepage" element={<HomePage />} >
                    <Route path="changelog" element={<ChangeLog />} />
                    <Route path="minecraft" element={<Minecraft />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
