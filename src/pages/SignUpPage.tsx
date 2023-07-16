import React from "react";
import { useState } from "react";

import "../components/login.css"
const SignUpPage = () => {
    const [getusername, setUsername] = useState("");
    const [getEmail, setEmail] = useState("");
    const [getpassword, setPassword] = useState("");
    const [getvalidate, setValidate] = useState("");

    const handleSignUp = () => {
            
        };


    return (
        <div className="login-container">
            <h2>Sign Up</h2>
            <p className="errore">{getvalidate}</p>
            <div className="input-container">
                <label htmlFor="Username">Username</label>
                <input type="text" id="Username"
                    value={getusername}
                    onChange={(e) => setUsername(e.target.value)} />
                <div className="input-line"></div>
            </div>
            <div className="input-container">
                <label htmlFor="Email">Email</label>
                <input type="text" id="Email"
                    value={getusername}
                    onChange={(e) => setUsername(e.target.value)} />
                <div className="input-line"></div>
            </div>
            <div className="input-container">
                <label htmlFor="password">Password</label>
                <input type="password" id="password"
                    value={getpassword}
                    onChange={(e) => setPassword(e.target.value)} />
                <div className="input-line"></div>
            </div>
            <div className='centered-content'>
                <button className="login-button" onClick={handleSignUp}>
                    Sign up
                </button>
            </div>
        </div>
    )
}

export default SignUpPage;
