import './login.css';
import { getTranslation } from '../backend/languageManager';
import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { invoke } from '@tauri-apps/api';
import { type } from 'os';
// Quando la lingua cambia, impostala nel modulo di gestione delle lingue



const Login = () => {

    const navigate = useNavigate();

    type User = {
        email: string,
        password: string,
        username: string
    }

    function isUser(obj: any): obj is User {
        return (
            typeof obj === 'object' &&
            obj !== null &&
            'email' in obj &&
            'password' in obj &&
            'username' in obj
        );
    }

    const [getusernameEmail, setUsernameEmail] = useState("");
    const [getpassword, setPassword] = useState("");
    const [getvalidate, setValidate] = useState("");
    const [passwordVisible, setpasswordVisible] = useState(false);
    const [goToSignUpPage, setGoToSignUpPage] = React.useState(false);

    if (goToSignUpPage) {
        return <Navigate to='/signup' />
    }

    const handleLogin = () => {
        invoke("login", { usernameEmail: getusernameEmail, password: getpassword })
            .then((result) => {
                if (isUser(result))
                    navigate("/homepage")
            })
            .catch((error) => setValidate(error));

    };

    const handleContinueAsGuest = () => {
        navigate("/homepage", { state: { username: "" } })
    };


    return (
        <div className="login-container">
            <h2>Login</h2>
            <p className="errore">{getvalidate}</p>
            <div className="input-container">
                <label htmlFor="usernameemail">Username/Email</label>
                <input type="text" id="usernameemail"
                    value={getusernameEmail}
                    onChange={(e) => setUsernameEmail(e.target.value)} />
                <div className="input-line"></div>
            </div>
            <div className="input-container">
                <label htmlFor="password">Password</label>
                <input type={passwordVisible ? "text" : "password"} id="password"
                    value={getpassword}
                    onChange={(e) => setPassword(e.target.value)} />
                <img id="togglepasswordview" onClick={() => setpasswordVisible(!passwordVisible)} src={passwordVisible ? "/src/assets/images/hide.png" : "/src/assets/images/show.png"} />
                <div className="input-line"></div>
            </div>
            <div className='centered-content'>
                <button className="login-button" onClick={handleLogin}>
                    {getTranslation('login')}
                </button>
                <button className='signup-button' onClick={() => setGoToSignUpPage(true)}>{getTranslation("signup")}</button>
            </div>
            <div className="separator">OR</div>
            <div className='centered-content'>
                <button className="guest-button" onClick={handleContinueAsGuest}>
                    {getTranslation('continueAsGuest')}
                </button>
            </div>
        </div>
    );
};

export default Login;
