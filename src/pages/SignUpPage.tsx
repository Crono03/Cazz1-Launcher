import { invoke } from "@tauri-apps/api";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTranslation } from "../backend/languageManager";
import "../components/login.css"
import { I } from "@tauri-apps/api/path-c062430b";
const SignUpPage = () => {
    const navigate= useNavigate();
    const [getusername, setUsername] = useState("");
    const [getEmail, setEmail] = useState("");
    const [getpassword, setPassword] = useState("");
    const [getconfirmpassword, setConfirmPassword] = useState("");
    const [getvalidate, setValidate] = useState("");
    const [passwordVisible, setpasswordVisible] = useState(false);
    const handleSignUp = () => {
        invoke("signup", { username: getusername, email: getEmail, password: getpassword, confirmPassword: getconfirmpassword }).then((_) => navigate("/homepage", { state: { username: getusername, guest: false } })).catch((reason) => { setValidate(getTranslation(reason)); console.log(reason) })
    };


    return (
        <div className="login-container">
            <h2>{getTranslation("signup")}</h2>
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
                <label htmlFor="confirmpassword">{getTranslation("confirmpass")}</label>
                <input type={passwordVisible ? "text" : "password"} id="confirmpassword"
                    value={getconfirmpassword}
                    onChange={(e) => setConfirmPassword(e.target.value)} />
                <img id="togglepasswordview" onClick={() => setpasswordVisible(!passwordVisible)} src={passwordVisible ? "/src/assets/images/hide.png" : "/src/assets/images/show.png"} />
                <div className="input-line"></div>
            </div>
            <div className='centered-content'>
            <img src="/src/assets/images/arrow.png" onClick={handleSignUp}/>
                    
                <button className="login-button" onClick={handleSignUp}>
                    {getTranslation("signup")}
                </button>
            </div>
        </div>
    )
}

export default SignUpPage;
