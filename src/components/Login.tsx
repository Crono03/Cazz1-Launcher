import './login.css';
import { getTranslation } from '../backend/languageManager';
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { invoke } from '@tauri-apps/api';
// Quando la lingua cambia, impostala nel modulo di gestione delle lingue



const Login = () => {
    const [getusernameEmail, setUsernameEmail] = useState("");
    const [getpassword, setPassword] = useState("");
    const [getvalidate, setValidate] = useState("");

    const [goToHomePage, setGoToHomePage] = React.useState(false);

    if (goToHomePage) {
        return <Navigate to='/homepage' />
    }

    const handleLogin = () => {
        invoke("login", {username: getusernameEmail, password: getpassword})
            .then((_) => setGoToHomePage(true))
            .catch((error) => setValidate(error));
        
    };

    const handleContinueAsGuest = () => {
        setGoToHomePage(true);
    };


    return (
        <div className="login-container">
            <h2>Login</h2>
            <p className="errore">{getvalidate}</p>
            <div className="input-container">
                <label htmlFor="usernameEmail">Username/Email</label>
                <input type="text" id="usernameEmail"
                    value={getusernameEmail}
                    onChange={(e) => setUsernameEmail(e.target.value)} />
                <div className="input-line"></div>
            </div>
            <div className="input-container">
                <label htmlFor="usernameEmail">Password</label>
                <input type="text" id="password"
                    value={getpassword}
                    onChange={(e) => setPassword(e.target.value)} />
                <div className="input-line"></div>
            </div>
            <div className='centered-content'>
                <button className="login-button" onClick={handleLogin}>
                    {getTranslation('login')}
                </button>
                <button className="guest-button" onClick={handleContinueAsGuest}>
                    {getTranslation('continueAsGuest')}
                </button>
            </div>
            {/* Altri elementi del form di login */}
        </div>
    );
};

export default Login;
