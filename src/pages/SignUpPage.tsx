import { invoke } from "@tauri-apps/api";
import React from "react";
import { useState } from "react";

import "../components/login.css"
const SignUpPage = () => {
    const [getusername, setUsername] = useState("");
    const [getEmail, setEmail] = useState("");
    const [getpassword, setPassword] = useState("");
    const [getconfirmpassword, setConfirmPassword] = useState("");
    const [getvalidate, setValidate] = useState("");
    const [passwordVisible, setpasswordVisible] = useState(false);
    const handleSignUp = () => {
        invoke("signup", { username: getusername, email: getEmail, password: getpassword, confirmPassword: getconfirmpassword }).then((validato) => console.log(validato)).catch((reason) => setValidate(reason))
    };


    return (
        <div className="login-container">
            <h2>Sign Up</h2>
            <p className="errore">{getvalidate}</p>
            <div className="input-container">
                <label htmlFor="username">Username</label>
                <input type="text" id="username"
                    value={getusername}
                    onChange={(e) => setUsername(e.target.value)} />
                <div className="input-line"></div>
            </div>
            <div className="input-container">
                <label htmlFor="email">Email</label>
                <input type="text" id="email"
                    value={getEmail}
                    onChange={(e) => setEmail(e.target.value)} />
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
            <div className="input-container">
                <label htmlFor="confirmpassword">Confirm password</label>
                <input type={passwordVisible ? "text" : "password"} id="confirmpassword"
                    value={getconfirmpassword}
                    onChange={(e) => setConfirmPassword(e.target.value)} />
                <img id="togglepasswordview" onClick={() => setpasswordVisible(!passwordVisible)} src={passwordVisible ? "/src/assets/images/hide.png" : "/src/assets/images/show.png"} />
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
