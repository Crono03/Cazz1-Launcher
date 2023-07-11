import './login.css';
import { getTranslation } from '../backend/languageManager';
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
// Quando la lingua cambia, impostala nel modulo di gestione delle lingue



const Login = ({ onLogin }: { onLogin: (usernameEmail: string, password: string) => void }) => {
    const [usernameEmail, setUsernameEmail] = useState("");
    const [password, setPassword] = useState("");

    const [goToHomePage, setGoToHomePage] = React.useState(false);

    if (goToHomePage) {
        return <Navigate to='/homepage' />
    }

    const handleLogin = () => {
        console.log("Username/Email:", usernameEmail);
        console.log("Password:", password);
        setGoToHomePage(true);
    };

    const handleContinueAsGuest = () => {
        setGoToHomePage(true);
    };


    return (
        <div className="login-container">
            <h2>Login</h2>
            <div className="input-container">
                <label htmlFor="usernameEmail">Username/Email</label>
                <input type="text" id="usernameEmail"
                    value={usernameEmail}
                    onChange={(e) => setUsernameEmail(e.target.value)} />
                <div className="input-line"></div>
            </div>
            <div className="input-container">
                <label htmlFor="usernameEmail">Password</label>
                <input type="text" id="password"
                    value={password}
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

function setGuestView(arg0: boolean) {
    throw new Error('Function not implemented.');
}
